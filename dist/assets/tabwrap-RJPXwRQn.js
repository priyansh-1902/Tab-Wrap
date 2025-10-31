import{j as t,c as r}from"./client-BCr4-QWM.js";/* empty css                       */function a(){return t.jsx("style",{children:`
      html, body {
        background: #0b0b0b !important;
        margin: 0 !important;
        padding: 0 !important;
        min-height: 100vh !important;
        width: 100vw !important;
        box-sizing: border-box !important;
      }
    `})}function i(){const e=(Math.random()<.5?"magenta":"green")==="magenta"?{pillGradient:"linear-gradient(90deg, #ff2dbe 0%, #a259ff 100%)",circleGradient:"radial-gradient(circle, #ff2dbe 0%, transparent 70%)"}:{pillGradient:"linear-gradient(90deg, #39ff14 0%, #00ffa2 100%)",circleGradient:"radial-gradient(circle, #39ff14 0%, transparent 70%)"},n=()=>{window.location.href="tabwrapstats.html"};return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
        html, body {
          background: #0b0b0b !important;
          margin: 0 !important;
          padding: 0 !important;
          min-height: 100vh !important;
          width: 100vw !important;
          box-sizing: border-box !important;
        }
        @keyframes magentaMove {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(40px, 40px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes magentaMove2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -40px) scale(1.25); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pillMove {
          0% { transform: rotate(-18deg) translate(0px, 0px); }
          50% { transform: rotate(-18deg) translate(30px, 20px); }
          100% { transform: rotate(-18deg) translate(0px, 0px); }
        }
      `}),t.jsxs("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",width:"100vw",maxWidth:"100vw",boxSizing:"border-box"},children:[t.jsx(a,{}),t.jsx("style",{children:`
                @keyframes magentaMove {
                  0% { transform: translate(0px, 0px); }
                  50% { transform: translate(40px, 40px); }
                  100% { transform: translate(0px, 0px); }
                }
                @keyframes magentaMove2 {
                  0% { transform: translate(0px, 0px); }
                  50% { transform: translate(-40px, -40px); }
                  100% { transform: translate(0px, 0px); }
                }
            `}),t.jsx("div",{style:{position:"absolute",top:-60,right:-120,width:420,height:120,borderRadius:80,background:e.pillGradient,opacity:.85,zIndex:0,pointerEvents:"none",filter:"blur(8px)",animation:"pillMove 24s ease-in-out infinite"}}),t.jsx("div",{style:{position:"absolute",top:-100,left:-120,width:320,height:320,borderRadius:"50%",background:e.circleGradient,filter:"blur(48px)",opacity:.7,zIndex:0,pointerEvents:"none",animation:"magentaMove 12s ease-in-out infinite"}}),t.jsx("div",{style:{position:"absolute",bottom:-100,right:-120,width:320,height:320,borderRadius:"50%",background:e.circleGradient,filter:"blur(48px)",opacity:.7,zIndex:0,pointerEvents:"none",animation:"magentaMove2 12s ease-in-out infinite"}}),t.jsxs("div",{style:{width:"min(600px, 96%)",borderRadius:0,padding:"64px 48px",background:"none",boxShadow:"none",textAlign:"center",zIndex:1},children:[t.jsx("h2",{style:{fontSize:32,letterSpacing:"0.15em",margin:0,fontWeight:700,color:"#fff"},children:"TAB WRAP"}),t.jsx("h1",{style:{fontSize:100,lineHeight:1,margin:"18px 0",fontWeight:900,color:"#fff"},children:"2024"}),t.jsxs("p",{style:{fontSize:20,maxWidth:520,margin:"0 auto",color:"#eee"},children:["Your personalized deep dive into a year of ",t.jsx("b",{children:"Work, Social, and Hobby"})," focus."]}),t.jsx("button",{style:{background:"#fff",color:"#ff5a2e",border:"none",borderRadius:48,padding:"16px 40px",fontSize:20,margin:"36px 0",cursor:"pointer",fontWeight:800,boxShadow:"0 6px 18px rgba(0,0,0,0.18)"},onClick:n,children:"Start My Wrap"}),t.jsx("div",{style:{color:"#fff",textAlign:"center",fontSize:16,marginTop:16,fontWeight:500},children:"Analytics Powered by Tab Wrap Extension"})]})]})]})}const o=document.getElementById("root");r.createRoot(o).render(t.jsx(i,{}));
