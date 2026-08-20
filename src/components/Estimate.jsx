import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, UploadCloud, CheckCircle2, MessageSquare, CreditCard, MapPin, Bell, Cpu, BarChart3, ShoppingBag, X, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Estimate() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    company: '',
    region: '',
    website: '',
    userType: '',
    platformType: '',
    features: [],
    description: '',
    files: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => {
      const isSelected = prev.features.includes(featureId);
      if (isSelected) {
        return { ...prev, features: prev.features.filter(id => id !== featureId) };
      } else {
        return { ...prev, features: [...prev.features, featureId] };
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would normally send data to a backend
    setIsSubmitted(true);
  };

  const featureOptions = [
    { id: 'chat', label: '1:1 실시간 채팅', icon: <MessageSquare size={16} /> },
    { id: 'pg', label: '결제/PG사 연동', icon: <CreditCard size={16} /> },
    { id: 'gps', label: '위치기반(GPS)', icon: <MapPin size={16} /> },
    { id: 'push', label: '푸시 알림', icon: <Bell size={16} /> },
    { id: 'sms', label: '문자 발송 기능', icon: <Smartphone size={16} /> },
    { id: 'ai', label: 'Ai Api 연결', icon: <Cpu size={16} /> },
    { id: 'dashboard', label: '관리자 대시보드', icon: <BarChart3 size={16} /> },
    { id: 'ecommerce', label: '이커머스/장바구니', icon: <ShoppingBag size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5227FF]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF9FFC]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 h-[70px] flex items-center px-6 md:px-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-[#555] hover:text-black transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium hidden sm:inline">돌아가기</span>
        </button>
        <div className="mx-auto flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-8 h-8 object-cover rounded-lg mr-3 shadow-sm border border-black/5" />
          <span className="font-display font-bold text-[18px] text-black tracking-tight">Platform Maker</span>
        </div>
        <div className="w-[88px]"></div> {/* Spacer for perfect centering */}
      </header>

      <main className="relative z-10 pt-32 pb-32 px-4 max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-[32px] md:text-[42px] font-bold text-black tracking-tight mb-4">
            어떤 프로젝트를<br className="md:hidden" /> 준비 중이신가요?
          </h1>
          <p className="text-[16px] text-gray-500">
            생각하고 계신 아이디어를 편하게 알려주세요.<br className="md:hidden" /> Platform Maker가 현실로 만들어 드립니다.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Step 1: Basic Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <h2 className="text-[20px] font-bold mb-6 flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[12px] mr-3">1</span>
              기본 정보를 입력해 주세요
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">성함 *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">직급 (선택)</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="대표, 이사, 팀장 등" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">회사명 또는 팀명 *</label>
                <input required type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="회사명 입력" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">회사 지역 (선택)</label>
                <input type="text" name="region" value={formData.region} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="예: 서울 강남구" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">회사 홈페이지 (선택)</label>
                <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">연락처 *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-700 mb-2">이메일 *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]" placeholder="example@email.com" />
              </div>
            </div>
          </motion.div>

          {/* Step 2: Platform Type */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <h2 className="text-[20px] font-bold mb-6 flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[12px] mr-3">2</span>
              어떤 형태의 개발을 원하시나요?
            </h2>
            
            <div className="mb-8">
              <p className="text-[14px] text-gray-500 mb-4 font-medium">사용자 그룹 형태</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['단일 유저 (B2C)', '양방향 매칭 (ex: 고객-판매자)', '사내 관리용 (B2B)'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, userType: type }))}
                    className={`py-3.5 px-4 rounded-xl text-[14px] font-medium border transition-all duration-200 ${
                      formData.userType === type 
                        ? 'border-black bg-black text-white shadow-md' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[14px] text-gray-500 mb-4 font-medium">플랫폼 형태</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['반응형 웹', '모바일 앱 (출시)', '둘 다 필요함'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, platformType: type }))}
                    className={`py-3.5 px-4 rounded-xl text-[14px] font-medium border transition-all duration-200 ${
                      formData.platformType === type 
                        ? 'border-[#5227FF] bg-[#5227FF] text-white shadow-md' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Step 3: Core Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <h2 className="text-[20px] font-bold mb-2 flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[12px] mr-3">3</span>
              필요한 핵심 기능들을 모두 선택해 주세요
            </h2>
            <p className="text-[13px] text-gray-500 mb-6 pl-9">생각나는 대로 편하게 선택해 주시면 상담 시 구체화해 드립니다.</p>
            
            <div className="flex flex-wrap gap-3 pl-0 md:pl-9">
              {featureOptions.map(feature => {
                const isSelected = formData.features.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`flex items-center px-5 py-3 rounded-full text-[14px] font-medium border transition-all duration-300 ${
                      isSelected
                        ? 'border-black bg-black text-white shadow-md transform scale-[1.02]'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`mr-2 ${isSelected ? 'text-[#FF9FFC]' : 'text-gray-400'}`}>
                      {feature.icon}
                    </span>
                    {feature.label}
                  </button>
                );
              })}
            </div>
            
            {/* Dynamic Feedback based on AI selection */}
            <AnimatePresence>
              {formData.features.includes('ai') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-0 md:pl-9 mt-6"
                >
                  <div className="bg-[#F3EBFF] text-[#5227FF] px-4 py-3 rounded-xl text-[13px] font-medium flex items-start">
                    <span className="mr-2">✨</span>
                    최신 Ai Api 연결을 선택하셨군요! 비즈니스 로직에 맞춘 최적의 프롬프트 엔지니어링까지 함께 제안해 드립니다.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Step 4: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <h2 className="text-[20px] font-bold mb-6 flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[12px] mr-3">4</span>
              준비 중이신 비즈니스에 대해 자세히 들려주세요
            </h2>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className="w-full p-5 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px] resize-none leading-relaxed"
              placeholder="어떤 타겟층을 위한 서비스인가요? 경쟁사와 다른 우리만의 차별점은 무엇인가요? 막막하시다면 생각나는 대로 편하게 적어주셔도 좋습니다. 상담을 통해 저희가 확실하게 구체화해 드리겠습니다."
            ></textarea>
          </motion.div>

          {/* Step 5: Attachments */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-gray-100"
          >
            <h2 className="text-[20px] font-bold mb-2 flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-[12px] mr-3">5</span>
              참고할 만한 자료가 있다면 첨부해 주세요 (선택)
            </h2>
            <p className="text-[13px] text-gray-500 mb-6 pl-9">기획서, 스토리보드, 디자인 스케치, 벤치마킹 사이트 캡처 등</p>

            <div 
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud size={40} className="text-gray-400 mb-3" />
              <p className="text-[15px] font-semibold text-gray-700 mb-1">클릭하여 파일 업로드</p>
              <p className="text-[13px] text-gray-400">또는 여기에 파일을 드래그 앤 드롭 하세요 (최대 50MB)</p>
              <input 
                type="file" 
                multiple
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>

            {formData.files.length > 0 && (
              <div className="mt-6 space-y-2 pl-0 md:pl-9">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                    <span className="text-[13px] text-gray-700 font-medium truncate pr-4">{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-8"
          >
            <button 
              type="submit"
              className="bg-black text-white font-bold text-[18px] px-12 py-5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:bg-gray-800 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-300 transform active:scale-95"
            >
              견적 상담 신청하기
            </button>
          </motion.div>

        </form>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[32px] p-10 max-w-[400px] w-full text-center shadow-2xl relative"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-[24px] font-bold text-black mb-3">접수가 완료되었습니다</h3>
              <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
                작성해주신 소중한 프로젝트 내용을 꼼꼼히 검토한 후, 24시간 내에 기재해주신 연락처로 연락드리겠습니다.
              </p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  navigate('/');
                }}
                className="w-full bg-black text-white font-bold py-4 rounded-xl transition-transform active:scale-95 hover:bg-gray-800"
              >
                메인으로 돌아가기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
