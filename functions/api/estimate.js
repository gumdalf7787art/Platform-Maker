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

    // Resend를 통한 이메일 발송 로직
    // 주의: 도메인 인증 전이므로 'onboarding@resend.dev'에서 '가입하신 이메일'로만 발송 가능합니다.
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'no-reply@platform-maker.com',
          to: env.RESEND_TO_EMAIL || 'goodduck2@naver.com', // 환경 변수 없으면 기본값으로
          subject: `[Platform Maker] ${name}님으로부터 새로운 견적 문의`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">새로운 견적 문의가 접수되었습니다.</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <p><strong>신청자:</strong> ${name} ${title ? `(${title})` : ''}</p>
                <p><strong>회사/팀명:</strong> ${company}</p>
                <p><strong>연락처:</strong> ${phone}</p>
                <p><strong>이메일:</strong> ${email}</p>
                <p><strong>서비스 유형:</strong> ${platformType} / ${userType}</p>
                <p><strong>요구 기능:</strong> ${features}</p>
              </div>
              <div style="margin-top: 20px; padding: 20px; border-left: 4px solid #000; background: #fff;">
                <h4 style="margin-top:0;">상세 내용</h4>
                <p style="white-space: pre-wrap;">${description}</p>
              </div>
              <p style="color: #888; font-size: 12px; margin-top: 30px;">
                * 클라우드플레어 대시보드(D1)에서 상세 내용을 확인하세요.
              </p>
            </div>
          `
        })
      });
    } catch (emailError) {
      console.error("이메일 발송 실패:", emailError);
      // 이메일 발송이 실패해도 DB 저장은 성공했으므로 계속 진행
    }

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
