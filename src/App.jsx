import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { Apple, Search, ShoppingBag, Menu, ArrowRight, Sun } from 'lucide-react';
import MoltenMetal from './components/MoltenMetal';
import SplitText from './components/SplitText';
import DashboardMockup from './components/DashboardMockup';
import TiltedCard from './components/TiltedCard';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Estimate from './components/Estimate';
import MyPage from './components/MyPage';
import KakaoCallback from './components/KakaoCallback';
import NaverCallback from './components/NaverCallback';
import GoogleCallback from './components/GoogleCallback';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: '고객' });

  useEffect(() => {
    if (isLoggedIn) {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        setUserProfile(JSON.parse(saved));
      }
    }
  }, [isLoggedIn]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 z-50 flex justify-center w-full transition-all duration-300 ease-in-out ${
        isScrolled ? 'pt-4 pointer-events-none' : 'pt-0 border-b border-divider-soft bg-transparent'
      }`}
    >
      <motion.nav
        layout
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`flex items-center justify-between w-full mx-auto pointer-events-auto ${
          isScrolled 
            ? 'max-w-4xl bg-surface-canvas/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-divider-hairline rounded-full px-6 h-[56px]' 
            : 'max-w-7xl px-8 h-[60px]'
        }`}
      >
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-8 h-8 object-cover rounded-lg mr-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5" />
          <span className="font-display font-bold text-[18px] md:text-[20px] text-ink tracking-tight">Platform Maker</span>
        </div>
        
        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-[15px] font-medium text-ink-muted-80">
          <a href="#features" className="hover:text-ink transition-colors">서비스 특징</a>
          <a href="#workflow" className="hover:text-ink transition-colors">작업 프로세스</a>
          <a href="#portfolio" className="hover:text-ink transition-colors">포트폴리오</a>
          <a href="#pricing" className="hover:text-ink transition-colors">비용 및 계약</a>
          <a href="#faq" className="hover:text-ink transition-colors">자주 묻는 질문</a>
          <button onClick={() => navigate('/mypage')} className="hover:text-ink transition-colors font-bold text-[#5227FF]">마</button>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <button 
              onClick={() => navigate('/mypage')}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-1.5 px-3 rounded-full transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] p-[1.5px]">
                <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center bg-gray-100 text-gray-500 font-bold text-[10px]">
                  {userProfile.name.charAt(0)}
                </div>
              </div>
              <span className="text-[13px] font-bold text-gray-700 hidden sm:block">내 정보</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="text-[15px] font-medium text-ink hover:text-primary transition-colors hidden sm:block"
              >
                로그인
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="btn-secondary !border-divider-hairline !text-ink hover:!bg-surface-parchment !py-2 !px-5 !rounded-lg text-[14px] font-medium shadow-sm bg-surface-canvas"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </motion.nav>
    </header>
  );
}

const HERO_COPY = [
  {
    main: (
      <>당신의 혁신적인 아이디어,<br/>5주 만에 세상에 나옵니다.</>
    ),
    sub: (
      <>MVP 제작, 신규 앱 런칭, 플랫폼 런칭<br/>이제 플랫폼 메이커에서 바로 실현시켜 드립니다.</>
    )
  },
  {
    main: (
      <>완벽한 아이디어에 걸맞은<br/>고품질 플랫폼을 경험하세요.</>
    ),
    sub: (
      <>최신 기술 노하우로<br/>고객의 시선을 사로잡을 하이엔드 플랫폼을 구축합니다.</>
    )
  }
];

function Hero() {
  const navigate = useNavigate();
  const [copyIndex, setCopyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopyIndex((prev) => (prev + 1) % HERO_COPY.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="tile-light relative pt-[140px] pb-section flex flex-col items-center text-center overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 z-0 opacity-100">
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          brightness={1.3}
          colorMode="molten"
          opacity={1.0}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mt-[50px] flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full min-h-[240px] relative">
            <AnimatePresence>
              <motion.div
                key={copyIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 flex flex-col items-center w-full"
              >
                <SplitText
                  tag="h1"
                  className="text-[40px] md:text-[56px] font-bold tracking-tight mb-4 text-ink leading-[1.15] max-w-4xl"
                  delay={50}
                  duration={1.5}
                  splitType="words, chars"
                >
                  {HERO_COPY[copyIndex].main}
                </SplitText>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[17px] text-ink-muted-80 mt-6 max-w-2xl leading-relaxed"
                >
                  {HERO_COPY[copyIndex].sub}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center justify-center"
          >
            <button 
              onClick={() => navigate('/estimate')}
              className="relative overflow-hidden group flex items-center justify-center rounded-full px-8 py-4 text-[17px] font-bold text-black transition-all duration-300 transform hover:-translate-y-1 shadow-[inset_0_0_0_2px_black] hover:shadow-[0_15px_40px_rgba(82,39,255,0.25)] hover:text-white"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-0 skew-x-12"></div>

              <span className="relative z-10 flex items-center tracking-wide">
                프로젝트 문의하기
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-[164px] w-full max-w-[1124px] aspect-[16/11.7] bg-white rounded-2xl border border-divider-soft shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden flex items-center justify-center relative"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-black text-white flex flex-col items-center text-center pt-32 pb-section px-4 relative overflow-hidden min-h-screen">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* Dome Container */}
      <div className="relative z-10 w-full max-w-[1200px] mt-10 flex flex-col items-center">
        {/* Animated Dome Background Wrapper */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] sm:w-[1200px] h-[200vw] sm:h-[1200px] rounded-full overflow-hidden p-[1px] opacity-80" style={{ clipPath: 'inset(0 0 50% 0)' }}>
          {/* Animated Light Beam */}
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_200deg,white_260deg,transparent_360deg)] animate-spin" style={{ animationDuration: '8s' }}></div>
          {/* Inner Black Dome */}
          <div className="absolute inset-[1px] bg-black rounded-full"></div>
          {/* Soft glowing gradient at the top of the dome */}
          <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[80%] h-[20%] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Content inside Dome */}
        <div className="relative z-20 pt-[80px] sm:pt-[120px] pb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[1.1] tracking-tight text-white mb-6">
              Platform Maker
            </h2>
            <p className="text-[20px] md:text-[24px] text-white/80 font-medium tracking-tight">
              여러분의 고민을 해결해드립니다.
            </p>
          </motion.div>
        </div>

        {/* 3 Cards */}
        <div className="relative z-30 w-full grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] px-4 mt-12 mb-32">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#0f0f0f] border border-white/10 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">플랫폼 제작</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    자체 개발팀을 꾸리기엔<br/>시간과 인건비가 부담스러운 대표님
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">고객님의 아이디어를 현실화하는 플랫폼</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">Ai 연결을 통한 사용자 서비스 제공 플랫폼</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">복수 사용자와 관리자 기능을 갖춘 운영형 플랫폼</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">SNS로그인, 채팅, 등이 가능한 플랫폼</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">향후 확장 가능한 플랫폼 구축</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#141414] border border-white/15 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">MVP 제작</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    아이디어를 빠르게 플랫폼으로 구현해<br/>시장의 반응을 당장 확인하고 싶은 분
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">사업 아이디어 타당성 검증용 MVP</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">실제 결제 및 운영 가능한 상용 MVP</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">초기 투자 유치(IR) 및 데모데이용 MVP</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">정부지원사업 & 국책과제 결과물 제출용 MVP</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">사전 예약 및 얼리버드 모객용 랜딩MVP</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltedCard
              containerHeight="380px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.03}
              rotateAmplitude={8}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="w-full h-full bg-[#0f0f0f] border border-white/10 pt-10 px-8 pb-10 rounded-[24px] flex flex-col justify-start shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center mb-8">
                  <h3 className="text-[24px] font-semibold text-white mb-3">신규 앱 런칭</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed break-keep">
                    기존 사업을 확장하기 위해<br/>새로운 앱/웹 서비스가 필요한 기업
                  </p>
                </div>

                <ul className="space-y-3.5 flex flex-col justify-center">
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">반응형 웹 기반 모바일 웹앱(PWA) 런칭</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">B2B 가맹점 및 프랜차이즈 관리 시스템</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">커뮤니티 기반 버티컬 커머스 런칭</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">기존 레거시(구형) 웹사이트의 플랫폼 고도화</span>
                  </li>
                  <li className="flex items-start text-white/70 text-[14px]">
                    <span className="mr-3 text-white/30 text-[10px] mt-[5px]">●</span>
                    <span className="leading-relaxed break-keep">예약 & 스케줄링 기반 서비스 플랫폼</span>
                  </li>
                </ul>
              </div>
            </TiltedCard>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mt-12 pb-24 relative z-20"
      >
        <h3 className="text-[28px] md:text-[40px] font-bold leading-[1.3] text-white/40 mb-6">
          감당하기 힘든 개발비<br/>
          너무 오래 걸리는 시간<br/>
          <span className="text-white">더 이상 타협하지 마세요.</span>
        </h3>
        <p className="text-[20px] md:text-[24px] text-white font-medium mt-4">
          Platform Maker가 여러분과 함께 합니다.
        </p>
      </motion.div>
    </section>
  );
}

function Features() {
  const features = [
    {
      id: 1,
      title: "100% 맞춤형 하이엔드 UI/UX",
      desc: "공장형 템플릿으로는 브랜드를 각인시킬 수 없습니다. 고객의 시선을 단번에 사로잡고 이탈률을 낮추는 독창적인 인터페이스를 설계합니다.",
      visual: "/assets/images/feature_ui_ux_1787196032064.png",
      className: "md:col-span-2 md:row-span-1" // 넓은 가로형 카드
    },
    {
      id: 2,
      title: "강력한 맞춤형 관리자",
      desc: "실시간 트래픽, 결제 통계, 회원 관리를 한눈에 제어할 수 있는 맞춤형 백오피스입니다.",
      visual: "/assets/images/feature_admin_dashboard_1787196044390.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 3,
      title: "흔들림 없는 서버 안정성",
      desc: "초기 MVP부터 대규모 서비스까지 대응 가능한 최신 클라우드 아키텍처로 구축합니다.",
      visual: "/assets/images/feature_server_stability_1787196057950.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      title: "미래 지향적 AI 연동",
      desc: "챗봇, 자동화 알고리즘 등 최신 AI 기술을 플랫폼에 매끄럽게 녹여냅니다.",
      visual: "/assets/images/feature_ai_integration_1787196071031.png",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      id: 5,
      title: "올케어 유지보수",
      desc: "제작만 하고 끝내지 않습니다. 24시간 서버 안정화까지 든든한 기술 파트너가 됩니다.",
      visual: "/assets/images/feature_maintenance_care_1787196082088.png",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section id="features" className="bg-black text-white relative py-24 md:py-32 px-4">
      {/* High-end Subtle Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-tight mb-6 leading-[1.2]">
            타협 없는 퀄리티,<br />성공을 위한 완벽한 기반
          </h2>
          <p className="text-[18px] text-white/50">Platform Maker만의 5가지 차별화 포인트</p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[24px] bg-[#0a0a0a] border border-white/5 flex flex-col ${feature.className || ''}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
                <img src={feature.visual} alt={feature.title} className="w-full h-full object-cover opacity-[0.4] group-hover:opacity-[0.6] group-hover:scale-105 transition-all duration-700" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10 min-h-[340px] pointer-events-none">
                <div className="text-white/50 font-semibold mb-3 tracking-[0.2em] text-[12px]">
                  POINT 0{idx + 1}
                </div>
                <h3 className="text-[24px] md:text-[28px] font-bold leading-[1.3] mb-3 tracking-tight break-keep">
                  {feature.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-white/60 max-w-[400px] break-keep">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const workflow = [
    {
      week: 1,
      title: "기획 구체화 및 UI/UX 설계",
      desc: "고객의 아이디어를 실제 서비스 모델로 고도화합니다. 이후 브랜드의 가치를 담은 맞춤형 UI/UX 디자인을 완성합니다.",
      tasks: [
        "1:1 심층 상담을 통한 비즈니스 모델 분석 및 필수 핵심 기능(MVP) 정의",
        "페이지별 화면 흐름도 및 인터랙션 구조 기획",
        "브랜드 무드에 맞춘 모던 반응형 UI/UX 디자인 시안 확정"
      ]
    },
    {
      week: 2,
      title: "코어 UI 시스템 & 화면 개발",
      desc: "실제 디자인된 페이지 화면을 구축합니다. 서비스의 뼈대가 되는 코어 시스템을 신속하고 안정적으로 구축합니다.",
      tasks: [
        "모바일/태블릿/PC 어디서나 최적화되는 화면 코딩",
        "사용자 메인 화면, 상세/신청 페이지, 마이페이지 등 전체 프론트엔드 UI 완성",
        "1차 완성본 시연 링크 전달 및 피드백 반영"
      ]
    },
    {
      week: 3,
      title: "비즈니스 커스텀 기능 연동 및 구동",
      desc: "뼈대 위에 비즈니스만의 핵심 경쟁력이 될 특화 기능을 개발하고, 필요시 최신 AI 기술을 접목합니다.",
      tasks: [
        "비지니스 아이템 연동 확인",
        "실제 작동 확인",
        "각종 관리자 대시보드 데이터 연결"
      ]
    },
    {
      week: 4,
      title: "전 기능 통합 검수 및 최종 안정화",
      desc: "다양한 디바이스와 트래픽 환경을 고려한 엄격한 테스트를 진행하여, 자잘한 오류를 모두 잡아내고 안정성을 확보합니다.",
      tasks: [
        "구동 오류 체크",
        "비즈니시 기능 체크",
        "온라인에서 오류없는지 체크"
      ]
    },
    {
      week: 5,
      title: "정식 런칭",
      desc: "플랫폼 인수인계 및 홈페이지 오픈",
      tasks: []
    }
  ];

  return (
    <section id="workflow" className="bg-black text-white relative py-32 px-4">
      {/* High-end Subtle Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-[36px] md:text-[52px] font-bold tracking-tight mb-6 leading-[1.3]">
            아이디어에서 런칭까지 단 5주.<br />Platform Maker의 체계적인 워크플로우
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Base Vertical Line */}
          <div className="absolute left-[15px] md:left-[50%] top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"></div>

          {workflow.map((item, index) => (
            <motion.div 
              key={item.week}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row items-start w-full mb-12 md:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} ${index > 0 ? 'md:-mt-24 lg:-mt-32' : ''}`}
            >
              {/* Dot on the line */}
              <div className="absolute left-[-33px] md:left-1/2 md:-translate-x-1/2 top-[32px] md:top-[64px] w-[16px] h-[16px] bg-black border-4 border-white rounded-full z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

              {/* Content Box */}
              <div className={`w-full md:w-1/2 relative z-20 ${index % 2 === 0 ? 'md:pl-10 lg:pl-16' : 'md:pr-10 lg:pr-16'}`}>
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8 hover:bg-[#151515] hover:border-white/30 transition-colors duration-500 shadow-lg">
                  <div className="text-white/40 font-bold tracking-widest text-[14px] mb-2">WEEK {item.week}</div>
                  <h3 className="text-[22px] md:text-[24px] font-bold mb-4">{item.title}</h3>
                  <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-6 break-keep">
                    {item.desc}
                  </p>
                  
                  {item.tasks.length > 0 && (
                    <ul className="space-y-3 border-t border-white/10 pt-6">
                      {item.tasks.map((task, i) => (
                        <li key={i} className="flex items-start text-[13px] md:text-[14px] text-white/50">
                          <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span>
                          <span className="leading-relaxed break-keep">{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const portfolios = [
    {
      id: 1,
      type: "O2O 매칭 앱",
      title: "S사 맞춤형 B2B 견적 매칭 플랫폼",
      tags: ["#실시간매칭", "#1:1채팅", "#결제시스템"],
      image: "/assets/images/portfolio_matching_app_1787205038370.png"
    },
    {
      id: 2,
      type: "SaaS 웹 대시보드",
      title: "F사 가맹점 통합 관리 시스템",
      tags: ["#데이터시각화", "#회원통계", "#실시간리포트"],
      image: "/assets/images/portfolio_dashboard_1787205051396.png"
    },
    {
      id: 3,
      type: "이커머스 & 예약 서비스",
      title: "M사 위치기반 맞춤형 뷰티 예약",
      tags: ["#위치기반(GPS)", "#스케줄링", "#리뷰시스템"],
      image: "/assets/images/portfolio_booking_app_1787205064182.png"
    }
  ];

  return (
    <section id="portfolio" className="bg-white text-[#111] relative py-32 px-4 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-[48px] md:text-[64px] font-bold tracking-tight mb-6 font-display text-black">
            Portfolio
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#666] leading-[1.6] max-w-[700px] mx-auto break-keep">
            고객사의 비즈니스 아이디어 보호를 위해, 본 화면은 전체적인 톤앤매너와 개발 퀄리티를 확인하실 수 있는 <span className="font-semibold text-black">샘플 형태</span>로만 제공되는 점 양해 부탁드립니다.
          </p>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {portfolios.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-6 relative border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] bg-[#f8f8f8]">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5"></div>
              </div>

              {/* Text Info */}
              <div className="px-1">
                <div className="text-[13px] font-semibold text-black/40 mb-3 tracking-wide">{item.type}</div>
                <h3 className="text-[22px] font-bold text-black mb-4 leading-tight">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#f5f5f7] text-[#555] text-[13px] rounded-full font-medium tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="bg-white text-[#111] relative py-32 px-4 border-t border-black/5">
      <div className="max-w-[1000px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-[48px] md:text-[56px] font-bold tracking-tight mb-6 font-display text-black leading-tight">
            합리적이고 투명한<br />프로젝트 플랜
          </h2>
          <p className="text-[18px] text-[#666] leading-[1.6] max-w-[600px] mx-auto break-keep">
            비즈니스 단계에 맞는 최적의 플랜을 선택하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Card 1: Platform/MVP (Highlight) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0a0a0a] text-white rounded-[32px] p-10 md:p-12 flex flex-col relative shadow-[0_30px_60px_rgba(0,0,0,0.15)] transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black text-[13px] font-bold px-5 py-2.5 rounded-full tracking-wider shadow-lg">
              Most Popular
            </div>
            
            <h3 className="text-[28px] font-bold mb-4 mt-2">플랫폼 웹/앱(MVP)</h3>
            <p className="text-[16px] text-white/60 mb-8 h-12 break-keep leading-relaxed">
              자본을 효율적으로 사용하여 맞춤형 플랫폼 및 MVP 제작
            </p>
            
            <div className="mb-10 pb-10 border-b border-white/10">
              <div className="text-[36px] font-bold tracking-tight">500~1,500<span className="text-[20px] font-medium text-white/60 ml-1">만원</span></div>
            </div>
            
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-start text-[15px] font-semibold text-white">
                <span className="mr-3 text-[12px] mt-[4px]">⚡</span> 5주 완성형
              </li>
              <li className="flex items-start text-[15px] text-white/70">
                <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span> 100% 맞춤형 하이엔드 UI/UX
              </li>
              <li className="flex items-start text-[15px] text-white/70">
                <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span> Ai연결을 통한 사용자 서비스 제공
              </li>
              <li className="flex items-start text-[15px] text-white/70">
                <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span> 복수사용자와 관리자 기능을 갖춘 운영 플랫폼
              </li>
              <li className="flex items-start text-[15px] text-white/70">
                <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span> 반응형 웹 기반 모바일 웹앱(PWA)
              </li>
              <li className="flex items-start text-[15px] text-white/70">
                <span className="mr-3 text-white/30 text-[10px] mt-[6px]">●</span> 투자유치 및 국책과제 MVP 제작
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/estimate')}
              className="w-full py-4 rounded-full bg-white text-black font-bold text-[16px] transition-transform duration-200 active:scale-95 hover:bg-gray-100"
            >
              무료 컨설팅 신청하기
            </button>
          </motion.div>

          {/* Card 2: Company Homepage */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f8f8f8] border border-black/5 rounded-[32px] p-10 md:p-12 flex flex-col hover:bg-white transition-colors duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] mt-8 md:mt-0"
          >
            <h3 className="text-[28px] font-bold mb-4 mt-2 text-black">자사 홈페이지 제작</h3>
            <p className="text-[16px] text-[#666] mb-8 h-12 break-keep leading-relaxed">
              스타트업 소개용 하이엔드 웹사이트.<br/>신규 앱 런칭 전 안내 웹사이트.
            </p>
            
            <div className="mb-10 pb-10 border-b border-black/10">
              <div className="text-[36px] font-bold text-black tracking-tight">100<span className="text-[20px] font-medium text-[#666] ml-1">만원부터</span></div>
            </div>
            
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-start text-[15px] text-[#555]">
                <span className="mr-3 text-black/20 text-[10px] mt-[6px]">●</span> 완벽한 반응형 웹
              </li>
              <li className="flex items-start text-[15px] text-[#555]">
                <span className="mr-3 text-black/20 text-[10px] mt-[6px]">●</span> 하이엔드 애니메이션
              </li>
              <li className="flex items-start text-[15px] text-[#555]">
                <span className="mr-3 text-black/20 text-[10px] mt-[6px]">●</span> 3~4주 소요
              </li>
            </ul>
            
            <button 
              onClick={() => navigate('/estimate')}
              className="w-full py-4 rounded-full bg-transparent border-2 border-black text-black font-bold text-[16px] transition-transform duration-200 active:scale-95 hover:bg-black hover:text-white"
            >
              문의하기
            </button>
          </motion.div>

        </div>

        {/* Contract Process Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-24 border-t border-black/10"
        >
          <div className="text-center mb-16">
            <h3 className="text-[32px] md:text-[40px] font-bold text-black mb-4 tracking-tight">투명하고 안전한 계약 진행 안내</h3>
            <p className="text-[#666] text-[16px] md:text-[18px] break-keep">
              비주얼이 완성된 후 중도금을, 최종 배포까지 책임진 후 잔금을 받습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-black/5"></div>
            
            {[
              {
                step: "01",
                title: "기획 및 계약",
                badge: "계약금 50%",
                badgeColor: "bg-black text-white shadow-md",
                desc: ["프로젝트 신청 및 심층 상담", "개발 범위 확정 및 계약 체결"]
              },
              {
                step: "02",
                title: "디자인 완료",
                badge: "중도금 40%",
                badgeColor: "bg-[#f5f5f7] text-[#555] border border-black/10",
                desc: ["맞춤형 UI/UX 화면 설계", "비주얼 퍼블리싱 및 시연"]
              },
              {
                step: "03",
                title: "기능 개발 및 검증",
                badge: "개발 집중",
                badgeColor: "bg-transparent text-[#999] border border-transparent",
                desc: ["비즈니스 핵심 로직 구현", "통합 테스트 및 안정화"]
              },
              {
                step: "04",
                title: "정식 런칭",
                badge: "잔금 10%",
                badgeColor: "bg-[#f5f5f7] text-[#555] border border-black/10",
                desc: ["서버 배포", "소스 인수인계 및 종료"]
              }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                {/* Node */}
                <div className="w-[56px] h-[56px] rounded-full bg-white border border-black/10 shadow-[0_10px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-[20px] font-bold text-black relative z-10 mb-6 font-display">
                  {item.step}
                </div>
                
                <h4 className="text-[22px] font-bold text-black mb-3">{item.title}</h4>
                <div className={`px-4 py-1.5 rounded-full text-[13px] font-bold mb-6 tracking-wide ${item.badgeColor}`}>
                  {item.badge}
                </div>
                
                <ul className="space-y-2 text-[#555]">
                  {item.desc.map((d, i) => (
                    <li key={i} className="text-[15px] break-keep leading-relaxed">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Refund Guarantee Banner */}
          <div className="mt-20 flex justify-center">
            <div className="bg-[#f8f8f8] border border-black/10 rounded-2xl py-6 px-8 md:px-10 flex flex-col md:flex-row items-center gap-5 shadow-sm">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-[22px] flex-shrink-0">
                ✓
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-[18px] font-bold text-black mb-1">개발 중단시 100% 환불 보장</h4>
                <p className="text-[15px] text-[#555] break-keep">개발사의 문제로 인해서 개발 중단시 100% 환불을 보장드립니다.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "기획서가 완벽하지 않습니다. 머릿속 아이디어만으로도 개발을 시작할 수 있나요?",
      a: "네, 물론입니다. Platform Maker는 단순한 외주사가 아닌 비즈니스 파트너입니다. 추상적인 아이디어만 가지고 오셔도, '기획 구체화' 단계를 통해 시장에 통하는 비즈니스 모델(BM)과 화면 흐름도를 저희가 직접 설계해 드립니다."
    },
    {
      q: "500~1,500만 원의 견적 기준은 어떻게 정해지나요?",
      a: "서비스의 복잡도와 맞춤형(커스텀) 기능의 깊이에 따라 결정됩니다. 고객님 비즈니스에 꼭 필요한 추가 기능(AI 연동, 채팅, 복잡한 매칭 등)을 더해 합리적이고 투명하게 견적을 산출합니다."
    },
    {
      q: "프로젝트가 완료된 후, 소스코드 소유권은 100% 양도되나요?",
      a: "네, 100% 양도됩니다. 잔금 결제 및 프로젝트가 종료되는 즉시, 완성된 프론트엔드/백엔드 소스코드 원본과 서버 운영 권한 일체를 대표님(고객사) 측으로 완벽하게 인수인계해 드립니다."
    },
    {
      q: "'단 5주 완성'이 정말로 보장되나요?",
      a: "네, 저희는 한번에 다수의 업체를 맡아서 공장처럼 찍어내지 않고 1:1로 체계적인 진행을 하기 때문에 가능합니다. 다만, 의뢰 업체에서 계획을 수정하거나, 초기 자료를 확정하지 못하시는 등의 문제로 기간은 길어질 수 있습니다. 자료제공과 결정만 빠르게 하신다면 약속된 5주 안에 정식 런칭이 가능하도록 철저하게 일정을 관리합니다."
    },
    {
      q: "혹시라도 개발 도중에 에이전시 측의 문제로 프로젝트가 중단되면 어떻게 하나요?",
      a: "Platform Maker는 타 외주사에서 흔히 발생하는 '잠수'나 '개발 중단' 리스크가 없습니다. 이를 증명하기 위해, 대표님께서 눈으로 직접 화면(비주얼)을 확인하신 후에만 중도금을 청구합니다. 저희의 문제로 개발이 완료되지 못할경우 100% 환불 보장제를 시행하고 있습니다."
    },
    {
      q: "런칭 후 발생하는 오류(버그)나 유지보수는 어떻게 진행되나요?",
      a: "런칭 직후 발생하는 버그나 시스템 안정화에 대해서는 일정 기간 무상으로 A/S를 완벽하게 지원합니다. 이후 정기적인 서버 관리나 기능 업데이트가 필요하신 경우, 합리적인 월 정액제 기반의 '올케어 파트너십'을 통해 내부 전담 IT 팀처럼 지속적인 관리를 받으실 수 있습니다."
    },
    {
      q: "5주 동안 개발 진행 상황은 어떻게 공유받을 수 있나요?",
      a: "프로젝트가 시작되면 즉시 고객사 전용 소통 채널을 개설하여 실시간으로 소통합니다. 주요 단계마다 실제 구동되는 시연 링크를 보내드려 직접 눈으로 확인하시고 피드백하실 수 있습니다."
    }
  ];

  return (
    <section id="faq" className="bg-[#f5f5f7] py-32 px-4 border-t border-black/5">
      <div className="max-w-[800px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] md:text-[52px] font-bold tracking-tight mb-6 font-display text-black">
            자주 묻는 질문
          </h2>
          <p className="text-[17px] text-[#666]">프로젝트 시작 전 궁금하신 점을 모두 해결해 드립니다.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex justify-between items-center focus:outline-none group"
              >
                <span className="font-bold text-[16px] md:text-[18px] text-black pr-8 tracking-tight group-hover:text-blue-600 transition-colors">
                  {faq.q}
                </span>
                <span className={`text-2xl font-light flex-shrink-0 transition-transform duration-300 transform ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-black/40'}`}>
                  ↓
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-7 md:px-8 pt-2 text-[#555] text-[15px] md:text-[16px] leading-[1.7] border-t border-black/5 mx-2 md:mx-4 break-keep">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0a0a0a] text-[#888] pt-20 pb-12 px-6 border-t border-white/5 text-[14px] font-body">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          
          {/* Brand & Call to action */}
          <div className="md:w-1/2">
            <div className="flex items-center mb-6">
              <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-11 h-11 object-cover rounded-xl mr-4 shadow-lg border border-white/10" />
              <h2 className="text-[28px] font-bold text-white tracking-tight">Platform Maker</h2>
            </div>
            <p className="text-[16px] text-[#999] mb-8 max-w-[400px] leading-[1.6] break-keep">
              위대한 비즈니스는 빠른 실행에서 시작됩니다.<br/>
              당신의 혁신적인 아이디어를 세상에 가장 완벽한 형태로 내놓으세요.
            </p>
            <button 
              onClick={() => navigate('/estimate')}
              className="bg-white text-black text-[15px] font-bold py-4 px-8 rounded-full transition-transform duration-200 active:scale-95 hover:bg-gray-200"
            >
              프로젝트 문의하기
            </button>
          </div>

          {/* Business Info */}
          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="space-y-2 text-left md:text-right text-[13px] leading-relaxed">
              <p><strong className="text-white font-medium text-[15px]">주식회사 블루프라임</strong></p>
              <p>대표자: 김덕규 <span className="mx-2 text-white/20">|</span> 사업자등록번호: 153-87-03544</p>
              <p>서울특별시 노원구 상계로23다길 13-8, 1101호</p>
              <div className="pt-3 flex flex-col md:flex-row md:justify-end gap-2 md:gap-6">
                <span>Tel: <strong className="text-white font-medium tracking-wider">010-3046-9821</strong></span>
                <span>Email: <strong className="text-white font-medium tracking-wide">goodduck2@naver.com</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[12px] text-[#666]">
          <p className="mt-4 md:mt-0">© 2026 Platform Maker (BluePrime Co., Ltd.). All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="w-full min-h-screen bg-surface-canvas">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="w-full">
              <Hero />
              <Problem />
              <Features />
              <Workflow />
              <Portfolio />
              <Pricing />
              <FAQ />
            </main>
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/mypage" element={<MyPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/naver/callback" element={<NaverCallback setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/auth/google/callback" element={<GoogleCallback setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
