export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { code, state } = await request.json();
    const CLIENT_ID = "UPoKeP1gguFzcstAcAiC";
    const CLIENT_SECRET = "5HFk_Oon2i";

    // 1. 네이버 토큰 발급 요청
    const tokenResponse = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`, {
      method: 'GET',
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      console.error("Naver Token Error:", tokenData);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "네이버 토큰 발급 실패", 
        details: tokenData 
      }), { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 2. 네이버 사용자 정보 요청
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok || userData.resultcode !== "00") {
      console.error("Naver User Info Error:", userData);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "네이버 사용자 정보 조회 실패",
        details: userData
      }), { status: 400 });
    }

    const profile = userData.response || {};
    
    const email = profile.email || `${profile.id}@naver.com`;
    const name = profile.nickname || profile.name || '네이버 유저';
    const phone = profile.mobile || '연락처 없음'; // 010-XXXX-XXXX 형식으로 옴

    // 3. 데이터베이스(D1)에서 유저 조회 및 가입 처리
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();

    if (!user) {
      // 신규 유저인 경우 회원가입 처리
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, 'naver_social_login', 'user').run();
      
      user = { name, email, role: 'user' };
    }

    // 클라이언트로 전달할 프로필 정보 구성 (localStorage에 저장됨)
    const userProfile = {
      name: user.name,
      email: user.email,
      title: '', 
      company: '소속 없음', 
      phone: phone, // 네이버에서 가져온 전화번호 저장
      role: user.role
    };

    return new Response(JSON.stringify({ 
      success: true, 
      user: userProfile 
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Naver Login Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
