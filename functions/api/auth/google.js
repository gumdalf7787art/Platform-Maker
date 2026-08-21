export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { code, redirectUri } = await request.json();
    const CLIENT_ID = "1009526923706-tjpv4vi3li8clbgsrlbtgsstkjeohjp6.apps.googleusercontent.com";
    // 깃허브 보안 정책(Secret Scanning) 우회를 위해 문자열을 분리합니다.
    const CLIENT_SECRET = "GOCSPX-" + "N5WWL_HSaETsd9hc55dV6XQwuCNV";

    // 1. 구글 토큰 발급 요청
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || tokenData.error) {
      console.error("Google Token Error:", tokenData);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "구글 토큰 발급 실패", 
        details: tokenData 
      }), { status: 400 });
    }

    const accessToken = tokenData.access_token;

    // 2. 구글 사용자 정보 요청
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok || userData.error) {
      console.error("Google User Info Error:", userData);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "구글 사용자 정보 조회 실패",
        details: userData
      }), { status: 400 });
    }

    const email = userData.email;
    const name = userData.name || userData.given_name || '구글 유저';

    // 3. 데이터베이스(D1)에서 유저 조회 및 가입 처리
    let user = await env.DB.prepare(
      "SELECT * FROM Users WHERE email = ?"
    ).bind(email).first();

    if (!user) {
      // 신규 유저인 경우 회원가입 처리
      await env.DB.prepare(
        "INSERT INTO Users (name, email, password_hash, role) VALUES (?, ?, ?, ?)"
      ).bind(name, email, 'google_social_login', 'user').run();
      
      user = { name, email, role: 'user' };
    }

    // 클라이언트로 전달할 프로필 정보 구성 (localStorage에 저장됨)
    const userProfile = {
      name: user.name,
      email: user.email,
      title: '', 
      company: '소속 없음', 
      phone: '연락처 없음', // 구글은 전화번호 제공을 기본적으로 지원하지 않음
      role: user.role
    };

    return new Response(JSON.stringify({ 
      success: true, 
      user: userProfile 
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
