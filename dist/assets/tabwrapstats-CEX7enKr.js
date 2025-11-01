import{c as h,j as e,r as d}from"./client-UQJF2hQD.js";import{C as b,P as g,N as y,S as w,a as j,H as N,M as v,b as k,c as S,d as C,D as A,B as M}from"./sun-D3na853Z.js";import{c as f}from"./createLucideIcon-BQ3GTJNJ.js";/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],D=f("sparkles",F);/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],P=f("zap",T),B=({data:s})=>{const[i,c]=d.useState(s.map(()=>0));d.useEffect(()=>{const n=Date.now(),t=()=>{const o=Date.now()-n,x=Math.min(1,o/1500),u=s.map(p=>p.percentage*x);c(u),x<1&&requestAnimationFrame(t)},a=requestAnimationFrame(t);return()=>cancelAnimationFrame(a)},[s]);let r=0;const m=i.map((l,n)=>{const t=r;return r+=l,`${s[n].color} ${t}% ${r}%`}).join(", ");return e.jsxs("div",{className:"relative w-48 h-48 mx-auto mb-6 flex items-center justify-center",children:[e.jsx("div",{className:"w-full h-full rounded-full",style:{background:`conic-gradient(${m})`,transform:"rotate(-90deg)"}}),e.jsx("div",{className:"absolute w-28 h-28 bg-[#0a0a0a] rounded-full"})," ",e.jsxs("div",{className:"absolute text-white text-center",children:[e.jsx(D,{className:"w-8 h-8 text-yellow-300 mx-auto mb-1 animate-pulse"}),e.jsx("p",{className:"text-xs uppercase font-semibold text-gray-400",children:"Total"})]})]})},E=({minutes:s,label:i,focusColor:c})=>{const[r,m]=d.useState(0),l=s;return d.useEffect(()=>{if(l===0)return;const n=1500,t=Date.now(),a=()=>{const x=Date.now()-t,u=Math.min(1,x/n),p=Math.floor(u*l);m(p),u<1&&requestAnimationFrame(a)},o=requestAnimationFrame(a);return()=>cancelAnimationFrame(o)},[l]),e.jsxs("div",{className:"flex flex-col items-center justify-center p-4",children:[e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:i}),e.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:c},children:r}),e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest",children:"Minutes"})]})},q=({count:s,message:i,highlight:c})=>{const r=m=>{const l=m.split("**");return e.jsx(e.Fragment,{children:l.map((n,t)=>t%2!==0?e.jsx("strong",{className:"text-[#ff6347]",children:n},t):n)})};return e.jsxs("div",{className:"flex flex-col items-center text-center px-4 mt-6 space-y-3",children:[e.jsx("p",{className:"text-lg font-medium text-white",children:r(i)}),e.jsx("p",{className:"text-sm text-gray-400 italic",children:c})]})},W=({name:s,percentage:i,icon:c,color:r})=>{const[m,l]=d.useState(0);return d.useEffect(()=>{const t=Date.now(),a=()=>{const x=Date.now()-t,u=Math.min(1,x/1e3),p=i*u;l(p),u<1&&requestAnimationFrame(a)},o=requestAnimationFrame(a);return()=>cancelAnimationFrame(o)},[i]),e.jsxs("div",{className:"flex items-center space-x-3 w-full",children:[e.jsx("div",{className:"w-5 h-5 flex-shrink-0",style:{color:r},children:c}),e.jsxs("div",{className:"flex-1",children:[e.jsx("p",{className:"text-sm text-gray-300",children:s}),e.jsx("div",{className:"w-full bg-white/10 rounded-full h-2 mt-1",children:e.jsx("div",{className:"h-full rounded-full",style:{width:`${m}%`,backgroundColor:r,transition:"background-color 0.3s ease-in-out"}})})]}),e.jsxs("p",{className:"text-sm font-semibold text-white w-12 text-right",children:[m.toFixed(1),"%"]})]})};function H(){const[s,i]=d.useState(null);if(d.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],t=>{i(t.tabWrapSummary||null)})},[]),!s)return e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white bg-black",children:"Loading stats..."});const c=[{text:"Work",color:"#7e22ce"},{text:"Finance",color:"#22c55e"},{text:"Hobbies",color:"#facc15"},{text:"Spirituality",color:"#22d3ee"},{text:"Health",color:"#ef4444"},{text:"Social Media",color:"#ff6347"},{text:"Community",color:"#a259ff"},{text:"Entertainment",color:"#eab308"},{text:"Shopping",color:"#38bdf8"},{text:"News",color:"#64748b"},{text:"Travel",color:"#f472b6"},{text:"Misc",color:"#f472b6"}],r={Work:M,Finance:A,Hobbies:C,Spirituality:S,Health:k,Social:v,Community:N,Entertainment:j,Shopping:w,News:y,Travel:g,default:b};function m(t){const a=c.find(o=>o.text===t);if(a)return a.color;for(const o of c)if(t.toLowerCase().includes(o.text.toLowerCase()))return o.color;return"#38bdf8"}const n=(s.categoryPercents||[]).slice(0,5).map(t=>{const a=t.cat.split(" ")[0],o=r[a]||P;return{name:t.cat,percentage:t.pct,IconComponent:o,color:m(t.cat)}});return e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans",style:{backgroundColor:"#000"},children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-[#ff0099] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-[#ff6347] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-8 mt-10 mb-10",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("p",{className:"text-xs text-gray-400 uppercase tracking-widest",children:"TAB WRAP"}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-white mt-2 drop-shadow-lg",children:"Your Browsing Stats"})]}),e.jsx(E,{minutes:s.totalMinutes,label:"Total Minutes Spent Browsing",focusColor:"#ff0099"}),e.jsx(q,{count:s.totalTabs,message:`You opened a mere **${s.totalTabs}** new tabs this month!`,highlight:""}),e.jsxs("div",{className:"mt-8 text-center",children:[e.jsx("h2",{className:"text-xl font-bold text-white mb-4 uppercase tracking-wider",children:"Activity Breakdown (By Time)"}),e.jsx(B,{data:n})]}),e.jsx("div",{className:"space-y-4 px-2",children:n.map((t,a)=>e.jsx(W,{name:t.name,percentage:t.percentage,icon:e.jsx(t.IconComponent,{size:18}),color:t.color},a))}),n.length>0&&e.jsx("div",{className:"flex justify-center w-full",children:(()=>{const t=n[0].name;let a="";t.includes("/")?a=t.split("/")[0].replace(/\s+/g,"").toLowerCase():a=t.split(" ")[0].toLowerCase();const o=`${a}.html`;return e.jsx("button",{className:"mt-6 py-3 px-6 rounded-full text-white font-bold text-lg transition-all duration-300 ease-in-out shadow-lg bg-[#ff0099] hover:bg-[#e00080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]",onClick:()=>window.location.href=o,children:"Go to your top category page"})})()})]}),e.jsx("style",{children:`
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
      `})]})}const I=document.getElementById("root");h.createRoot(I).render(e.jsx(H,{}));
