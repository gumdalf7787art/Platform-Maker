import { signJWT } from './utils/jwt.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { email, password, name } = data;

    // 기본 유효성 검사
    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "이메일과 비밀번호는 필수입니다." }), { status: 400 });
    }

    // 비밀번호 해싱 (간단히 Web Crypto API 활용)
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // D1 데이터베이스에 유저 저장
    const result = await env.DB.prepare(
      `INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)`
    ).bind(email, passwordHash, name || '회원').run();

    const token = await signJWT({ email: email, role: 'user' }, env.JWT_SECRET);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "회원가입이 완료되었습니다." 
    }), {
      headers: { 
        "Content-Type": "application/json",
        "Set-Cookie": `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`
      }
    });

  } catch (error) {
    // 이메일 중복 시 UNIQUE 제약 조건 에러 처리
    if (error.message.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "이미 가입된 이메일입니다." 
      }), { status: 400 });
    }

    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { status: 500 });
  }
}
