import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    // TODO: Add actual login logic here
    alert("로그인 성공!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Background Decor (Same as SignUp for consistency) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5227FF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF9FFC]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center text-[#555] hover:text-black transition-colors z-20"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="font-medium">돌아가기</span>
      </button>

      {/* Logo */}
      <div className="flex items-center cursor-pointer mb-10 z-20" onClick={() => navigate('/')}>
        <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-10 h-10 object-cover rounded-xl mr-3 shadow-sm border border-black/5" />
        <span className="font-display font-bold text-[24px] text-black tracking-tight">Platform Maker</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-[480px] rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-black/[0.03] relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-black tracking-tight mb-2">다시 오신 것을 환영합니다</h2>
          <p className="text-[15px] text-[#888]">Platform Maker와 함께 혁신을 이어가세요.</p>
        </div>

        {/* SNS Login */}
        <div className="space-y-3 mb-8">
          <button className="w-full flex items-center justify-center bg-[#FEE500] hover:bg-[#F4DC00] text-black font-semibold rounded-xl py-3.5 transition-colors">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 3.185-9 7.114 0 2.54 1.708 4.77 4.258 5.962L6.23 20.31c-.134.48.363.81.77.562l4.63-3.136c.123.01.246.015.37.015 4.97 0 9-3.185 9-7.114C21 6.185 16.97 3 12 3z"/></svg>
            카카오로 3초 만에 시작하기
          </button>
          
          <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center bg-[#03C75A] hover:bg-[#02b350] text-white font-semibold rounded-xl py-3.5 transition-colors">
              <span className="font-bold text-[18px] mr-2">N</span>
              네이버
            </button>
            <button className="flex-1 flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-black font-semibold rounded-xl py-3.5 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44-3.95 0-7.14-3.19-7.14-7.14s3.19-7.14 7.14-7.14c1.9 0 3.49.7 4.67 1.81l2.12-2.12C17.18 2.76 14.85 1.5 12.18 1.5 6.28 1.5 1.5 6.28 1.5 12.18s4.78 10.68 10.68 10.68c6.16 0 10.4-4.34 10.4-10.59 0-.82-.1-1.63-.26-2.4z"/></svg>
              구글
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="px-4 text-[13px] text-gray-400 font-medium bg-white">또는 이메일로 로그인</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">이메일 주소</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-[15px]"
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </div>
          </div>

          {/* Remember Me & Find Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center cursor-pointer group">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <span className="ml-2 text-[13px] text-gray-600 group-hover:text-black transition-colors">로그인 유지</span>
            </label>
            <button type="button" className="text-[13px] text-gray-500 hover:text-black underline underline-offset-4 decoration-gray-200 transition-colors">
              비밀번호 찾기
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white font-bold rounded-xl py-4 mt-6 transition-transform duration-200 active:scale-95 hover:bg-gray-800"
          >
            이메일로 로그인
          </button>
        </form>
        
        <div className="text-center mt-8">
          <p className="text-[13px] text-gray-500">
            아직 계정이 없으신가요? <button onClick={() => navigate('/signup')} className="text-black font-semibold underline underline-offset-2 hover:text-primary transition-colors ml-1">회원가입하기</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
