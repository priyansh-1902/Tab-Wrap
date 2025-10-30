import{c as A,j as e,R as i}from"./client-DUeHcXHK.js";/* empty css                       */import{C as E,T as C}from"./trophy-CQWQMqHT.js";const D=({hours:n,unit:r,label:m,focusColor:l})=>e.jsxs("div",{className:"flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg mx-auto",children:[e.jsx("div",{className:"text-white mb-4 p-2 rounded-full bg-purple-400/20",children:e.jsx(E,{className:"w-8 h-8 text-purple-400"})}),e.jsx("p",{className:"text-6xl sm:text-7xl font-extrabold",style:{color:l},children:n}),e.jsx("p",{className:"text-sm sm:text-base font-semibold text-gray-400 uppercase tracking-widest mt-2",children:r}),e.jsx("p",{className:"text-2xl sm:text-3xl font-extrabold text-white mt-4 text-center",children:m})]}),L=({streakDays:n,timePeriodLabel:r,streakDates:m,progress:l})=>{const u=Math.max(...n,1),h=n.map(s=>u?s/u:0).map(s=>s*(typeof l=="number"?l:1));return e.jsxs("div",{className:"flex flex-col items-center w-full mt-10",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-6 uppercase tracking-wider",children:"TOP SOCIAL MEDIA STREAK"}),e.jsxs("div",{className:"flex items-end space-x-2 w-full max-w-sm px-4",children:[h.map((s,f)=>e.jsx("div",{className:"flex-1 rounded-t-lg bg-pink-500 hover:bg-pink-400 transition-all duration-300 cursor-pointer",style:{height:`${s*100}px`,minHeight:"4px",boxShadow:`0 0 10px ${s>.8?"rgba(236, 72, 153, 0.8)":"transparent"}`,transition:"height 0.3s cubic-bezier(0.4,0,0.2,1)"}},f)),e.jsx(C,{className:"w-8 h-8 text-yellow-400 ml-4 animate-pulse"})]}),e.jsx("p",{className:"text-sm text-gray-400 mt-4 font-semibold tracking-wide",children:r})]})};function R(){const[n,r]=i.useState(""),[m,l]=i.useState(!1),u=i.useRef("");i.useEffect(()=>{async function a(){if(!window.LanguageModel){r("Keep up the scrolling!");return}if(await window.LanguageModel.availability()==="unavailable"){r("Keep up the scrolling!");return}const c=await window.LanguageModel.create();chrome.storage.local.get(["tabWrapSummary"],async x=>{const j=(x.tabWrapSummary||{}).categorySummaries?.["Social Media / Messaging"]||"";if(j){const N=j+`
Write a quippy statement about this social media summary, as if talking to the user, in less than 50 characters.`;try{l(!0);let p="";for await(const v of c.promptStreaming(N))p+=v,u.current=p,r(p);l(!1),c.destroy()}catch{r("Keep up the scrolling!"),l(!1)}}else r("Keep up the scrolling!")})}a()},[]);const[t,h]=i.useState({totalMinutes:0,streak:[]});i.useEffect(()=>{chrome.storage.local.get(["tabWrapSummary"],a=>{const o=a.tabWrapSummary||{},c=Math.floor((o.categoryTotals?.["Social Media / Messaging"]||0)/60);h({totalMinutes:c,streak:Array.isArray(o.topCategoryStreaks?.["Social Media / Messaging"])?o.topCategoryStreaks["Social Media / Messaging"]:[]})})},[]);const s=Array.isArray(t.streak)?t.streak.map(a=>a.minutes):[],f=Array.isArray(t.streak)?t.streak.map(a=>a.date?new Date(a.date).toLocaleString("en-US",{month:"short",day:"numeric"}):""):[],k=Array.isArray(t.streak)&&t.streak.length?`${new Date(t.streak[0].date).toLocaleString("en-US",{month:"short",day:"numeric"})} - ${new Date(t.streak[t.streak.length-1].date).toLocaleString("en-US",{month:"short",day:"numeric"})}`:"",[b,g]=i.useState(0);i.useEffect(()=>{let a,o=1200;function c(x){a||(a=x);const S=Math.min((x-a)/o,1);g(S),S<1?requestAnimationFrame(c):g(1)}return requestAnimationFrame(c),()=>g(0)},[t.totalMinutes,s.length,s.join(",")]);const d=Math.floor(b*t.totalMinutes);let M=Math.floor(d/60),y="HOURS",w=M;return d<1?(y="SECONDS",w=Math.floor(t.totalMinutes*60*b)):d<60&&(y="MINUTES",w=d),e.jsxs("div",{className:"min-h-screen p-4 sm:p-8 flex items-center justify-center bg-gray-900 font-sans",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden -z-10",children:[e.jsx("div",{className:"absolute top-10 left-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"}),e.jsx("div",{className:"absolute top-1/2 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"})]}),e.jsxs("div",{className:"w-full max-w-xl p-6 md:p-8 rounded-3xl backdrop-filter backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative space-y-12",children:[e.jsx("h1",{className:"text-3xl sm:text-4xl font-extrabold text-center text-white uppercase tracking-widest drop-shadow-lg",children:"SOCIAL MEDIA CATEGORY SUMMARY"}),e.jsx(D,{hours:w,unit:y,label:"SPENT ON SOCIAL MEDIA",focusColor:"#ec4899"}),e.jsx("div",{className:"flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/10 shadow-lg w-full max-w-lg mx-auto my-4",children:e.jsx("p",{className:"text-base sm:text-lg font-semibold text-white text-center",children:m?e.jsxs("span",{children:[n,e.jsx("span",{className:"animate-pulse",children:"|"})]}):n||"Keep up the scrolling!"})}),e.jsx(L,{streakDays:s,timePeriodLabel:k,streakDates:f,progress:b})]}),e.jsx("style",{children:`
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
			`})]})}const T=document.getElementById("root");A.createRoot(T).render(e.jsx(R,{}));
