export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ success: false, message: '이메일 정보가 필요합니다.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // D1 데이터베이스에서 해당 유저 삭제
    const result = await env.DB.prepare(
      'DELETE FROM Users WHERE email = ?'
    ).bind(email).run();

    return new Response(JSON.stringify({ success: true, message: '회원 탈퇴가 완료되었습니다.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: '서버 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
