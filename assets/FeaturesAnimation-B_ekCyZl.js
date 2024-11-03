import{j as t,m as e}from"./index-BM4BowRl.js";const f=()=>{const n=[{icon:"📚",title:"Resources",description:"Comprehensive learning materials",gradient:"feature1Gradient",delay:0},{icon:"🎯",title:"Practice",description:"Interactive exercises",gradient:"feature2Gradient",delay:.2},{icon:"🏆",title:"Awards",description:"Achievement system",gradient:"feature3Gradient",delay:.4},{icon:"📈",title:"Progress",description:"Track your journey",gradient:"feature4Gradient",delay:.6}];return t.jsxs(e.svg,{viewBox:"0 0 400 400",xmlns:"http://www.w3.org/2000/svg",className:"w-full h-full",initial:"initial",animate:"animate",children:[t.jsxs("defs",{children:[t.jsxs("linearGradient",{id:"centerGradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",style:{stopColor:"#faf5ff",stopOpacity:1},children:t.jsx("animate",{attributeName:"stop-color",values:"#faf5ff;#f3e8ff;#faf5ff",dur:"5s",repeatCount:"indefinite"})}),t.jsx("stop",{offset:"100%",style:{stopColor:"#e9d5ff",stopOpacity:1},children:t.jsx("animate",{attributeName:"stop-color",values:"#e9d5ff;#d8b4fe;#e9d5ff",dur:"5s",repeatCount:"indefinite"})})]}),t.jsxs("linearGradient",{id:"feature1Gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",style:{stopColor:"#c084fc",stopOpacity:1}}),t.jsx("stop",{offset:"100%",style:{stopColor:"#a855f7",stopOpacity:1}})]}),t.jsxs("linearGradient",{id:"feature2Gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",style:{stopColor:"#a855f7",stopOpacity:1}}),t.jsx("stop",{offset:"100%",style:{stopColor:"#9333ea",stopOpacity:1}})]}),t.jsxs("linearGradient",{id:"feature3Gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",style:{stopColor:"#9333ea",stopOpacity:1}}),t.jsx("stop",{offset:"100%",style:{stopColor:"#7e22ce",stopOpacity:1}})]}),t.jsxs("linearGradient",{id:"feature4Gradient",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",style:{stopColor:"#7e22ce",stopOpacity:1}}),t.jsx("stop",{offset:"100%",style:{stopColor:"#6b21a8",stopOpacity:1}})]}),t.jsxs("filter",{id:"glow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[t.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),t.jsx("feFlood",{floodColor:"#f3e8ff",floodOpacity:"0.5"}),t.jsx("feComposite",{in2:"blur",operator:"in"}),t.jsxs("feMerge",{children:[t.jsx("feMergeNode",{}),t.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),t.jsxs("filter",{id:"strongGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[t.jsx("feGaussianBlur",{stdDeviation:"5",result:"blur"}),t.jsx("feFlood",{floodColor:"#a855f7",floodOpacity:"0.5"}),t.jsx("feComposite",{in2:"blur",operator:"in"}),t.jsxs("feMerge",{children:[t.jsx("feMergeNode",{}),t.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),t.jsx(e.rect,{x:"0",y:"0",width:"400",height:"400",fill:"url(#centerGradient)",initial:{opacity:0},animate:{opacity:.1},transition:{duration:1}}),[170,140,110].map((a,i)=>t.jsx(e.circle,{cx:"200",cy:"200",r:a,fill:"none",stroke:`hsl(280, ${90-i*10}%, ${90-i*5}%)`,strokeWidth:"1",initial:{opacity:0,scale:.8},animate:{opacity:.3-i*.1,scale:1,rotate:360},transition:{duration:3+i,repeat:1/0,repeatType:"reverse",ease:"linear"}},`circle-${i}`)),t.jsxs(e.g,{filter:"url(#strongGlow)",children:[t.jsx(e.circle,{cx:"200",cy:"200",r:"80",fill:"url(#centerGradient)",stroke:"#a855f7",strokeWidth:"4",initial:{scale:0},animate:{scale:1},transition:{type:"spring",duration:1.5,bounce:.4}}),t.jsxs(e.g,{children:[t.jsx(e.text,{x:"200",y:"190",textAnchor:"middle",fontSize:"32",fill:"#7e22ce",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.5},children:"🎓"}),t.jsxs(e.text,{x:"200",y:"220",textAnchor:"middle",fontFamily:"Arial",fontWeight:"bold",fill:"#6b21a8",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},children:[t.jsx("tspan",{fontSize:"16",children:"SMART"}),t.jsx("tspan",{x:"200",y:"235",fontSize:"14",children:"LEARNING"})]})]})]}),t.jsx(e.g,{initial:{rotate:0},animate:{rotate:360},transition:{duration:40,repeat:1/0,ease:"linear"},children:n.map((a,i)=>{const o=i*360/n.length,r=200+120*Math.cos(o*Math.PI/180),s=200+120*Math.sin(o*Math.PI/180);return t.jsxs(e.g,{transform:`rotate(${-o} ${r} ${s})`,initial:{opacity:0,scale:0},animate:{opacity:1,scale:1},transition:{delay:a.delay},whileHover:{scale:1.1},children:[t.jsx(e.circle,{cx:r,cy:s,r:"45",fill:`url(#${a.gradient})`,filter:"url(#glow)",animate:{r:[45,48,45]},transition:{duration:2,repeat:1/0,repeatType:"reverse"}}),t.jsx("text",{x:r,y:s-5,textAnchor:"middle",fontSize:"24",fill:"#ffffff",children:a.icon}),t.jsx("text",{x:r,y:s+15,textAnchor:"middle",fontSize:"12",fill:"#ffffff",fontFamily:"Arial",children:a.title}),t.jsx(e.circle,{cx:r,cy:s,r:"50",fill:"none",stroke:"#ffffff",strokeWidth:"2",strokeDasharray:"314",initial:{strokeDashoffset:314},animate:{strokeDashoffset:0},transition:{duration:3,repeat:1/0,ease:"linear"},style:{opacity:.3}})]},a.title)})}),t.jsx(e.g,{filter:"url(#glow)",children:t.jsx(e.circle,{cx:"200",cy:"200",r:"120",fill:"none",stroke:"#a855f7",strokeWidth:"1",strokeDasharray:"5,5",initial:{opacity:0},animate:{opacity:.5,strokeDashoffset:[0,100]},transition:{opacity:{duration:1},strokeDashoffset:{duration:20,repeat:1/0,ease:"linear"}}})}),[...Array(12)].map((a,i)=>t.jsx(e.circle,{r:"2",fill:`hsl(${280+i*5}, 90%, 80%)`,filter:"url(#glow)",initial:{x:200,y:200,opacity:0},animate:{x:200+120*Math.cos(i*30*Math.PI/180),y:200+120*Math.sin(i*30*Math.PI/180),opacity:[0,1,0]},transition:{duration:4,delay:i*.3,repeat:1/0,ease:"linear"}},`particle-${i}`))]})};export{f as default};
//# sourceMappingURL=FeaturesAnimation-B_ekCyZl.js.map
