export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, message: "이메일과 비밀번호는 필수입니다." }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 비밀번호 해싱 (signup.js와 동일한 방식)
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // D1 데이터베이스에서 유저 조회
    const result = await env.DB.prepare(
      `SELECT * FROM Users WHERE email = ? AND password_hash = ?`
    ).bind(email, passwordHash).first();

    if (!result) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "이메일 또는 비밀번호가 올바르지 않습니다." 
      }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "로그인 성공",
      user: {
        name: result.name,
        email: result.email,
        title: '대표', // 일단 데모용으로 기본값 제공
        company: '(소속 정보 없음)',
        phone: '(연락처 정보 없음)',
        role: result.role || 'user'
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
