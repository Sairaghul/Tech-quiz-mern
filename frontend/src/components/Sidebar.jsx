import React, { useState } from "react";
import {
  BookOpen, Globe, Layout, Code, Cpu, Database, 
  Coffee, Terminal, Code2, Star, Zap, Target, 
  CheckCircle, BarChart, ChevronRight, ChevronDown, RefreshCw
} from "lucide-react";

/* =============================
   1. QUESTION DATABASE
============================= */
const questionBank = {
  html: {
    basic: [
      { q: "What does HTML stand for?", a: "HyperText Markup Language", o: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tech Making Language"] },
      { q: "Which tag is used for the largest heading?", a: "<h1>", o: ["<h6>", "<h1>", "<head>", "<header>"] },
      { q: "Which element creates a line break?", a: "<br>", o: ["<lb>", "<break>", "<br>", "<hr>"] },
      { q: "How do you create a hyperlink?", a: "<a>", o: ["<link>", "<a>", "<href>", "<url>"] },
      { q: "Which character is used to indicate an end tag?", a: "/", o: ["*", "<", "/", "^"] }
    ],
    intermediate: [
      { q: "Which HTML5 element is used to specify a footer?", a: "<footer>", o: ["<bottom>", "<section>", "<footer>", "<aside>"] },
      { q: "Which input type defines a slider control?", a: "range", o: ["slider", "controls", "range", "number"] },
      { q: "What is the purpose of the <canvas> element?", a: "To draw graphics via scripting", o: ["To display database records", "To draw graphics via scripting", "To style text", "To create draggable items"] },
      { q: "Which attribute is used to specify an inline style?", a: "style", o: ["font", "class", "styles", "style"] },
      { q: "Which element displays a scalar measurement?", a: "<meter>", o: ["<range>", "<measure>", "<meter>", "<gauge>"] }
    ],
    advanced: [
      { q: "What does the 'defer' attribute do?", a: "Executes script after parsing", o: ["Executes script after parsing", "Stop HTML parsing", "Executes script immediately", "Loads script twice"] },
      { q: "Which API is used for offline web apps?", a: "Service Workers", o: ["Web Sockets", "Local Storage", "Service Workers", "IndexedDB"] },
      { q: "What is the Shadow DOM used for?", a: "Encapsulation of CSS and HTML", o: ["Hidden database queries", "Encapsulation of CSS and HTML", "Faster image loading", "SEO optimization"] },
      { q: "Which element groups footer content in a table?", a: "<tfoot>", o: ["<tbottom>", "<tfoot>", "<tbody>", "<thead>"] },
      { q: "Which attribute allows a script to run asynchronously?", a: "async", o: ["defer", "async", "wait", "remote"] }
    ]
  },
  // (Other technologies handled by generator fallback)
};

/* =============================
   2. OFFLINE DATA ENGINE
============================= */
const generateQuestions = (tech, level) => {
  const source = questionBank[tech] ? questionBank[tech][level] : null;
  if (source) {
    return source.map((item) => ({
      question: item.q,
      options: [...item.o].sort(() => Math.random() - 0.5),
      answer: item.a
    }));
  }
  return Array.from({ length: 5 }).map((_, i) => ({
    question: `${tech?.toUpperCase()} ${level} Q${i + 1}: Sample Question?`,
    options: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"].sort(() => Math.random() - 0.5),
    answer: "Correct"
  }));
};

/* =============================
   3. MAIN COMPONENT
============================= */
const Sidebar = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameState, setGameState] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  // TECH BUTTON STYLES
  const techStyles = {
    html: {
      active: "bg-orange-600 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]",
      inactive: "bg-orange-900/10 border-orange-500/20 text-orange-500 hover:bg-orange-900/20 hover:border-orange-500/40",
      icon: "text-inherit"
    },
    css: {
      active: "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]",
      inactive: "bg-blue-900/10 border-blue-500/20 text-blue-500 hover:bg-blue-900/20 hover:border-blue-500/40",
      icon: "text-inherit"
    },
    js: {
      active: "bg-yellow-500 border-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]",
      inactive: "bg-yellow-900/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-900/20 hover:border-yellow-500/40",
      icon: "text-inherit"
    },
    react: {
      active: "bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]",
      inactive: "bg-cyan-900/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-900/20 hover:border-cyan-500/40",
      icon: "text-inherit"
    },
    node: {
      active: "bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]",
      inactive: "bg-green-900/10 border-green-500/20 text-green-500 hover:bg-green-900/20 hover:border-green-500/40",
      icon: "text-inherit"
    },
    mongodb: {
      active: "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]",
      inactive: "bg-emerald-900/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-900/20 hover:border-emerald-500/40",
      icon: "text-inherit"
    },
    java: {
      active: "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]",
      inactive: "bg-red-900/10 border-red-500/20 text-red-500 hover:bg-red-900/20 hover:border-red-500/40",
      icon: "text-inherit"
    },
    python: {
      active: "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]",
      inactive: "bg-indigo-900/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-900/20 hover:border-indigo-500/40",
      icon: "text-inherit"
    },
    cpp: {
      active: "bg-sky-600 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]",
      inactive: "bg-sky-900/10 border-sky-500/20 text-sky-500 hover:bg-sky-900/20 hover:border-sky-500/40",
      icon: "text-inherit"
    }
  };

  const technologies = [
    { id: "html", name: "HTML", icon: <Globe size={20} /> },
    { id: "css", name: "CSS", icon: <Layout size={20} /> },
    { id: "js", name: "JavaScript", icon: <Code size={20} /> },
    { id: "react", name: "React", icon: <Cpu size={20} /> },
    { id: "node", name: "Node.js", icon: <Terminal size={20} /> },
    { id: "mongodb", name: "MongoDB", icon: <Database size={20} /> },
    { id: "java", name: "Java", icon: <Coffee size={20} /> },
    { id: "python", name: "Python", icon: <Code2 size={20} /> },
    { id: "cpp", name: "C++", icon: <Cpu size={20} /> }
  ];

  const startQuiz = (tech, level) => {
    setSelectedTech(tech);
    setSelectedLevel(level);
    setGameState("loading");
    setTimeout(() => {
      setQuestions(generateQuestions(tech, level));
      setCurrentQuestion(0);
      setScore(0);
      setGameState("quiz");
      setIsAnswered(false);
      setUserAnswer(null);
    }, 1000);
  };

  const handleSelectAnswer = (opt) => {
    if (isAnswered) return;
    setUserAnswer(opt);
    setIsAnswered(true);
    if (opt === questions[currentQuestion].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setUserAnswer(null);
    setIsAnswered(false);
    if (currentQuestion < questions.length - 1) setCurrentQuestion(q => q + 1);
    else setGameState("result");
  };

  const percentage = Math.round((score / (questions.length || 1)) * 100);

  return (
    // ✅ CHANGED: "min-h-screen" forces full height, removing the white bar
    <div className="flex min-h-screen bg-black text-gray-200 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-[300px] bg-black border-r border-[#222] overflow-y-auto hidden md:flex flex-col z-20">
        <div className="p-8 border-b border-[#222] flex items-center gap-4">
          <div className="p-2.5 bg-yellow-500 text-black rounded-xl shadow-lg shadow-yellow-500/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white tracking-wide">Tech Quiz</h2>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Mastery</p>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {technologies.map(t => {
            const isActive = selectedTech === t.id;
            const currentStyle = isActive ? techStyles[t.id].active : techStyles[t.id].inactive;

            return (
              <div key={t.id}>
                <button
                  onClick={() => setSelectedTech(isActive ? null : t.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border-2 ${currentStyle} ${isActive ? 'scale-[1.02]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div>{t.icon}</div>
                    <span className="font-bold text-sm tracking-wide">{t.name}</span>
                  </div>
                  {isActive ? <ChevronDown size={16} /> : <ChevronRight size={16} className="opacity-50"/>}
                </button>

                {isActive && (
                  <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-800 pl-4 py-2 animate-in slide-in-from-top-2">
                    {["basic", "intermediate", "advanced"].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => startQuiz(t.id, lvl)}
                        className="w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-400 bg-[#111] hover:bg-gray-800 hover:text-white transition-all border border-[#222]"
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex items-center justify-center p-8 relative overflow-hidden bg-black">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

        {gameState === "welcome" && (
          <div className="relative max-w-4xl w-full bg-[#0a0a0a] p-16 rounded-[2rem] border border-[#1a1a1a] text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-[#111] rounded-full text-yellow-500 border border-[#222] shadow-[0_0_30px_rgba(234,179,8,0.15)] ring-4 ring-[#111]">
                <CheckCircle size={56} />
              </div>
            </div>
            <h1 className="text-5xl font-black mb-6 text-white tracking-tight">Welcome to Tech Quiz</h1>
            <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Select a technology from the sidebar to start your challenge.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ icon: <Star />, title: "Structured Content" }, { icon: <Zap />, title: "3 Difficulty Levels" }, { icon: <Target />, title: "Instant Feedback" }].map((item, i) => (
                <div key={i} className="p-6 bg-[#111] rounded-2xl border border-[#222] hover:border-yellow-600/30 hover:bg-[#151515] transition-all group cursor-default">
                  <div className="mx-auto mb-4 w-fit text-gray-600 group-hover:text-yellow-500 transition-colors">{item.icon}</div>
                  <h3 className="font-bold text-gray-300 text-xs uppercase tracking-widest">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {gameState === "loading" && (
          <div className="text-center relative z-10">
             <RefreshCw size={60} className="animate-spin text-yellow-500 mx-auto mb-6" />
             <h2 className="text-xl font-bold text-gray-400 uppercase tracking-[0.3em]">Preparing Quiz...</h2>
          </div>
        )}

        {gameState === "quiz" && questions[currentQuestion] && (
          <div className="relative w-full max-w-3xl bg-[#0a0a0a] p-12 rounded-[2rem] border border-[#222] shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#222]">
              <h2 className={`font-black uppercase tracking-wider text-xl flex items-center gap-2 ${techStyles[selectedTech].inactive.split(' ')[2]}`}>
                <span className="text-gray-600">/</span> {selectedTech} <span className="text-gray-600">/</span> {selectedLevel}
              </h2>
              <span className="font-bold text-gray-400 bg-[#151515] border border-[#333] px-4 py-1.5 rounded-full text-xs">
                Q {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-10 text-gray-200 leading-snug">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((opt, i) => {
                let btnStyle = "border-[#222] bg-[#111] text-gray-400 hover:border-yellow-600/50 hover:text-white";
                if (isAnswered) {
                  if (opt === questions[currentQuestion].answer) btnStyle = "border-green-500/50 bg-green-900/10 text-green-400";
                  else if (opt === userAnswer) btnStyle = "border-red-500/50 bg-red-900/10 text-red-400";
                  else btnStyle = "opacity-30 border-[#222]";
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 font-bold text-lg flex justify-between items-center ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === questions[currentQuestion].answer && <CheckCircle className="text-green-500" size={24} />}
                  </button>
                );
              })}
            </div>

            <div className="h-20 mt-8 flex items-end justify-end">
              {isAnswered && (
                <button
                  onClick={nextQuestion}
                  className="px-8 py-4 bg-yellow-500 text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-in fade-in"
                >
                  {currentQuestion === questions.length - 1 ? "View Results" : "Next Question"}
                </button>
              )}
            </div>
          </div>
        )}

        {gameState === "result" && (
          <div className="relative max-w-xl w-full bg-[#0a0a0a] p-16 rounded-[2rem] border border-[#222] text-center shadow-2xl animate-in zoom-in">
            <div className="flex justify-center mb-8">
              <div className={`p-8 rounded-full border ${percentage > 50 ? 'bg-green-900/10 border-green-500/30 text-green-500' : 'bg-red-900/10 border-red-500/30 text-red-500'}`}>
                <BarChart size={64} />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Quiz Completed</h1>
            <p className="text-6xl font-black text-yellow-500 mb-10 tracking-tighter">{percentage}%</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="p-6 bg-[#111] rounded-2xl border border-[#222]">
                  <div className="text-4xl font-black text-green-500">{score}</div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Correct</p>
               </div>
               <div className="p-6 bg-[#111] rounded-2xl border border-[#222]">
                  <div className="text-4xl font-black text-red-500">{questions.length - score}</div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">Wrong</p>
               </div>
            </div>
            <button 
              onClick={() => setGameState("welcome")} 
              className="w-full py-5 bg-[#1a1a1a] text-gray-300 rounded-xl font-bold text-sm uppercase tracking-widest border border-[#333] hover:border-yellow-600 hover:text-yellow-500 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sidebar;