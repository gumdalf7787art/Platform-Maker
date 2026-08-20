import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Receipt, MessageSquare, 
  Wrench, Bookmark, Settings, LogOut, ArrowLeft,
  Bell, ChevronRight, Download, FileText, Camera, Check
} from 'lucide-react';

export default function MyPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // 비밀번호 변경용 State
  const [pwdForm, setPwdForm] = useState({ current: '', new: '', confirm: '' });
  const [pwdErrors, setPwdErrors] = useState({ current: '', new: '', confirm: '' });
  
  // 알림 수신 설정용 State
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 데모를 위한 임시 현재 비밀번호
  const MOCK_CURRENT_PASSWORD = "password123!"; 

  const validatePasswordRule = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return passwordRegex.test(password);
  };

  const handlePwdChange = (e) => {
    const { name, value } = e.target;
    setPwdForm(prev => ({ ...prev, [name]: value }));
    // 타이핑 중에는 에러 해제
    setPwdErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePwdBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return;

    if (name === 'current') {
      if (value !== MOCK_CURRENT_PASSWORD) {
        setPwdErrors(prev => ({ ...prev, current: '비밀번호 오류' }));
      }
    } else if (name === 'new') {
      if (!validatePasswordRule(value)) {
        setPwdErrors(prev => ({ ...prev, new: '비밀번호 규칙 오류' }));
      }
      // 새 비밀번호를 변경했을 때, 아래쪽 '확인' 칸이 이미 채워져 있다면 함께 검사
      if (pwdForm.confirm && value !== pwdForm.confirm) {
        setPwdErrors(prev => ({ ...prev, confirm: '비밀번호 오류' }));
      } else if (pwdForm.confirm && value === pwdForm.confirm) {
        setPwdErrors(prev => ({ ...prev, confirm: '' }));
      }
    } else if (name === 'confirm') {
      if (value !== pwdForm.new) {
        setPwdErrors(prev => ({ ...prev, confirm: '비밀번호 오류' }));
      }
    }
  };

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: <LayoutDashboard size={18} /> },
    { id: 'project', label: '내 프로젝트', icon: <FolderKanban size={18} /> },
    { id: 'support', label: '1:1 소통', icon: <MessageSquare size={18} /> },
    { id: 'maintenance', label: '유지보수 관리', icon: <Wrench size={18} /> },
    { id: 'settings', label: '내 정보 설정', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#5227FF]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-[260px] bg-white border-r border-black/5 flex flex-col fixed h-full z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        {/* Logo & Back */}
        <div className="h-[70px] flex items-center px-6 border-b border-black/5 justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src="/assets/images/logo.png" alt="Platform Maker Logo" className="w-7 h-7 object-cover rounded-lg mr-2 shadow-sm border border-black/5" />
            <span className="font-display font-bold text-[16px] text-black tracking-tight">Platform Maker</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="px-6 py-8 border-b border-black/5 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] p-[2px] mb-4 shadow-md">
            <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <h3 className="font-bold text-[16px] text-black">홍길동 대표님</h3>
          <p className="text-[13px] text-gray-500 mt-1">(주)스타트업컴퍼니</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-[14px] font-medium ${
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <span className={`mr-3 ${isActive ? 'text-[#FF9FFC]' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-black/5">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-[14px] font-medium text-gray-500 hover:bg-gray-100 hover:text-black"
          >
            <ArrowLeft size={18} className="mr-3 text-gray-400" />
            메인으로 돌아가기
          </button>
          <button className="w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-[14px] font-medium text-red-500 hover:bg-red-50 mt-1">
            <LogOut size={18} className="mr-3" />
            로그아웃
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[260px] relative z-10 p-8 lg:p-10 min-h-screen overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[24px] font-bold text-black tracking-tight mb-1">
              {menuItems.find(m => m.id === activeMenu)?.label}
            </h1>
            <p className="text-[14px] text-gray-500">홍길동 대표님의 비즈니스 현황입니다.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors relative shadow-sm">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard View */}
        {activeMenu === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Status */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 col-span-2 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[16px] text-black">진행 중인 프로젝트</h3>
                    <span className="bg-gray-100 text-gray-500 text-[12px] font-bold px-3 py-1 rounded-full">개발 단계 (0주차)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <h2 className="text-[22px] font-bold text-gray-400 tracking-tight">아직 진행중인 프로젝트가 없습니다.</h2>
                    <button 
                      onClick={() => navigate('/estimate')}
                      className="bg-black text-white text-[14px] font-bold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-md w-fit"
                    >
                      프로젝트 문의하기
                    </button>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px] font-bold">
                      <span className="text-gray-400">0% 완료</span>
                      <span className="text-gray-400">목표 런칭일 : 미정</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gray-300 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
                {/* Decorative graphic */}
                <div className="absolute right-[-10%] bottom-[-20%] w-[200px] h-[200px] bg-gray-100 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Billing Summary */}
              <div className="bg-black rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-white flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[15px] text-white/70 mb-4 flex items-center">
                    <Receipt size={16} className="mr-2 opacity-70" />
                    결제 현황
                  </h3>
                  <p className="text-[13px] text-white/50 mb-1">총 계약 금액</p>
                  <p className="text-[24px] font-bold mb-4">0<span className="text-[14px] font-normal ml-1 opacity-70">원</span></p>
                </div>
                
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/60">계약금 (완료)</span>
                    <span className="font-semibold text-white/40">0 원</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/60">중도금 (예정)</span>
                    <span className="font-semibold text-white/40">0 원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Messages/Updates */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-black">최근 업데이트 내역</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <p className="text-[14px]">없음.</p>
                </div>
              </div>

              {/* Document Downloads */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">산출물 및 문서</h3>
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <p className="text-[14px]">없음.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings View */}
        {activeMenu === 'settings' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Left Column */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">프로필 관리</h3>
                
                <div className="flex items-center mb-8">
                  <div className="relative w-20 h-20 rounded-full group cursor-pointer mr-6">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-gray-100" />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <button className="bg-gray-100 text-gray-700 text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">사진 변경</button>
                    <p className="text-[11px] text-gray-400 mt-2">JPG, PNG (최대 5MB)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">이름</label>
                      <input type="text" defaultValue="홍길동" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:bg-white focus:border-black outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">직급</label>
                      <input type="text" defaultValue="대표" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:bg-white focus:border-black outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">회사명 (소속)</label>
                    <input type="text" defaultValue="(주)스타트업컴퍼니" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:bg-white focus:border-black outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">이메일</label>
                      <input type="email" defaultValue="hong@startup.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:bg-white focus:border-black outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">연락처</label>
                      <input type="tel" defaultValue="010-1234-5678" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:bg-white focus:border-black outline-none transition-colors" />
                    </div>
                  </div>
                  <button className="w-full bg-black text-white font-bold text-[14px] py-3 rounded-xl mt-4 hover:bg-gray-800 transition-colors">변경사항 저장</button>
                </div>
              </div>

              {/* Security / Password */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">보안 및 비밀번호</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">현재 비밀번호 (테스트용: password123!)</label>
                    <input 
                      type="password" 
                      name="current"
                      value={pwdForm.current}
                      onChange={handlePwdChange}
                      onBlur={handlePwdBlur}
                      placeholder="현재 비밀번호 입력" 
                      className={`w-full bg-gray-50 border ${pwdErrors.current ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-black'} rounded-xl px-4 py-2.5 text-[14px] focus:bg-white outline-none transition-colors`} 
                    />
                    {pwdErrors.current && <p className="mt-1.5 text-red-500 text-[12px] font-medium">{pwdErrors.current}</p>}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">새 비밀번호</label>
                    <input 
                      type="password" 
                      name="new"
                      value={pwdForm.new}
                      onChange={handlePwdChange}
                      onBlur={handlePwdBlur}
                      placeholder="영문, 숫자, 특수기호 포함 8~12자리" 
                      className={`w-full bg-gray-50 border ${pwdErrors.new ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-black'} rounded-xl px-4 py-2.5 text-[14px] focus:bg-white outline-none transition-colors`} 
                    />
                    {pwdErrors.new && <p className="mt-1.5 text-red-500 text-[12px] font-medium">{pwdErrors.new}</p>}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">새 비밀번호 확인</label>
                    <input 
                      type="password" 
                      name="confirm"
                      value={pwdForm.confirm}
                      onChange={handlePwdChange}
                      onBlur={handlePwdBlur}
                      placeholder="비밀번호 재입력" 
                      className={`w-full bg-gray-50 border ${pwdErrors.confirm ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-black'} rounded-xl px-4 py-2.5 text-[14px] focus:bg-white outline-none transition-colors`} 
                    />
                    {pwdErrors.confirm && <p className="mt-1.5 text-red-500 text-[12px] font-medium">{pwdErrors.confirm}</p>}
                  </div>
                  <button className="w-full border border-gray-200 text-black font-bold text-[14px] py-3 rounded-xl mt-2 hover:bg-gray-50 transition-colors">비밀번호 변경하기</button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Notifications Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">알림 수신 설정</h3>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-gray-800">이메일 알림</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">프로젝트 진행 상황 및 영수증 수신</p>
                    </div>
                    {/* iOS style toggle */}
                    <div 
                      onClick={() => toggleNotification('email')}
                      className={`w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-300 ${notifications.email ? 'bg-[#00C851]' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${notifications.email ? 'left-[22px]' : 'left-1'}`}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-gray-800">카카오톡/문자 알림</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">긴급 공지 및 실시간 피드백 알림</p>
                    </div>
                    {/* iOS style toggle */}
                    <div 
                      onClick={() => toggleNotification('sms')}
                      className={`w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-300 ${notifications.sms ? 'bg-[#00C851]' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${notifications.sms ? 'left-[22px]' : 'left-1'}`}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-gray-800">마케팅 수신 동의 (선택)</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">신규 기능 출시 및 프로모션 안내</p>
                    </div>
                    {/* iOS style toggle */}
                    <div 
                      onClick={() => toggleNotification('marketing')}
                      className={`w-11 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-300 ${notifications.marketing ? 'bg-[#00C851]' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${notifications.marketing ? 'left-[22px]' : 'left-1'}`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-[24px] p-6 border border-red-100 relative overflow-hidden group hover:border-red-200 transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 opacity-50"></div>
                <h3 className="font-bold text-[16px] text-red-600 mb-2">계정 관리</h3>
                <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
                  회원 탈퇴 시 모든 프로젝트 열람 기록과 결제 내역이 삭제되며, 복구할 수 없습니다.
                </p>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="text-[13px] font-bold text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  회원 탈퇴하기
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty States for Project, Support, Maintenance */}
        {['project', 'support', 'maintenance'].includes(activeMenu) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-[50vh] text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              {menuItems.find(m => m.id === activeMenu)?.icon || <FolderKanban size={32} className="text-gray-400" />}
            </div>
            <h2 className="text-[20px] font-bold text-gray-800 mb-2">아직 진행중인 프로젝트가 없습니다.</h2>
            <p className="text-[15px] text-gray-500">새로운 프로젝트를 의뢰하시면 이곳에서 현황을 확인하실 수 있습니다.</p>
          </motion.div>
        )}
      </main>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed top-0 left-0 w-screen h-screen z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[24px] p-8 w-[340px] md:w-[380px] relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col"
            >
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-[20px] font-bold text-black mb-2 tracking-tight">정말 탈퇴하시겠습니까?</h2>
              <p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
                탈퇴 시 모든 프로젝트 열람 기록과 결제 내역이 즉시 삭제되며, 이 작업은 복구할 수 없습니다.
              </p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold text-[14px] py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    navigate('/'); // 탈퇴 후 홈으로 이동 처리 (임시)
                  }}
                  className="flex-1 bg-red-500 text-white font-bold text-[14px] py-3 rounded-xl hover:bg-red-600 transition-colors shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
                >
                  탈퇴하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
