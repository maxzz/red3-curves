var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,c=(e,t)=>{for(var n in t||(t={}))r.call(t,n)&&o(e,n,t[n]);if(a)for(var n of a(t))i.call(t,n)&&o(e,n,t[n]);return e};import{a as l,b as s,c as u,d as m,m as d,e as p,n as h,s as v,f,g,h as x,i as y,j as b,k as E,l as w,R as k,C as S,_ as I,o as N,u as C,p as B,q as j,r as M,t as z,v as A,w as O,x as R}from"./vendor.1f26c0e9.js";function T(e,t){const n=l(e);return l((e=>e(n)),((e,a,r)=>{const i="function"==typeof r?r(e(n)):r;a(n,i),t(e,i)}))}const D=[{name:"curveBundle (ß=0)",curve:s.beta(0),grpIdx:0,lineStyle:0,group:!1,active:!1,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight."},{name:"curveBundle (ß=0.5)",curve:s.beta(.5),grpIdx:0,lineStyle:1,group:!1,active:!0,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is."},{name:"curveBundle (ß=1)",curve:s.beta(1),grpIdx:0,lineStyle:2,group:!1,active:!1,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis."},{name:"curveCardinal (tension=0)",curve:u.tension(0),grpIdx:1,lineStyle:0,group:!0,active:!0,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCardinal (tension=0.5)",curve:u.tension(.5),grpIdx:1,lineStyle:1,group:!1,active:!1,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCardinal (tension=1)",curve:u.tension(1),grpIdx:1,lineStyle:2,group:!1,active:!1,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCatmullRom (α=0)",curve:m.alpha(0),grpIdx:2,lineStyle:0,group:!0,active:!1,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform."},{name:"curveCatmullRom (α=0.5)",curve:m.alpha(.5),grpIdx:2,lineStyle:1,group:!1,active:!1,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided."},{name:"curveCatmullRom (α=1)",curve:m.alpha(1),grpIdx:2,lineStyle:2,group:!1,active:!0,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal."},{name:"curveMonotoneX",curve:d,grpIdx:3,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y."},{name:"curveMonotoneY",curve:p,grpIdx:3,lineStyle:1,group:!1,active:!1,info:"Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x."},{name:"curveNatural",curve:h,grpIdx:4,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints."},{name:"curveStep",curve:v,grpIdx:5,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points."},{name:"curveStepAfter",curve:f,grpIdx:5,lineStyle:1,group:!1,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value."},{name:"curveStepBefore",curve:g,grpIdx:5,lineStyle:2,group:!1,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value."},{name:"curveLinear",curve:x,grpIdx:6,lineStyle:0,group:!0,active:!1,info:"Interpolates the points using linear segments."},{name:"curveBasis",curve:y,grpIdx:7,lineStyle:0,group:!0,active:!1,info:"Interpolates the start and end points and approximates the inner points using a B-spline."},{name:"curveBasisClosed",curve:b,grpIdx:7,lineStyle:1,group:!1,active:!1,info:"Uses a closed B-Spline to approximate the points."}];var W;!function(e){const t="red3-curves";e.initialData={points:[[16,255],[161,178],[586,304],[352,71],[61,442],[304,342],[586,586]],active:D.map(((e,t)=>({idx:t,active:e.active}))),nActive:7},function(){const n=localStorage.getItem(t);if(n)try{let t=JSON.parse(n);e.initialData=t}catch(a){}}(),e.save=function(e,t=100){let n,a,r;return function(...i){r=this,a=i,n||(n=setTimeout((()=>{n=null,e.apply(r,a)}),t))}}((function(e){let n={points:e(L),active:e(X),nActive:e(H)};localStorage.setItem(t,JSON.stringify(n))}),1e3)}(W||(W={}));const L=T(W.initialData.points,((e,t)=>W.save(e))),P=l(null,((e,t,{idx:n,value:a})=>{let r=e(L);r[n]=a,t(L,[...r])})),V=l((e=>e(L).slice(0,e(H)))),$=l((e=>e(L).length)),H=T(W.initialData.nActive,((e,t)=>W.save(e)));l((e=>({points:e(L),active:e(H)})));const F=E((e=>function(e,t){const n=w(),a=e.slice(0,t);return D.map((e=>(n.curve(e.curve),n(a)||"")))}(e(L),e(H)))),X=T(W.initialData.active,((e,t)=>W.save(e))),Y=l((e=>t=>e(X)[t].active),((e,t,{idx:n,value:a})=>{let r=e(X);r[n].active=a,t(X,[...r])})),G=l((e=>!e(X).some((e=>!e.active))),((e,t,n)=>{let a=e(X);a.forEach((e=>e.active=n)),t(X,[...a])})),J=l(-1),q=l(-1),U=["#3366cc","#ff9900","#109618","#990099","#dc3912","#0099c6","#8c564b","#6633cc","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac"];function _(e){return U[e%U.length]}function K(e,t,n){return Math.min(Math.max(e,t),n)}const Q=I({fill:"#00d7ff5a",stroke:"#0018aa20",strokeWidth:"2",cursor:"move"});function Z(e){const{idx:a,cx:r,cy:i}=e,o=j(P),l=j(q),s=k.useRef(null),u=M((({event:e,dragging:t})=>{let n=function(e,t){var n;if(void 0===t&&(t=e.currentTarget),t){var a=t.ownerSVGElement||t;if(a.createSVGPoint){var r=a.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,[(r=r.matrixTransform(null==(n=t.getScreenCTM())?void 0:n.inverse())).x,r.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}(e,s.current).map((e=>+function(e,t=2){return e.toFixed(Math.max(Math.min(t,20),0))}(e,0)));n[0]=K(n[0],16,584),n[1]=K(n[1],16,584),o({idx:a,value:n}),l(t?a:-1)}));return k.createElement(k.Fragment,null,k.createElement("circle",(m=c({ref:s},u()),d={className:Q(),cx:r,cy:i,r:14},t(m,n(d)))),k.createElement("path",{transform:`translate(${r-10.5}, ${i-10.5}) scale(1.2)`,fill:"white",stroke:"none",d:"M.6 3.7A7.2 7.2 0 014 .5 5 5 0 015.6 0l.3 2a7 7 0 00-2 1A6.3 6.3 0 002 4.4zm-.3.9A6.7 6.7 0 000 5.9a9.6 9.6 0 000 1.4h.6a6.3 6.3 0 011-2.1z"}));var m,d}const ee=I({fill:"#6f88f8",stroke:"#00000040",strokeWidth:"1",fontSize:"1.5rem"});function te(e){let{idx:t,cx:n,cy:a}=e;return n=n-32<0?n+16:n-32,a=a-16-8<0?a+24:a-8,k.createElement("text",null,k.createElement("tspan",{className:ee(),x:n,y:a},t+1))}const ne=N("path",{strokeLinejoin:"round",fill:"none",pointerEvents:"none",variants:{lineStyle:{1:{strokeDasharray:"2,2"},2:{strokeDasharray:"8,8"}}}});function ae(){const[e]=C(F),[t]=C(X);return k.createElement(k.Fragment,null,t.map((t=>t.active&&k.createElement(k.Fragment,{key:t.idx},k.createElement(ne,{d:e[t.idx],lineStyle:D[t.idx].lineStyle,stroke:"red",strokeWidth:7}),k.createElement(ne,{d:e[t.idx],lineStyle:D[t.idx].lineStyle,stroke:`${_(D[t.idx].grpIdx)}cf`,strokeWidth:5})))))}function re({svgWidth:e,svgHeight:t}){const[n]=C(V);return k.createElement("svg",{viewBox:`0 0 ${e} ${t}`,className:""},k.createElement("g",null,n.map(((e,t)=>k.createElement(Z,{idx:t,cx:e[0],cy:e[1],key:t}))),k.createElement(ae,null),n.map(((e,t)=>k.createElement(te,{idx:t,cx:e[0],cy:e[1],key:t})))))}function ie(){const[e,t]=C(G);return k.createElement("div",{className:"mt-2 pl-2 pr-3 flex justify-between items-center"},k.createElement("div",{className:"flex items-center space-x-1"},k.createElement("span",null,"D3 curve types to interpolate a set of points:"),k.createElement("a",{className:"",href:"https://github.com/d3/d3-shape#curves",target:"_blank"},k.createElement("svg",{className:"h-4 w-4 pt-0.5 text-gray-400",viewBox:"0 0 20 20",fill:"currentColor"},k.createElement("path",{d:"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}),k.createElement("path",{d:"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"})))),k.createElement("input",{className:"ml-2 h-4 w-4 flex-none appearance-none rounded\r\n                text-green-100 border border-[#006f94]\r\n                bg-[#ffffff70]\r\n                checked:bg-[#ffffff70]\r\n                checked:bg-ui-check\r\n                focus:outline-none\r\n                z-10",type:"checkbox",checked:e,onChange:e=>t(e.target.checked),title:"Toggle all"}))}const oe=N("div",{position:"relative",overflow:"hidden",outline:"1px solid #79797942",backgroundColor:"#80808020","&::before":{content:"",position:"absolute",inset:"0",backgroundColor:"var(--color)",borderRadius:"4px",transform:"scaleX(calc(calc(100 - var(--size)) * 1%))",transformOrigin:"left"},"&::after":{content:"",position:"absolute",inset:0,backgroundRepeat:"no-repeat",backgroundSize:"32% 120%",backgroundPosition:"85% -65%",mixBlendMode:"multiply"},variants:{lineStyle:{0:{"&::after":{backgroundImage:'url("assets/dashed-line0.eb82d2a1.svg")'}},1:{"&::after":{backgroundImage:'url("assets/dashed-line11.b3422b90.svg")'}},2:{"&::after":{backgroundImage:'url("assets/dashed-line2.5487c8ca.svg")'}}}}});function ce(){return k.createElement("svg",{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},k.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}))}function le({line:e,idx:t}){const[n,a]=C(Y),r=n(t),i=D[e.idx],{width:o}=z({to:{width:r?0:48},config:{tension:500}}),l=j(J),s=A((({hovering:e})=>l(e?t:-1)));return k.createElement("label",{className:"flex items-center cursor-pointer",key:t},k.createElement("div",c({className:"mr-1 h-6 w-6 text-gray-600","data-tip":"","data-class":`${he()}`},s()),k.createElement(ce,null)),k.createElement("div",{className:"flex items-center"},k.createElement("input",{className:"ml-2 h-4 w-4 flex-none appearance-none rounded\r\n                        text-green-600 border border-[#006f94]\r\n                        bg-[#ffffff70]\r\n                        checked:bg-[#ffffff70] checked:border-transparent\r\n                        checked:bg-ui-check\r\n                        focus:outline-none\r\n                        z-10",type:"checkbox",checked:n(t),onChange:e=>a({idx:t,value:e.target.checked})}),k.createElement(O.div,{style:{"--size":o}},k.createElement(oe,{className:"-ml-6 w-16 h-7 rounded",style:{"--color":_(i.grpIdx)},lineStyle:n(t)?i.lineStyle:-1})),k.createElement("div",{className:"ml-2"},D[t].name)))}function se(){const[e]=C(X);return k.createElement("div",{className:"p-2 space-y-1 flex flex-col text-sm select-none"},e.map(((e,t)=>k.createElement(le,{line:e,idx:t,key:t}))))}function ue(){return k.createElement(k.Fragment,null,k.createElement("p",null,"Toggle each of the curve types to activate / deactivate the curve."),k.createElement("p",null,"You can also add/remove/drag the points to change the shape of the curve."))}const me=k.forwardRef((function(e,t){const[n]=C(L),[a]=C(q);return k.createElement("span",{ref:t,className:"flex-none"},"[",n.map(((e,t)=>{const r=t===n.length-1?"":",",i=JSON.stringify(e);return t===a?k.createElement("b",{key:t},i,r):k.createElement("span",{key:t},i,r)})),"]")}));function de({expanded:e}){const{width:t,opacity:n}=z({width:e?"100%":"0%",opacity:e?1:0,config:{tension:700}}),a=k.useRef(null),[r,i]=function(e={}){const[t,n]=k.useState({error:!1,message:""});return[t,async function(t){if(t){let r=e.msOk||400;try{await S(t),n({error:!1,message:"Copied"})}catch(a){r=e.msError||1e3,console.error(a),n({error:!0,message:a})}setTimeout((()=>{n({error:!1,message:""})}),r)}}]}();return k.createElement("div",{className:""},k.createElement(O.div,{style:{width:t,opacity:n},className:"relative ml-1 text-xs flex items-center justify-between"},k.createElement(me,{ref:a}),k.createElement("span",{className:"ml-1 h-4 w-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none",title:"Copy the coordinates of points to clipboard",onClick:async()=>{var e;return i(null==(e=a.current)?void 0:e.innerText)}},k.createElement("svg",{className:"",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},k.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"}))),r.message&&k.createElement("div",{className:"absolute right-5 -top-1/2"},k.createElement("div",{className:"p-2 rounded shadow-md "+(r.error?"bg-[red] text-white":"bg-[green] text-white")},r.error?"Copy failed (check console)":"Copied"))))}function pe(){const[e,t]=k.useState(!1),[n,a]=C(H),[r]=C($);return k.createElement("div",{className:"flex"},k.createElement("div",{className:"flex items-center space-x-1"},k.createElement("div",{className:`w-4 h-4 pb-1 text-green-900 border bg-green-200 border-green-600 rounded shadow cursor-pointer select-none \n                        flex items-center justify-center\n                        ${n>2?"opacity-1":"opacity-50"}\n                        `,title:"Remove point (minimnum is 2 points)",onClick:()=>{a(K(n-1,2,r))}},"-"),k.createElement("div",{className:`w-4 h-4 pb-1 text-green-900 border bg-green-200 border-green-600 rounded shadow cursor-pointer select-none \n                        flex items-center justify-center\n                        ${n<r?"opacity-1":"opacity-50"}\n                        `,title:"Add point (maximum is 7 points)",onClick:()=>a(K(n+1,2,r))},"+"),k.createElement("div",{className:"w-4 h-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none",title:"Show/Hide the coordinates of points",onClick:()=>t((e=>!e))},k.createElement(ce,null))),k.createElement(de,{expanded:e}))}const he=I({maxWidth:"20rem",backgroundColor:"#28284e !important"});function ve(){const[e]=C(J);return k.createElement(B,{delayShow:200,effect:"solid"},-1===e?"":D[e].info)}function fe(){return k.createElement("div",{className:"bg-purple-100"},k.createElement("div",{className:"flex-col items-center hidden sm:flex"},k.createElement(ue,null)),k.createElement("div",{className:"flex sm:justify-center flex-wrap sm:flex-nowrap"},k.createElement("div",{className:"flex-none sm:flex-1 w-full min-h-[605px] max-w-4xl\r\n                        flex items-center justify-center\r\n                        p-4 border-8 bg-yellow-50 sm:bg-purple-500 relative select-none"},k.createElement(re,{svgWidth:600,svgHeight:600}),k.createElement("div",{className:"absolute left-2 bottom-2"},k.createElement(pe,null))),k.createElement("div",{className:""},k.createElement(ie,null),k.createElement(se,null))),k.createElement(ve,null))}function ge(){return k.createElement("div",{className:"App"},k.createElement(fe,null))}R.render(k.createElement(k.StrictMode,null,k.createElement(ge,null)),document.getElementById("root"));
