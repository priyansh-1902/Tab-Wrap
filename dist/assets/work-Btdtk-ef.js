import{c as A,j as e,R as i}from"./client-DUeHcXHK.js";/* empty css                       */import{C as R,T}from"./trophy-CQWQMqHT.js";const E=({hours:m,unit:s,label:d,focusColor:l})=>e.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[e.jsx("div",{className:"text-white mb-4 p-2 rounded-full bg-green-400/20",children:e.jsx(R,{className:"w-8 h-8 text-green-400"})}),e.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:l},children:m}),e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:s}),e.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:d})]}),L=({streakDays:m,timePeriodLabel:s,streakDates:d,progress:l})=>{const x=Math.max(...m,1),f=m.map(r=>x?r/x:0).map(r=>r*(typeof l=="number"?l:1));return e.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:"TOP FOCUS STREAK"}),e.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[f.map((r,b)=>e.jsx("div",{className:"flex-1 rounded-t-lg bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer",style:{height:`${r*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${r>.8?"rgba(168, 85, 247, 0.8)":"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"}},b)),e.jsx(T,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),e.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:s})]})};function C(){const[m,s]=i.useState(""),[d,l]=i.useState(!1),x=i.useRef("");i.useEffect(()=>{async function a(){if(!window.LanguageModel){s("Keep up the grind!");return}if(await window.LanguageModel.availability()==="unavailable"){s("Keep up the grind!");return}const n=await window.LanguageModel.create();chrome.storage.local.get(["tabWrapSummary"],async c=>{const u=c.tabWrapSummary||{};let S=u.categorySummaries?.["Work and Professional"]!==void 0?"Work and Professional":u.categorySummaries?.["Work and Learning"]!==void 0?"Work and Learning":null;const j=S?u.categorySummaries[S]:"";if(j){const M=j+`
Write a quippy statement about this work summary, as if talking to the user, in less than 50 characters.`;try{l(!0);let h="";for await(const W of n.promptStreaming(M))h+=W,x.current=h,s(h);l(!1),n.destroy()}catch{s("Keep up the grind!"),l(!1)}}else s("Keep up the grind!")})}a()},[]);const[t,f]=i.useState({totalMinutes:0,workStreak:[]});i.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],a=>{const o=a.tabWrapSummary||{};let n=o.categoryTotals?.["Work and Professional"]!==void 0?"Work and Professional":o.categoryTotals?.["Work and Learning"]!==void 0?"Work and Learning":null;const c=n?Math.floor((o.categoryTotals[n]||0)/60):0;f({totalMinutes:c,workStreak:Array.isArray(o.workStreak)?o.workStreak:[]})})},[]);const r=Array.isArray(t.workStreak)?t.workStreak.map(a=>a.minutes):[],b=Array.isArray(t.workStreak)?t.workStreak.map(a=>a.date?new Date(a.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],N=Array.isArray(t.workStreak)&&t.workStreak.length?`${new Date(t.workStreak[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(t.workStreak[t.workStreak.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[g,w]=i.useState(0);i.useEffect(()=>{let a,o=1200;function n(c){a||(a=c);const u=Math.min((c-a)/o,1);w(u),u<1?requestAnimationFrame(n):w(1)}return requestAnimationFrame(n),()=>w(0)},[t.totalMinutes,r.length,r.join(",")]);const p=Math.floor(g*t.totalMinutes);let v=Math.floor(p/60),y="HOURS",k=v;return p<1?(y="SECONDS",k=Math.floor(t.totalMinutes*60*g)):p<60&&(y="MINUTES",k=p),e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:"WORK CATEGORY SUMMARY"}),e.jsx(E,{hours:k,unit:y,label:"SPENT ON WORK",focusColor:"#4ade80"}),e.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:e.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:d?e.jsxs("span",{children:[m,e.jsx("span",{className:"animate-pulse",children:"|"})]}):m||"Keep up the grind!"})}),e.jsx(L,{streakDays:r,timePeriodLabel:N,streakDates:b,progress:g})]}),e.jsx("style",{children:`
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
      `})]})}const K=document.getElementById("root");A.createRoot(K).render(e.jsx(C,{}));
