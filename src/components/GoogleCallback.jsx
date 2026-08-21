import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GoogleCallback = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URL(window.location.href).searchParams;
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          alert(`구글 로그인 에러: ${error}`);
          navigate('/login');
          return;
        }

        if (!code) {
          alert("구글 로그인 인가 코드가 없습니다.");
          navigate('/login');
          return;
        }

        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, redirectUri: window.location.origin + "/auth/google/callback" })
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
        console.error("Google login error:", error);
        alert("구글 로그인 통신 중 오류가 발생했습니다.");
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-red-100 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col items-center relative z-10"
      >
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">구글 로그인 중...</h2>
        <p className="text-gray-500 mt-2 text-sm">잠시만 기다려주세요.</p>
      </motion.div>
    </div>
  );
};

export default GoogleCallback;
