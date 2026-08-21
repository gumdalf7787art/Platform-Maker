export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    
    // 텍스트 데이터 추출
    const name = formData.get('name') || '';
    const title = formData.get('title') || '';
    const company = formData.get('company') || '';
    const region = formData.get('region') || '';
    const website = formData.get('website') || '';
    const phone = formData.get('phone') || '';
    const email = formData.get('email') || '';
    const userType = formData.get('userType') || '';
    const platformType = formData.get('platformType') || '';
    const features = formData.get('features') || '[]';
    const description = formData.get('description') || '';
    
    // 파일 데이터 추출 및 R2 업로드
    const files = formData.getAll('files');
    const uploadedUrls = [];
    
    for (const file of files) {
      // 파일이 실제로 존재하는지 확인 (빈 파일 업로드 방지)
      if (file && file.name && file.size > 0) {
        const timestamp = Date.now();
        // 한글 파일명 깨짐 방지를 위해 인코딩하거나 안전한 이름으로 저장
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const key = `estimates/${timestamp}_${safeName}`;
        
        // R2 버킷에 파일 업로드
        await env.BUCKET.put(key, file.stream(), {
          httpMetadata: { contentType: file.type }
        });
        
        uploadedUrls.push(key);
      }
    }
    
    const attachmentUrls = JSON.stringify(uploadedUrls);

    // D1 데이터베이스에 저장
    const result = await env.DB.prepare(
      `INSERT INTO estimates 
        (name, title, company, region, website, phone, email, user_type, platform_type, features, description, attachment_urls) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      name, title, company, region, website, phone, email, userType, platformType, features, description, attachmentUrls
    ).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: "성공적으로 견적이 접수되었습니다." 
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: "서버 오류가 발생했습니다.",
      error: error.message
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
