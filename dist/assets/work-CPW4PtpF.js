import{r as y,c as R,j as t,R as d}from"./client-DUeHcXHK.js";/* empty css                       *//**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),P=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,s)=>s?s.toUpperCase():o.toLowerCase()),M=a=>{const e=P(a);return e.charAt(0).toUpperCase()+e.slice(1)},A=(...a)=>a.filter((e,o,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===o).join(" ").trim(),K=a=>{for(const e in a)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=y.forwardRef(({color:a="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:s,className:c="",children:r,iconNode:x,...n},h)=>y.createElement("svg",{ref:h,...O,width:e,height:e,stroke:a,strokeWidth:s?Number(o)*24/Number(e):o,className:A("lucide",c),...!r&&!K(n)&&{"aria-hidden":"true"},...n},[...x.map(([w,f])=>y.createElement(w,f)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=(a,e)=>{const o=y.forwardRef(({className:s,...c},r)=>y.createElement(U,{ref:r,iconNode:e,className:A(`lucide-${T(M(a))}`,`lucide-${a}`,s),...c}));return o.displayName=M(a),o};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],H=C("clock",$);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],D=C("trophy",z),q=({hours:a,unit:e,label:o,focusColor:s})=>t.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[t.jsx("div",{className:"text-white mb-4 p-2 rounded-full bg-green-400/20",children:t.jsx(H,{className:"w-8 h-8 text-green-400"})}),t.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:s},children:a}),t.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:e}),t.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:o})]}),I=({streakDays:a,timePeriodLabel:e,streakDates:o,progress:s})=>{const c=Math.max(...a,1),x=a.map(n=>c?n/c:0).map(n=>n*(typeof s=="number"?s:1));return t.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[t.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:"TOP FOCUS STREAK"}),t.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[x.map((n,h)=>t.jsx("div",{className:"flex-1 rounded-t-lg bg-purple-500 hover:bg-purple-400 transition-all duration-300 cursor-pointer",style:{height:`${n*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${n>.8?"rgba(168, 85, 247, 0.8)":"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"}},h)),t.jsx(D,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),t.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:e})]})};function _(){const[a,e]=d.useState(""),[o,s]=d.useState(!1),c=d.useRef("");d.useEffect(()=>{async function l(){if(!window.LanguageModel){e("Keep up the grind!");return}if(await window.LanguageModel.availability()==="unavailable"){e("Keep up the grind!");return}const m=await window.LanguageModel.create();chrome.storage.local.get(["tabWrapSummary"],async u=>{const p=u.tabWrapSummary||{};let v=p.categorySummaries?.["Work and Professional"]!==void 0?"Work and Professional":p.categorySummaries?.["Work and Learning"]!==void 0?"Work and Learning":null;const N=v?p.categorySummaries[v]:"";if(N){const L=N+`
Write a quippy statement about this work summary, as if talking to the user, in less than 50 characters.`;try{s(!0);let g="";for await(const E of m.promptStreaming(L))g+=E,c.current=g,e(g);s(!1),m.destroy()}catch{e("Keep up the grind!"),s(!1)}}else e("Keep up the grind!")})}l()},[]);const[r,x]=d.useState({totalMinutes:0,workStreak:[]});d.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],l=>{const i=l.tabWrapSummary||{};let m=i.categoryTotals?.["Work and Professional"]!==void 0?"Work and Professional":i.categoryTotals?.["Work and Learning"]!==void 0?"Work and Learning":null;const u=m?Math.floor((i.categoryTotals[m]||0)/60):0;x({totalMinutes:u,workStreak:Array.isArray(i.workStreak)?i.workStreak:[]})})},[]);const n=Array.isArray(r.workStreak)?r.workStreak.map(l=>l.minutes):[],h=Array.isArray(r.workStreak)?r.workStreak.map(l=>l.date?new Date(l.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],w=Array.isArray(r.workStreak)&&r.workStreak.length?`${new Date(r.workStreak[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(r.workStreak[r.workStreak.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[f,k]=d.useState(0);d.useEffect(()=>{let l,i=1200;function m(u){l||(l=u);const p=Math.min((u-l)/i,1);k(p),p<1?requestAnimationFrame(m):k(1)}return requestAnimationFrame(m),()=>k(0)},[r.totalMinutes,n.length,n.join(",")]);const b=Math.floor(f*r.totalMinutes);let W=Math.floor(b/60),S="HOURS",j=W;return b<1?(S="SECONDS",j=Math.floor(r.totalMinutes*60*f)):b<60&&(S="MINUTES",j=b),t.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[t.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[t.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),t.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),t.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),t.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[t.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:"WORK CATEGORY SUMMARY"}),t.jsx(q,{hours:j,unit:S,label:"SPENT ON WORK",focusColor:"#4ade80"}),t.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:t.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:o?t.jsxs("span",{children:[a,t.jsx("span",{className:"animate-pulse",children:"|"})]}):a||"Keep up the grind!"})}),t.jsx(I,{streakDays:n,timePeriodLabel:w,streakDates:h,progress:f})]}),t.jsx("style",{children:`
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
      `})]})}const B=document.getElementById("root");R.createRoot(B).render(t.jsx(_,{}));
