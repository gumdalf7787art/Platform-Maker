const fs = require('fs');
const path = require('path');

// 1. App.jsx
const appPath = 'h:/platform/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(
  'import { motion, useScroll, useMotionValueEvent, AnimatePresence } from \'framer-motion\';',
  'import { motion, useScroll, useMotionValueEvent, AnimatePresence } from \'framer-motion\';\nimport { Routes, Route, useNavigate, Link } from \'react-router-dom\';'
);
appContent = appContent.replace('function Navbar({ onNavigate, isLoggedIn }) {', 'function Navbar({ isLoggedIn }) {\n  const navigate = useNavigate();');
appContent = appContent.replace(/onNavigate\('mypage'\)/g, "navigate('/mypage')");
appContent = appContent.replace(/onNavigate\('login'\)/g, "navigate('/login')");
appContent = appContent.replace(/onNavigate\('signup'\)/g, "navigate('/signup')");

appContent = appContent.replace('function Hero({ onNavigate }) {', 'function Hero() {\n  const navigate = useNavigate();');
appContent = appContent.replace(/onNavigate\('estimate'\)/g, "navigate('/estimate')");

appContent = appContent.replace('function Pricing({ onNavigate }) {', 'function Pricing() {\n  const navigate = useNavigate();');

const appCompRegex = /function App\(\) \{[\s\S]*?export default App;/;
const newAppComp = `function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="w-full min-h-screen bg-surface-canvas">
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;`;
appContent = appContent.replace(appCompRegex, newAppComp);
fs.writeFileSync(appPath, appContent, 'utf8');

// 2. SignUp.jsx, Login.jsx, Estimate.jsx, MyPage.jsx
const components = ['SignUp.jsx', 'Login.jsx', 'Estimate.jsx', 'MyPage.jsx'];
for (const comp of components) {
  const p = path.join('h:/platform/src/components', comp);
  let content = fs.readFileSync(p, 'utf8');
  
  // add import
  content = content.replace(/(import .*;\n)+/, (match) => match + 'import { useNavigate } from \'react-router-dom\';\n');
  
  // replace signature
  content = content.replace(/export default function \w+\(\{\s*onNavigate\s*\}\)\s*\{/, (match) => {
    return match.replace(/\{\s*onNavigate\s*\}/, '').replace('()', '') + '\n  const navigate = useNavigate();';
  });
  content = content.replace(/export default function (\w+)\(\)\s*\{/, 'export default function $1() {'); // clean up if empty
  
  content = content.replace(/onNavigate\('home'\)/g, "navigate('/')");
  content = content.replace(/onNavigate\('login'\)/g, "navigate('/login')");
  content = content.replace(/onNavigate\('signup'\)/g, "navigate('/signup')");
  
  fs.writeFileSync(p, content, 'utf8');
}
console.log('done');
