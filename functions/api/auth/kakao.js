export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { code, redirectUri } = await request.json();
    const REST_API_KEY = "b0b92ea63baf92a771b860929aea52b1";
    const CLIENT_SECRET = env.KAKAO_CLIENT_SECRET;

    // 1. 카카오 토큰 발급 요청
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        client_secret: CLIENT_SECRET,
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Kakao Token Error:", tokenData);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "카카오 토큰 발급 실패", 
        details: tokenData 
      }), { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 2. 카카오 사용자 정보 요청
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error("Kakao User Info Error:", userData);
      return new Response(JSON.stringify({ success: false, message: "카카오 사용자 정보 조회 실패" }), { status: 400 });
    }

    const kakaoAccount = userData.kakao_account || {};
    const profile = kakaoAccount.profile || {};
    
    const email = kakaoAccount.email || `${userData.id}@kakao.com`;
    const name = profile.nickname || '카카오 유저';

    // 3. 데이터베이스(D1)에서 유저 조회 및 가입 처리
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();

    if (!user) {
      // 신규 유저인 경우 회원가입 처리
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, 'kakao_social_login', 'user').run();
      
      user = { name, email, role: 'user' };
    }

    // 클라이언트로 전달할 프로필 정보 구성 (localStorage에 저장됨)
    const userProfile = {
      name: user.name,
      email: user.email,
      title: '', 
      company: '소속 없음', 
      phone: '연락처 없음',
      role: user.role
    };

    return new Response(JSON.stringify({ 
      success: true, 
      user: userProfile 
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Kakao Login Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
