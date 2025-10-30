import{c as m,j as e}from"./client-DUeHcXHK.js";/* empty css                       */import{u as b,T as d,S as u}from"./common-C-nUQQuO.js";import"./trophy-CQWQMqHT.js";function c(){const{quippySummary:a,isStreaming:t,shownValue:l,unit:r,streakDays:s,streakDates:o,timePeriodLabel:i,progress:n}=b({categoryNames:["Travel","Travel / Tourism","Vacation"],label:"SPENT ON TRAVEL",focusColor:"#60a5fa",streakKey:"",streakTitle:"TOP TRAVEL STREAK",streakBarColor:"bg-blue-300",streakHoverColor:"hover:bg-blue-200",streakGlowColor:"rgba(96, 165, 250, 0.8)",summaryType:"travel",quipDefault:"Adventure awaits!"});return e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:"TRAVEL CATEGORY SUMMARY"}),e.jsx(d,{hours:l,unit:r,label:"SPENT ON TRAVEL",focusColor:"#60a5fa"}),e.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:e.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:t?e.jsxs("span",{children:[a,e.jsx("span",{className:"animate-pulse",children:"|"})]}):a||"Adventure awaits!"})}),e.jsx(u,{streakDays:s,timePeriodLabel:i,streakDates:o,progress:n,barColor:"bg-blue-300",hoverColor:"hover:bg-blue-200",glowColor:"rgba(96, 165, 250, 0.8)",title:"TOP TRAVEL STREAK"})]}),e.jsx("style",{children:`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `})]})}const x=document.getElementById("root");m.createRoot(x).render(e.jsx(c,{}));
