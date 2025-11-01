import{c as r,j as e}from"./client-BF1lwM7Z.js";import{C as i,T as o}from"./trophy-CySomSps.js";import"./createLucideIcon-V_rfBV7_.js";const n={title:"MONTHLY FOCUS WRAP",hoursDisplay:{hours:187,unit:"HOURS",label:"SPENT ON DEEP WORK",focusColor:"#4ade80"},streak:{streakDays:[.6,1,.4,.9,.7,.5,.2],timePeriodLabel:"NOV 15 - NOV 21"}},x=({hours:t,unit:l,label:a,focusColor:s})=>e.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[e.jsx("div",{className:"text-white mb-4 p-2 rounded-full bg-green-400/20",children:e.jsx(i,{className:"w-8 h-8 text-green-400"})}),e.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:s},children:t}),e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:l}),e.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:a})]}),m=({streakDays:t,timePeriodLabel:l})=>e.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:"TOP FOCUS STREAK"}),e.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[t.map((a,s)=>e.jsx("div",{className:"flex-1 rounded-t-lg bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer",style:{height:`${a*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${a>.8?"rgba(168, 85, 247, 0.8)":"transparent"}`}},s)),e.jsx(o,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),e.jsx("p",{className:"text-sm text-gray-400 mt-4",children:l})]});function c(){const{hoursDisplay:t,streak:l,title:a}=n;return e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:a}),e.jsx(x,{hours:t.hours,unit:t.unit,label:t.label,focusColor:t.focusColor}),e.jsx(m,{streakDays:l.streakDays,timePeriodLabel:l.timePeriodLabel})]}),e.jsx("style",{children:`
        /* Define custom keyframes for the "cosmic blob" animation */
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

        /* Standard CSS for pulse effect */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `})]})}const d=document.getElementById("root");r.createRoot(d).render(e.jsx(c,{}));
