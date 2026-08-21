export async function onRequestPost() {
  return new Response(JSON.stringify({ success: true, message: "로그아웃 되었습니다." }), {
    headers: { 
      "Content-Type": "application/json",
      "Set-Cookie": "token=; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=0"
    }
  });
}
