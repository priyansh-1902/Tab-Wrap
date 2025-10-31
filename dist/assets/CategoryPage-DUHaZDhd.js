import{r as i,j as t}from"./client-BCr4-QWM.js";/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),K=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,s,r)=>r?r.toUpperCase():s.toLowerCase()),P=e=>{const a=K(e);return a.charAt(0).toUpperCase()+a.slice(1)},U=(...e)=>e.filter((a,s,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===s).join(" ").trim(),_=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var F={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=i.forwardRef(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:r,className:c="",children:m,iconNode:y,...b},p)=>i.createElement("svg",{ref:p,...F,width:a,height:a,stroke:e,strokeWidth:r?Number(s)*24/Number(a):s,className:U("lucide",c),...!m&&!_(b)&&{"aria-hidden":"true"},...b},[...y.map(([x,h])=>i.createElement(x,h)),...Array.isArray(m)?m:[m]]));/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=(e,a)=>{const s=i.forwardRef(({className:r,...c},m)=>i.createElement(I,{ref:m,iconNode:a,className:U(`lucide-${D(P(e))}`,`lucide-${e}`,r),...c}));return s.displayName=P(e),s};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],q=H("clock",V);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],B=H("trophy",Y);function G({categoryNames:e=[],label:a="",focusColor:s="#4ade80",streakKey:r="",streakTitle:c="TOP FOCUS STREAK",streakBarColor:m="bg-purple-500",streakHoverColor:y="hover:bg-purple-400",streakGlowColor:b="rgba(168, 85, 247, 0.8)",summaryType:p="",quipDefault:x="Keep up the grind!"}){const[h,o]=i.useState(""),[g,w]=i.useState(!1),v=i.useRef("");i.useEffect(()=>{async function l(){if(!window.LanguageModel){o(x);return}if(await window.LanguageModel.availability()==="unavailable"){o(x);return}const d=await window.LanguageModel.create();chrome.storage.local.get(["tabWrapSummary"],async S=>{const f=S.tabWrapSummary||{};let A=null;for(const M of e)if(f.categorySummaries?.[M]!==void 0){A=M;break}const O=A?f.categorySummaries[A]:"";if(O){const M=O+`
Write a quippy statement about this ${p} summary, as if talking to the user, in less than 50 characters.`;try{w(!0);let E="";for await(const W of d.promptStreaming(M))E+=W,v.current=E,o(E);w(!1),d.destroy()}catch{o(x),w(!1)}}else o(x)})}l()},[]);const[n,C]=i.useState({totalSeconds:0,streakArr:[]});i.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],l=>{const u=l.tabWrapSummary||{};let d=null;for(const A of e)if(u.categoryTotals?.[A]!==void 0){d=A;break}const S=d?u.categoryTotals[d]:0;let f=[];r&&Array.isArray(u[r])?f=u[r]:d&&Array.isArray(u.topCategoryStreaks?.[d])&&(f=u.topCategoryStreaks[d]),C({totalSeconds:S,streakArr:f})})},[]);const k=Array.isArray(n.streakArr)?n.streakArr.map(l=>l.seconds!==void 0?l.seconds:l.minutes!==void 0?l.minutes*60:0):[],N=Array.isArray(n.streakArr)?n.streakArr.map(l=>l.date?new Date(l.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],z=Array.isArray(n.streakArr)&&n.streakArr.length?`${new Date(n.streakArr[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(n.streakArr[n.streakArr.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[$,T]=i.useState(0);i.useEffect(()=>{let l,u=1200;function d(S){l||(l=S);const f=Math.min((S-l)/u,1);T(f),f<1?requestAnimationFrame(d):T(1)}return requestAnimationFrame(d),()=>T(0)},[n.totalSeconds,k.length,k.join(",")]);const j=Math.floor($*n.totalSeconds);let L="HOURS",R=Math.floor(j/3600);return j<60?(L="SECONDS",R=j):j<3600&&(L="MINUTES",R=Math.floor(j/60)),{quippySummary:h,isStreaming:g,shownValue:R,unit:L,streakDays:k,streakDates:N,timePeriodLabel:z,progress:$}}function Q({hours:e,unit:a,label:s,focusColor:r,iconColor:c="#4ade80"}){return t.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[t.jsx("div",{className:"text-white mb-4 p-2 rounded-full",style:{backgroundColor:c+"33"},children:t.jsx(q,{className:"w-8 h-8",style:{color:c}})}),t.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:r},children:e}),t.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:a}),t.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:s})]})}function Z({streakDays:e,timePeriodLabel:a,streakDates:s,progress:r,barColor:c="bg-purple-500",hoverColor:m="hover:bg-purple-400",glowColor:y="rgba(168, 85, 247, 0.8)",title:b="TOP FOCUS STREAK"}){const p=Math.max(...e,1),h=e.map(o=>p?o/p:0).map(o=>o*(typeof r=="number"?r:1));return t.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[t.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:b}),t.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[h.map((o,g)=>t.jsx("div",{className:`flex-1 rounded-t-lg ${c} ${m} transition-all duration-300 cursor-pointer`,style:{height:`${o*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${o>.8?y:"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"}},g)),t.jsx(B,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),t.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:a})]})}function X({categoryNames:e=[],label:a="",focusColor:s="#4ade80",streakTitle:r="TOP CATEGORY STREAK",streakBarColor:c="bg-purple-500",streakHoverColor:m="hover:bg-purple-400",streakGlowColor:y="rgba(168, 85, 247, 0.8)",summaryType:b="",quipDefault:p="Keep going!",pageTitle:x="CATEGORY SUMMARY",bgColors:h=["#a78bfa","#fbbf24","#38bdf8"]}){const{quippySummary:o,isStreaming:g,shownValue:w,unit:v,streakDays:n,streakDates:C,timePeriodLabel:k,progress:N}=G({categoryNames:e,label:a,focusColor:s,streakKey:"",streakTitle:r,streakBarColor:c,streakHoverColor:m,streakGlowColor:y,summaryType:b,quipDefault:p});return console.log("Rendering CategoryPage for",e),console.log({quippySummary:o,isStreaming:g,shownValue:w,unit:v,streakDays:n,streakDates:C,timePeriodLabel:k,progress:N}),t.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[t.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[t.jsx("div",{style:{backgroundColor:h[0]},className:"absolute top-10 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),t.jsx("div",{style:{backgroundColor:h[1]},className:"absolute top-1/2 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),t.jsx("div",{style:{backgroundColor:h[2]},className:"absolute bottom-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),t.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[t.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:x}),t.jsx(Q,{hours:w,unit:v,label:a,focusColor:s}),t.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:t.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:g?t.jsxs("span",{children:[o,t.jsx("span",{className:"animate-pulse",children:"|"})]}):o||p})}),t.jsx(Z,{streakDays:n,timePeriodLabel:k,streakDates:C,progress:N,barColor:c,hoverColor:m,glowColor:y,title:r})]}),t.jsx("style",{children:`
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
      `})]})}export{X as C};
