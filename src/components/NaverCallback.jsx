import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NaverCallback = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverCallback = async () => {
      try {
        const urlParams = new URL(window.location.href).searchParams;
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error) {
          alert(`네이버 로그인 에러: ${errorDescription}`);
          navigate('/login');
          return;
        }

        if (!code || !state) {
          alert("네이버 로그인 인가 코드가 없습니다.");
          navigate('/login');
          return;
        }

        const savedState = sessionStorage.getItem('naver_state');
        if (state !== savedState) {
          alert("네이버 로그인 상태(State) 값이 일치하지 않습니다. 다시 시도해주세요.");
          navigate('/login');
          return;
        }

        const response = await fetch('/api/auth/naver', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          localStorage.setItem('userProfile', JSON.stringify(result.user));
          if (setIsLoggedIn) setIsLoggedIn(true);
          window.scrollTo(0, 0);
          navigate('/');
        } else {
          alert(`에러: ${result.message}\n상세: ${JSON.stringify(result.details || {})}`);
          navigate('/login');
        }
      } catch (error) {
        console.error("Naver login error:", error);
        alert("네이버 로그인 통신 중 오류가 발생했습니다.");
        navigate('/login');
      }
    };

    handleNaverCallback();
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-green-100 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center relative z-10"
      >
        <div className="w-16 h-16 border-4 border-[#03C75A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">네이버 로그인 중...</h2>
        <p className="text-gray-500 mt-2 text-sm">잠시만 기다려주세요.</p>
      </motion.div>
    </div>
  );
};

export default NaverCallback;
