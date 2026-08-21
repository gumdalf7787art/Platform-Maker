import { verifyJWT } from '../utils/jwt.js';

export async function onRequestGet(context) {
  const { request, env } = context;

  try {
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) {
      return new Response(JSON.stringify({ success: false, message: "로그인되어 있지 않습니다." }), { status: 401 });
    }

    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const token = cookies.token;

    if (!token) {
      return new Response(JSON.stringify({ success: false, message: "유효한 토큰이 없습니다." }), { status: 401 });
    }

    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (!payload) {
      return new Response(JSON.stringify({ success: false, message: "토큰이 만료되었거나 변조되었습니다." }), { status: 401 });
    }

    // DB에서 최신 유저 정보 조회
    const user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(payload.email).first();

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "사용자를 찾을 수 없습니다." }), { status: 404 });
    }

    const userProfile = {
      name: user.name,
      email: user.email,
      title: '대표', 
      company: '소속 없음', 
      phone: '연락처 없음',
      role: user.role
    };

    return new Response(JSON.stringify({ success: true, user: userProfile }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "서버 오류", error: error.message }), { status: 500 });
  }
}
