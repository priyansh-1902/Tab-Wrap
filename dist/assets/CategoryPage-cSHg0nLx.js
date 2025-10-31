import{r as m,j as e}from"./client-BCr4-QWM.js";/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),B=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,i,r)=>r?r.toUpperCase():i.toLowerCase()),U=t=>{const a=B(t);return a.charAt(0).toUpperCase()+a.slice(1)},O=(...t)=>t.filter((a,i,r)=>!!a&&a.trim()!==""&&r.indexOf(a)===i).join(" ").trim(),D=t=>{for(const a in t)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var K={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=m.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:x="",children:h,iconNode:k,...S},f)=>m.createElement("svg",{ref:f,...K,width:a,height:a,stroke:t,strokeWidth:r?Number(i)*24/Number(a):i,className:O("lucide",x),...!h&&!D(S)&&{"aria-hidden":"true"},...S},[...k.map(([b,g])=>m.createElement(b,g)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=(t,a)=>{const i=m.forwardRef(({className:r,...x},h)=>m.createElement(_,{ref:h,iconNode:a,className:O(`lucide-${z(U(t))}`,`lucide-${t}`,r),...x}));return i.displayName=U(t),i};/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],V=H("clock",F);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],G=H("trophy",q);function Y({categoryNames:t=[],label:a="",focusColor:i="#4ade80",streakKey:r="",streakTitle:x="TOP FOCUS STREAK",streakBarColor:h="bg-purple-500",streakHoverColor:k="hover:bg-purple-400",streakGlowColor:S="rgba(168, 85, 247, 0.8)",summaryType:f="",quipDefault:b="Keep up the grind!"}){const[g,s]=m.useState(""),[L,E]=m.useState(!1),y=m.useRef("");m.useEffect(()=>{async function l(){if(!window.LanguageModel){s(b);return}if(await window.LanguageModel.availability()==="unavailable"){s(b);return}const o=await window.LanguageModel.create();chrome.storage.local.get(["tabWrapSummary"],async n=>{const c=n.tabWrapSummary||{};let p=null;for(const W of t)if(c.categorySummaries?.[W]!==void 0){p=W;break}const M=p?c.categorySummaries[p]:"";if(M){const W=M+`
Write a quippy statement about this ${f} summary, as if talking to the user, in less than 50 characters.`;try{E(!0);let $="";for await(const I of o.promptStreaming(W))$+=I,y.current=$,s($);E(!1),o.destroy()}catch{s(b),E(!1)}}else s(b)})}l()},[]);const[d,C]=m.useState({totalSeconds:0,streakArr:[]});m.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],l=>{const u=l.tabWrapSummary||{};let o=null;for(const p of t)if(u.categoryTotals?.[p]!==void 0){o=p;break}const n=o?u.categoryTotals[o]:0;let c=[];r&&Array.isArray(u[r])?c=u[r]:o&&Array.isArray(u.topCategoryStreaks?.[o])&&(c=u.topCategoryStreaks[o]),C({totalSeconds:n,streakArr:c})})},[]);const v=Array.isArray(d.streakArr)?d.streakArr.map(l=>l.seconds!==void 0?l.seconds:l.minutes!==void 0?l.minutes*60:0):[],R=Array.isArray(d.streakArr)?d.streakArr.map(l=>l.date?new Date(l.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],P=Array.isArray(d.streakArr)&&d.streakArr.length?`${new Date(d.streakArr[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(d.streakArr[d.streakArr.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[T,j]=m.useState(0);m.useEffect(()=>{let l,u=1200;function o(n){l||(l=n);const c=Math.min((n-l)/u,1);j(c),c<1?requestAnimationFrame(o):j(1)}return requestAnimationFrame(o),()=>j(0)},[d.totalSeconds,v.length,v.join(",")]);const w=Math.floor(T*d.totalSeconds);let A="HOURS",N=Math.floor(w/3600);return w<60?(A="SECONDS",N=w):w<3600&&(A="MINUTES",N=Math.floor(w/60)),{quippySummary:g,isStreaming:L,shownValue:N,unit:A,streakDays:v,streakDates:R,timePeriodLabel:P,progress:T}}function Q({hours:t,unit:a,label:i,focusColor:r,iconColor:x="#4ade80"}){return e.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[e.jsx("div",{className:"text-white mb-4 p-2 rounded-full",style:{backgroundColor:x+"33"},children:e.jsx(V,{className:"w-8 h-8",style:{color:x}})}),e.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:r},children:t}),e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:a}),e.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:i})]})}function Z({streakDays:t,timePeriodLabel:a,streakDates:i,progress:r,barColor:x="bg-purple-500",hoverColor:h="hover:bg-purple-400",glowColor:k="rgba(168, 85, 247, 0.8)",title:S="TOP FOCUS STREAK"}){const f=Math.max(...t,1),g=t.map(s=>f?s/f:0).map(s=>s*(typeof r=="number"?r:1));return e.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:S}),e.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[g.map((s,L)=>e.jsx("div",{className:`flex-1 rounded-t-lg ${x} ${h} transition-all duration-300 cursor-pointer`,style:{height:`${s*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${s>.8?k:"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"}},L)),e.jsx(G,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),e.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:a})]})}function X({categoryNames:t=[],label:a="",focusColor:i="#4ade80",streakTitle:r="TOP CATEGORY STREAK",streakBarColor:x="bg-purple-500",streakHoverColor:h="hover:bg-purple-400",streakGlowColor:k="rgba(168, 85, 247, 0.8)",summaryType:S="",quipDefault:f="Keep going!",pageTitle:b="CATEGORY SUMMARY",bgColors:g=["#a78bfa","#fbbf24","#38bdf8"]}){const[s,L]=m.useState([]);m.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],o=>{const n=o.tabWrapSummary||{},c=Array.isArray(n.categoryPercents)?n.categoryPercents.slice(0,5):[];L(c.map(p=>p.cat))})},[t]);let E=t&&t.length?t[0]:a;const y=s.findIndex(o=>o===E),d=y>=0?(y+1)%s.length:0,C=s[d]||"";let v="";C.includes("/")?v=C.split("/")[0].replace(/\s+/g,"").toLowerCase():v=C.split(" ")[0].toLowerCase();const R=`${v}.html`,{quippySummary:P,isStreaming:T,shownValue:j,unit:w,streakDays:A,streakDates:N,timePeriodLabel:l,progress:u}=Y({categoryNames:t,label:a,focusColor:i,streakKey:"",streakTitle:r,streakBarColor:x,streakHoverColor:h,streakGlowColor:k,summaryType:S,quipDefault:f});return console.log("Rendering CategoryPage for",t),console.log({quippySummary:P,isStreaming:T,shownValue:j,unit:w,streakDays:A,streakDates:N,timePeriodLabel:l,progress:u}),e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{style:{backgroundColor:g[0]},className:"absolute top-10 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{style:{backgroundColor:g[1]},className:"absolute top-1/2 right-0 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),e.jsx("div",{style:{backgroundColor:g[2]},className:"absolute bottom-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:b}),e.jsx(Q,{hours:j,unit:w,label:a,focusColor:i}),e.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:e.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:T?e.jsxs("span",{children:[P,e.jsx("span",{className:"animate-pulse",children:"|"})]}):P||f})}),e.jsx(Z,{streakDays:A,timePeriodLabel:l,streakDates:N,progress:u,barColor:x,hoverColor:h,glowColor:k,title:r}),s.length>0&&(()=>{const o=y-1;let n=o>=0?s[o]:null,c="",p="";y===0?p="tabwrapstats.html":n&&(n.includes("/")?c=n.split("/")[0].replace(/\s+/g,"").toLowerCase():c=n.split(" ")[0].toLowerCase(),p=`${c}.html`);const M="w-56 h-12 mx-2 rounded-xl font-semibold text-white text-base bg-[#23243a] shadow-md hover:bg-[#2d2e4a] transition-all flex items-center justify-center tracking-wide";return y===0||y===s.length-1?e.jsx("div",{className:"flex justify-center mt-8",children:e.jsx("button",{className:M,style:{minWidth:"14rem",maxWidth:"14rem",height:"3rem",boxShadow:"0 2px 12px rgba(56,189,248,0.10)",border:"1px solid #2d2e4a"},onClick:()=>window.location.href=p,children:y===0?"Back to Stats":`Back to previous category${n?": "+n:""}`})}):e.jsxs("div",{className:"flex justify-center items-center mt-8 gap-6",children:[e.jsxs("button",{className:M,style:{minWidth:"14rem",maxWidth:"14rem",height:"3rem",boxShadow:"0 2px 12px rgba(56,189,248,0.10)",border:"1px solid #2d2e4a"},onClick:()=>window.location.href=p,children:["Back to previous category: ",n]}),e.jsxs("button",{className:M,style:{minWidth:"14rem",maxWidth:"14rem",height:"3rem",boxShadow:"0 2px 12px rgba(56,189,248,0.10)",border:"1px solid #2d2e4a"},onClick:()=>window.location.href=R,children:["Go to next top category: ",C]})]})})()]}),e.jsx("style",{children:`
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
