import React, { useRef } from 'react';
import { Home, ShoppingCart, Activity, PieChart, Settings, Bell, Search, UserPlus, MoreHorizontal, Eye, Edit3, Trash2 } from 'lucide-react';

const DashboardMockup = () => {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const isAtTop = scrollTop <= 0;

    if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
      window.scrollBy({ top: e.deltaY });
    }
  };

  return (
    <div className="w-full h-full bg-[#f5f5f7] flex text-left font-body overflow-hidden">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r border-divider-soft flex flex-col py-6 px-4 hidden md:flex">
        <div className="flex items-center space-x-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-400"></div>
          <div>
            <div className="font-semibold text-[14px]">김대표</div>
            <div className="text-[12px] text-ink-muted-80">관리자</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-surface-parchment text-ink font-medium text-[14px]">
            <Home size={18} />
            <span>대시보드</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-ink-muted-80 hover:bg-surface-parchment hover:text-ink transition-colors text-[14px]">
            <ShoppingCart size={18} />
            <span>주문 내역</span>
          </a>
          <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-ink-muted-80 hover:bg-surface-parchment hover:text-ink transition-colors text-[14px]">
            <div className="flex items-center space-x-3">
              <Activity size={18} />
              <span>트래커</span>
            </div>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-ink-muted-80 hover:bg-surface-parchment hover:text-ink transition-colors text-[14px]">
            <PieChart size={18} />
            <span>애널리틱스</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-ink-muted-80 hover:bg-surface-parchment hover:text-ink transition-colors text-[14px]">
            <Settings size={18} />
            <span>설정</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-[#fafafc] overflow-hidden">
        {/* Header */}
        <header className="h-[72px] flex items-center justify-between px-8 border-b border-divider-soft bg-white/50 backdrop-blur-md">
          <h2 className="text-[20px] font-semibold text-ink flex items-center">
            <span className="mr-2">👋</span> 좋은 아침입니다, 대표님
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted-80" />
              <input type="text" placeholder="검색..." className="pl-9 pr-4 py-1.5 bg-surface-parchment border-none rounded-full text-[14px] w-64 focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button className="p-2 text-ink-muted-80 hover:text-ink transition-colors rounded-full hover:bg-surface-parchment">
              <Bell size={18} />
            </button>
            <button className="flex items-center space-x-2 bg-primary text-white px-4 py-1.5 rounded-full text-[14px] font-medium shadow-sm hover:bg-primary-focus transition-colors">
              <UserPlus size={16} />
              <span>초대하기</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div 
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex-1 overflow-y-auto overscroll-auto p-8 space-y-6"
        >
          
          {/* Tabs */}
          <div className="flex space-x-2 bg-surface-parchment p-1 rounded-lg w-fit">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-[14px] font-medium text-ink">오버뷰</button>
            <button className="px-4 py-1.5 rounded-md text-[14px] font-medium text-ink-muted-80 hover:text-ink">매출</button>
            <button className="px-4 py-1.5 rounded-md text-[14px] font-medium text-ink-muted-80 hover:text-ink">지출</button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: '총 매출', value: '₩228,441,000', change: '+3.3%', isPositive: true },
              { title: '지출', value: '₩25,108,000', change: '-1.2%', isPositive: false },
              { title: '신규 가입', value: '458 명', change: '+4.1%', isPositive: true },
              { title: '순이익', value: '₩203,133,000', change: '+5.5%', isPositive: true },
            ].map((kpi, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-divider-soft shadow-sm flex flex-col justify-between">
                <div className="text-[14px] text-ink-muted-80 font-medium mb-4">{kpi.title}</div>
                <div className="flex items-end justify-between">
                  <div className="text-[22px] font-bold text-ink">{kpi.value}</div>
                  <div className={`text-[12px] font-bold px-2 py-0.5 rounded-md ${kpi.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {kpi.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl border border-divider-soft shadow-sm col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">매출 성과</h3>
                  <div className="text-[13px] text-ink-muted-80">최근 2주간 일별 매출</div>
                </div>
                <button className="px-3 py-1 bg-surface-parchment rounded-lg text-[13px] font-medium">최근 2주 ▾</button>
              </div>
              <div className="h-48 flex items-end justify-between space-x-2 pt-4">
                {[40, 70, 30, 85, 45, 20, 60, 90, 55, 30, 75, 40, 100, 65].map((h, i) => (
                  <div key={i} className="w-full bg-primary rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-ink-muted-48">
                <span>01</span><span>03</span><span>05</span><span>07</span><span>09</span><span>11</span><span>14</span>
              </div>
            </div>

            {/* Line Chart Placeholder */}
            <div className="bg-white p-6 rounded-xl border border-divider-soft shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[15px] font-semibold text-ink">트래픽 유입</h3>
                <MoreHorizontal size={16} className="text-ink-muted-80" />
              </div>
              <div className="flex-1 relative flex items-center justify-center">
                {/* SVG Line Chart Graphic */}
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <path d="M0 40 Q 10 30, 20 35 T 40 20 T 60 25 T 80 10 T 100 20" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 45 Q 15 40, 30 45 T 60 30 T 80 40 T 100 35" fill="none" stroke="#7a7a7a" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Table Row */}
          <div className="bg-white rounded-xl border border-divider-soft shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-divider-soft flex justify-between items-center">
              <h3 className="text-[15px] font-semibold text-ink">최근 진행 프로젝트</h3>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted-80" />
                <input type="text" placeholder="검색..." className="pl-8 pr-3 py-1 bg-surface-parchment rounded-md text-[13px] border-none focus:outline-none focus:ring-1 focus:ring-primary w-48" />
              </div>
            </div>
            <table className="w-full text-left text-[13px]">
              <thead className="bg-surface-parchment text-ink-muted-80">
                <tr>
                  <th className="px-6 py-3 font-medium">프로젝트명</th>
                  <th className="px-6 py-3 font-medium">담당자</th>
                  <th className="px-6 py-3 font-medium">상태</th>
                  <th className="px-6 py-3 font-medium text-right">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider-soft">
                {[
                  { name: 'AI 기반 매칭 플랫폼', manager: '이팀장', status: '개발 중', statusColor: 'bg-blue-50 text-blue-600' },
                  { name: '사내 그룹웨어 리뉴얼', manager: '김수석', status: '디자인', statusColor: 'bg-purple-50 text-purple-600' },
                  { name: 'O2O 커머스 MVP', manager: '박책임', status: 'QA 완료', statusColor: 'bg-green-50 text-green-600' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-pearl transition-colors">
                    <td className="px-6 py-4 font-medium text-ink">{row.name}</td>
                    <td className="px-6 py-4 text-ink-muted-80 flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400"></div>
                      <span>{row.manager}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${row.statusColor}`}>{row.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 text-ink-muted-80">
                        <button className="hover:text-primary"><Eye size={16} /></button>
                        <button className="hover:text-primary"><Edit3 size={16} /></button>
                        <button className="hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
