import{r as p,c as S,j as t,R as h}from"./client-DUeHcXHK.js";/* empty css                       *//**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),N=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,s,r)=>r?r.toUpperCase():s.toLowerCase()),w=e=>{const a=N(e);return a.charAt(0).toUpperCase()+a.slice(1)},g=(...e)=>e.filter((a,s,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===s).join(" ").trim(),A=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=p.forwardRef(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:u="",children:o,iconNode:n,...c},m)=>p.createElement("svg",{ref:m,...v,width:a,height:a,stroke:e,strokeWidth:r?Number(s)*24/Number(a):s,className:g("lucide",u),...!o&&!A(c)&&{"aria-hidden":"true"},...c},[...n.map(([d,l])=>p.createElement(d,l)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,a)=>{const s=p.forwardRef(({className:r,...u},o)=>p.createElement(M,{ref:o,iconNode:a,className:g(`lucide-${j(w(e))}`,`lucide-${e}`,r),...u}));return s.displayName=w(e),s};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],E=k("clock",C);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],T=k("trophy",R),W=({hours:e,unit:a,label:s,focusColor:r})=>t.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[t.jsx("div",{className:"text-white mb-4 p-2 rounded-full bg-green-400/20",children:t.jsx(E,{className:"w-8 h-8 text-green-400"})}),t.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:r},children:e}),t.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:a}),t.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:s})]}),L=({streakDays:e,timePeriodLabel:a})=>{console.log("Original streak data:",e);const s=Math.max(...e,1),r=e.map(n=>s?n/s:0);console.log("Normalized histogram data:",r);const[u,o]=h.useState(Array(r.length).fill(0));return h.useEffect(()=>{let n,c=1200;function m(d){n||(n=d);const l=Math.min((d-n)/c,1);o(r.map(i=>i*l)),l<1?requestAnimationFrame(m):o(r)}return requestAnimationFrame(m),()=>o(Array(r.length).fill(0))},[e.length,e.join(",")]),t.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[t.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:"TOP FOCUS STREAK"}),t.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[u.map((n,c)=>t.jsx("div",{className:"flex-1 rounded-t-lg bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer",style:{height:`${n*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${n>.8?"rgba(168, 85, 247, 0.8)":"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"},children:t.jsx("span",{className:"block text-xs text-gray-300 mt-2 text-center font-semibold",children:typeof streakDates<"u"&&streakDates[c]})},c)),t.jsx(T,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),t.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:a})]})};function O(){const[e,a]=h.useState({totalMinutes:0,workStreak:[]});h.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],l=>{const i=l.tabWrapSummary||{};let x=i.categoryTotals?.["Work and Professional"]!==void 0?"Work and Professional":i.categoryTotals?.["Work and Learning"]!==void 0?"Work and Learning":null;const f=x?Math.floor((i.categoryTotals[x]||0)/60):0;a({totalMinutes:f,workStreak:Array.isArray(i.workStreak)?i.workStreak:[]})})},[]);const s=Array.isArray(e.workStreak)?e.workStreak.map(l=>l.minutes):[],r=Array.isArray(e.workStreak)?e.workStreak.map(l=>l.date?new Date(l.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],u=Array.isArray(e.workStreak)&&e.workStreak.length?`${new Date(e.workStreak[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(e.workStreak[e.workStreak.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[o,n]=h.useState(0);h.useEffect(()=>{let l=e.totalMinutes,i=1200,x;function f(b){x||(x=b);const y=Math.min((b-x)/i,1);n(Math.floor(y*l)),y<1?requestAnimationFrame(f):n(l)}requestAnimationFrame(f)},[e.totalMinutes]);let c=Math.floor(o/60),m="HOURS",d=c;return o<1?(m="SECONDS",d=Math.floor(e.totalMinutes*60)):o<60&&(m="MINUTES",d=o),t.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[t.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[t.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),t.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),t.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),t.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[t.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:"WORK CATEGORY SUMMARY"}),t.jsx(W,{hours:d,unit:m,label:"SPENT ON WORK",focusColor:"#4ade80"}),t.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:t.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:"This section can be used to display a summary, motivational message, or any additional info about your work streak. You can customize this text as needed."})}),t.jsx(L,{streakDays:s,timePeriodLabel:u,streakDates:r})]}),t.jsx("style",{children:`
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
      `})]})}const H=document.getElementById("root");S.createRoot(H).render(t.jsx(O,{}));
