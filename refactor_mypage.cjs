const fs = require('fs');
const filePath = 'h:/platform/src/components/MyPage.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove billing and scrapbook from menuItems
content = content.replace(
  /    \{ id: 'billing', label: '견적 및 결제', icon: <Receipt size=\{18\} \/> \},\n/,
  ''
);
content = content.replace(
  /    \{ id: 'scrapbook', label: '레퍼런스 스크랩', icon: <Bookmark size=\{18\} \/> \},\n/,
  ''
);

// 2. Project Status Replacement
const oldProjectStatus = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 col-span-2 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[16px] text-black">진행 중인 프로젝트</h3>
                    <span className="bg-[#E5F5EC] text-[#00A250] text-[12px] font-bold px-3 py-1 rounded-full">개발 단계 (3주차)</span>
                  </div>
                  <h2 className="text-[22px] font-bold text-black mb-2 tracking-tight">O2O 매칭 플랫폼 MVP 개발</h2>
                  <p className="text-[14px] text-gray-500 mb-8">현재 맞춤형 커스텀 기능을 연동하고 있습니다.</p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px] font-bold">
                      <span className="text-[#5227FF]">65% 완료</span>
                      <span className="text-gray-400">목표 런칭일: 2026. 09. 15</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
                {/* Decorative graphic */}
                <div className="absolute right-[-10%] bottom-[-20%] w-[200px] h-[200px] bg-[#5227FF]/5 rounded-full blur-3xl pointer-events-none"></div>
              </div>`;

const newProjectStatus = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 col-span-2 flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[16px] text-black">진행 중인 프로젝트</h3>
                    <span className="bg-gray-100 text-gray-500 text-[12px] font-bold px-3 py-1 rounded-full">개발 단계 (0주차)</span>
                  </div>
                  <h2 className="text-[22px] font-bold text-gray-400 mb-8 tracking-tight">아직 진행중인 프로젝트가 없습니다.</h2>
                  
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
              </div>`;

content = content.replace(oldProjectStatus, newProjectStatus);

// 3. Billing Summary Replacement
const oldBilling = `<div className="bg-black rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-white flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[15px] text-white/70 mb-4 flex items-center">
                    <Receipt size={16} className="mr-2 opacity-70" />
                    결제 현황
                  </h3>
                  <p className="text-[13px] text-white/50 mb-1">총 계약 금액</p>
                  <p className="text-[24px] font-bold mb-4">12,000,000<span className="text-[14px] font-normal ml-1 opacity-70">원</span></p>
                </div>
                
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/60">계약금 (완료)</span>
                    <span className="font-semibold">6,000,000 원</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-white/60">중도금 (예정)</span>
                    <span className="font-semibold text-[#FF9FFC]">4,800,000 원</span>
                  </div>
                </div>
              </div>`;

const newBilling = `<div className="bg-black rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-white flex flex-col justify-between">
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
              </div>`;

content = content.replace(oldBilling, newBilling);

// 4. Updates & Docs replacement
const oldUpdates = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-black">최근 업데이트 내역</h3>
                  <button className="text-[13px] text-gray-500 hover:text-black font-medium flex items-center">
                    전체보기 <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: '디자인 시안 1차 컨펌 요청', date: '오늘 10:30 AM', status: '요청', color: 'bg-blue-100 text-blue-600' },
                    { title: 'DB 설계 완료 및 서버 세팅', date: '어제 16:45 PM', status: '완료', color: 'bg-green-100 text-green-600' },
                    { title: '기획서(스토리보드) 최종본', date: '2일 전', status: '첨부', color: 'bg-purple-100 text-purple-600' }
                  ].map((msg, i) => (
                    <div key={i} className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className={\`mt-1 mr-4 px-2 py-1 rounded text-[11px] font-bold whitespace-nowrap \${msg.color}\`}>
                        {msg.status}
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-gray-800 group-hover:text-black">{msg.title}</p>
                        <p className="text-[12px] text-gray-400 mt-1">{msg.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>`;

const newUpdates = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-black">최근 업데이트 내역</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <p className="text-[14px]">없음.</p>
                </div>
              </div>`;
content = content.replace(oldUpdates, newUpdates);

const oldDocs = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">산출물 및 문서</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-black/20 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-[#FEE500]/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText size={20} className="text-yellow-600" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">계약서 PDF</p>
                    <p className="text-[11px] text-gray-400 mt-1">2026.08.10</p>
                  </div>
                  
                  <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-black/20 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Download size={20} className="text-blue-500" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">기획서 (Figma)</p>
                    <p className="text-[11px] text-gray-400 mt-1">v1.2 업데이트</p>
                  </div>

                  <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-black/20 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Receipt size={20} className="text-gray-500" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">계약금 영수증</p>
                    <p className="text-[11px] text-gray-400 mt-1">발행 완료</p>
                  </div>
                </div>
              </div>`;

const newDocs = `<div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="font-bold text-[16px] text-black mb-6">산출물 및 문서</h3>
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <p className="text-[14px]">없음.</p>
                </div>
              </div>`;

content = content.replace(oldDocs, newDocs);

// 5. Add Empty States for project, support, maintenance
const emptyStates = `
        {/* Empty States for Project, Support, Maintenance */}
        {['project', 'support', 'maintenance'].includes(activeMenu) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FolderKanban size={32} className="text-gray-400" />
            </div>
            <h2 className="text-[20px] font-bold text-gray-800 mb-2">아직 진행중인 프로젝트가 없습니다.</h2>
            <p className="text-[15px] text-gray-500">새로운 프로젝트를 의뢰하시면 이곳에서 현황을 확인하실 수 있습니다.</p>
          </motion.div>
        )}`;

// Insert after settings view
content = content.replace(
  /        \{\/\* Delete Account Modal \*\/\}/,
  emptyStates + '\n\n        {/* Delete Account Modal */}'
);

fs.writeFileSync(filePath, content, 'utf8');
