var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,o=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,l=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&o(e,n,t[n]);if(r)for(var n of r(t))i.call(t,n)&&o(e,n,t[n]);return e};import{a as s,b as c,c as m,d as u,m as d,e as p,n as f,s as h,f as g,g as v,h as x,i as b,j as w,k as y,l as E,R as k,o as C,K as S,u as N,p as A,q as D,r as I,t as F,v as B,w as $,_ as O,x as j}from"./vendor.4c898ce7.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();function M(e,t){const n=s(e);return s((e=>e(n)),((e,r,a)=>{const i="function"==typeof a?a(e(n)):a;r(n,i),t(e,i)}))}const R=[{name:"curveBundle (ß=0)",curve:c.beta(0),grpIdx:0,lineStyle:0,group:!1,active:!1,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=0 the curve is straight."},{name:"curveBundle (ß=0.5)",curve:c.beta(.5),grpIdx:0,lineStyle:1,group:!1,active:!0,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is."},{name:"curveBundle (ß=1)",curve:c.beta(1),grpIdx:0,lineStyle:2,group:!1,active:!1,info:"Same as curveBasis with the addition of a paramter ß which determines how close to a straight line the curve is. If ß=1 the curve is the same as curveBasis."},{name:"curveCardinal (tension=0)",curve:m.tension(0),grpIdx:1,lineStyle:0,group:!0,active:!0,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCardinal (tension=0.5)",curve:m.tension(.5),grpIdx:1,lineStyle:1,group:!1,active:!1,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCardinal (tension=1)",curve:m.tension(1),grpIdx:1,lineStyle:2,group:!1,active:!1,info:"Interpolates the points using a cubic B-spline. A tension parameter determines how 'taut' the curve is. As tension approaches 1 the segments become linear."},{name:"curveCatmullRom (α=0)",curve:u.alpha(0),grpIdx:2,lineStyle:0,group:!0,active:!1,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0 the parameterisation is uniform."},{name:"curveCatmullRom (α=0.5)",curve:u.alpha(.5),grpIdx:2,lineStyle:1,group:!1,active:!1,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=0.5 the parameterisation is centripetal and self intersecting loops are avoided."},{name:"curveCatmullRom (α=1)",curve:u.alpha(1),grpIdx:2,lineStyle:2,group:!1,active:!0,info:"Similar to curveCardinal (tension=0) but with a parameter α that determines the parameterisation used to interpolate the points. If α=1 the parameterisation is chordal."},{name:"curveMonotoneX",curve:d,grpIdx:3,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in y."},{name:"curveMonotoneY",curve:p,grpIdx:3,lineStyle:1,group:!1,active:!1,info:"Interpolates the points with a cubic spline which are monotonic (i.e. always increasing or always decreasing) in x."},{name:"curveNatural",curve:f,grpIdx:4,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with a cubic spline with zero 2nd derivatives at the endpoints."},{name:"curveStep",curve:h,grpIdx:5,lineStyle:0,group:!0,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The vertical segments lie midway between points."},{name:"curveStepAfter",curve:g,grpIdx:5,lineStyle:1,group:!1,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The y value changes after the x value."},{name:"curveStepBefore",curve:v,grpIdx:5,lineStyle:2,group:!1,active:!1,info:"Interpolates the points with alternating horizontal and vertical linear segments. The y value changes before the x value."},{name:"curveLinear",curve:x,grpIdx:6,lineStyle:0,group:!0,active:!1,info:"Interpolates the points using linear segments."},{name:"curveBasis",curve:b,grpIdx:7,lineStyle:0,group:!0,active:!1,info:"Interpolates the start and end points and approximates the inner points using a B-spline."},{name:"curveBasisClosed",curve:w,grpIdx:7,lineStyle:1,group:!1,active:!1,info:"Uses a closed B-Spline to approximate the points."}];var T;!function(e){const t="red3-curves";e.initialData={points:[[16,255],[161,178],[586,304],[352,71],[61,442],[304,342],[586,586]],active:R.map(((e,t)=>({idx:t,active:e.active}))),nActive:7},function(){const n=localStorage.getItem(t);if(n)try{let t=JSON.parse(n);e.initialData=t}catch(r){}}(),e.save=function(e,t=100){let n,r,a;return function(...i){a=this,r=i,n||(n=setTimeout((()=>{n=null,e.apply(a,r)}),t))}}((function(e){let n={points:e(z),active:e(J),nActive:e(V)};localStorage.setItem(t,JSON.stringify(n))}),1e3)}(T||(T={}));const z=M(T.initialData.points,((e,t)=>T.save(e))),P=s(null,((e,t,{idx:n,value:r})=>{let a=e(z);a[n]=r,t(z,[...a])})),L=s((e=>e(z).slice(0,e(V)))),W=s((e=>e(z).length)),V=M(T.initialData.nActive,((e,t)=>T.save(e)));s((e=>({points:e(z),active:e(V)})));const Y=y((e=>function(e,t){const n=E(),r=e.slice(0,t);return R.map((e=>(n.curve(e.curve),n(r)||"")))}(e(z),e(V)))),J=M(T.initialData.active,((e,t)=>T.save(e))),H=s((e=>t=>e(J)[t].active),((e,t,{idx:n,value:r})=>{let a=e(J);a[n].active=r,t(J,[...a])})),K=s((e=>!e(J).some((e=>!e.active))),((e,t,n)=>{let r=e(J);r.forEach((e=>e.active=n)),t(J,[...r])})),X=s(-1),G=s(-1),U=["#3366cc","#ff9900","#109618","#990099","#dc3912","#0099c6","#8c564b","#6633cc","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac"];function Q(e){return U[e%U.length]}function q(e,t,n){return Math.min(Math.max(e,t),n)}const{styled:Z,css:_}=S({media:{bp1:"(min-width: 640px)",bp2:"(min-width: 768px)",bp3:"(min-width: 1024px)"}}),ee=_({fill:"#00d7ff5a",stroke:"#0018aa20",strokeWidth:"2",cursor:"move"});function te(e){const{idx:r,cx:a,cy:i}=e,o=D(P),s=D(G),c=k.useRef(null),m=I((({event:e,dragging:t})=>{let n=function(e,t){var n;if(void 0===t&&(t=e.currentTarget),t){var r=t.ownerSVGElement||t;if(r.createSVGPoint){var a=r.createSVGPoint();return a.x=e.clientX,a.y=e.clientY,[(a=a.matrixTransform(null==(n=t.getScreenCTM())?void 0:n.inverse())).x,a.y]}if(t.getBoundingClientRect){var i=t.getBoundingClientRect();return[e.clientX-i.left-t.clientLeft,e.clientY-i.top-t.clientTop]}}return[e.pageX,e.pageY]}(e,c.current).map((e=>+function(e,t=2){return e.toFixed(Math.max(Math.min(t,20),0))}(e,0)));n[0]=q(n[0],16,584),n[1]=q(n[1],16,584),o({idx:r,value:n}),s(t?r:-1)}));return k.createElement(k.Fragment,null,k.createElement("circle",(u=l({ref:c},m()),d={className:ee(),cx:a,cy:i,r:14},t(u,n(d)))),k.createElement("path",{transform:`translate(${a-10.5}, ${i-10.5}) scale(1.2)`,fill:"white",stroke:"none",d:"M.6 3.7A7.2 7.2 0 014 .5 5 5 0 015.6 0l.3 2a7 7 0 00-2 1A6.3 6.3 0 002 4.4zm-.3.9A6.7 6.7 0 000 5.9a9.6 9.6 0 000 1.4h.6a6.3 6.3 0 011-2.1z"}));var u,d}const ne=_({fill:"#6f88f8",stroke:"#00000040",strokeWidth:"1",fontSize:"1.5rem"});function re(e){let{idx:t,cx:n,cy:r}=e;return n=n-32<0?n+16:n-32,r=r-16-8<0?r+24:r-8,k.createElement("text",null,k.createElement("tspan",{className:ne(),x:n,y:r},t+1))}const ae=Z("path",{strokeLinejoin:"round",fill:"none",pointerEvents:"none",variants:{lineStyle:{1:{strokeDasharray:"2,2"},2:{strokeDasharray:"8,8"}}}});function ie(){const[e]=N(Y),[t]=N(J);return k.createElement(k.Fragment,null,t.map((t=>t.active&&k.createElement(k.Fragment,{key:t.idx},k.createElement(ae,{d:e[t.idx],lineStyle:R[t.idx].lineStyle,stroke:`${Q(R[t.idx].grpIdx)}cf`,strokeWidth:5})))))}function oe(e){var t=e,{svgWidth:n,svgHeight:o}=t,s=((e,t)=>{var n={};for(var o in e)a.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&r)for(var o of r(e))t.indexOf(o)<0&&i.call(e,o)&&(n[o]=e[o]);return n})(t,["svgWidth","svgHeight"]);const[c]=N(L);return k.createElement("svg",l({viewBox:`0 0 ${n} ${o}`},s)," ",k.createElement("g",null,c.map(((e,t)=>k.createElement(te,{idx:t,cx:e[0],cy:e[1],key:t}))),k.createElement(ie,null),c.map(((e,t)=>k.createElement(re,{idx:t,cx:e[0],cy:e[1],key:t})))))}function le(){const[e,t]=N(K);return k.createElement("div",{className:"mt-2 pl-2 pr-3 flex justify-between items-center"},k.createElement("a",{className:"flex items-center",href:"https://github.com/d3/d3-shape#curves",target:"_blank",rel:"noreferrer"},"D3 curve types to interpolate a set of points:",k.createElement("svg",{className:"h-4 w-4 ml-1",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.2"},k.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"}))),k.createElement("input",{className:"ml-2 h-4 w-4 flex-none appearance-none rounded\r\n                text-green-100 border border-[#006f94]\r\n                bg-[#ffffff70]\r\n                checked:bg-[#ffffff70]\r\n                checked:bg-ui-check\r\n                focus:outline-none\r\n                z-10",type:"checkbox",checked:e,onChange:e=>t(e.target.checked),title:"Toggle all"}))}const se=Z("div",{position:"relative",overflow:"hidden",outline:"1px solid #79797942",backgroundColor:"#80808020","&::before":{content:"",position:"absolute",inset:"0",backgroundColor:"var(--color)",borderRadius:"4px",transform:"scaleX(calc(calc(100 - var(--size)) * 1%))",transformOrigin:"left"},"&::after":{content:"",position:"absolute",inset:0,backgroundRepeat:"no-repeat",backgroundSize:"32% 120%",backgroundPosition:"85% -65%",mixBlendMode:"multiply"},variants:{lineStyle:{0:{"&::after":{backgroundImage:'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20preserveAspectRatio%3D%22none%22%3E%20%20%20%20%3Cline%20x1%3D%220%22%20x2%3D%2224%22%20y1%3D%2210%22%20y2%3D%2210%22%20stroke%3D%22gray%22%20stroke-width%3D%225%22%20%2F%3E%3C%2Fsvg%3E")'}},1:{"&::after":{backgroundImage:'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20preserveAspectRatio%3D%22none%22%3E%20%20%20%20%3Cline%20x1%3D%220%22%20x2%3D%2240%22%20y1%3D%2210%22%20y2%3D%2210%22%20stroke%3D%22gray%22%20stroke-width%3D%225%22%20stroke-dasharray%3D%222%2C2%22%20%2F%3E%3C%2Fsvg%3E")'}},2:{"&::after":{backgroundImage:'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20preserveAspectRatio%3D%22none%22%3E%20%20%20%20%3Cline%20x1%3D%220%22%20x2%3D%2224%22%20y1%3D%2210%22%20y2%3D%2210%22%20stroke%3D%22gray%22%20stroke-width%3D%225%22%20stroke-dasharray%3D%226%2C2%22%20%2F%3E%3C%2Fsvg%3E")'}}}}});function ce(){return k.createElement("svg",{fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},k.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}))}function me({line:e,idx:t}){const[n,r]=N(H),a=n(t),i=R[e.idx],{width:o}=F({to:{width:a?0:48},config:{tension:500}}),s=D(X),c=B((({hovering:e})=>s(e?t:-1)));return k.createElement("label",{className:"flex items-center cursor-pointer",key:t},k.createElement("div",l({className:"mr-1 h-6 w-6 text-gray-600","data-tip":"","data-class":`${he()}`},c()),k.createElement(ce,null)),k.createElement("div",{className:"flex items-center"},k.createElement("input",{className:"ml-2 h-4 w-4 flex-none appearance-none rounded\r\n                        text-green-600 border border-[#006f94]\r\n                        bg-[#ffffff70]\r\n                        checked:bg-[#ffffff70] checked:border-transparent\r\n                        checked:bg-ui-check\r\n                        focus:outline-none\r\n                        z-10",type:"checkbox",checked:n(t),onChange:e=>r({idx:t,value:e.target.checked})}),k.createElement($.div,{style:{"--size":o}},k.createElement(se,{className:"-ml-6 w-16 h-7 rounded",style:{"--color":Q(i.grpIdx)},lineStyle:n(t)?i.lineStyle:-1})),k.createElement("div",{className:"ml-2"},R[t].name)))}function ue(){const[e]=N(J);return k.createElement("div",{className:"p-2 space-y-1 flex flex-col text-sm select-none"},e.map(((e,t)=>k.createElement(me,{line:e,idx:t,key:t}))))}const de=k.forwardRef((function(e,t){const[n]=N(z),[r]=N(G);return k.createElement("span",{ref:t,className:"flex-none"},"[",n.map(((e,t)=>{const a=t===n.length-1?"":",",i=JSON.stringify(e);return t===r?k.createElement("b",{key:t},i,a):k.createElement("span",{key:t},i,a)})),"]")}));function pe({expanded:e}){const{width:t,opacity:n}=F({width:e?"100%":"0%",opacity:e?1:0,config:{tension:700}}),r=k.useRef(null),[a,i]=function(e={}){const[t,n]=k.useState({error:!1,message:""});return[t,async function(t){if(t){let a=e.msOk||400;try{await C(t),n({error:!1,message:"Copied"})}catch(r){a=e.msError||1e3,console.error(r),n({error:!0,message:r})}setTimeout((()=>{n({error:!1,message:""})}),a)}}]}();return k.createElement("div",{className:""},k.createElement($.div,{style:{width:t,opacity:n},className:"relative ml-1 text-xs flex items-center justify-between"},k.createElement(de,{ref:r}),k.createElement("span",{className:"ml-1 h-4 w-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none",title:"Copy the coordinates of points to clipboard",onClick:async()=>{var e;return i(null==(e=r.current)?void 0:e.innerText)}},k.createElement("svg",{className:"",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},k.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"}))),a.message&&k.createElement("div",{className:"absolute right-5 -top-1/2"},k.createElement("div",{className:"p-2 rounded shadow-md "+(a.error?"bg-[red] text-white":"bg-[green] text-white")},a.error?"Copy failed (check console)":"Copied"))))}function fe(){const[e,t]=k.useState(!1),[n,r]=N(V),[a]=N(W);return k.createElement("div",{className:"flex"},k.createElement("div",{className:"flex items-center space-x-1"},k.createElement("div",{className:`w-4 h-4 pb-1 text-green-900 border bg-green-200 border-green-600 rounded shadow cursor-pointer select-none \n                        flex items-center justify-center\n                        ${n>2?"opacity-1":"opacity-50"}\n                        `,title:"Remove point (minimnum is 2 points)",onClick:()=>{r(q(n-1,2,a))}},"-"),k.createElement("div",{className:`w-4 h-4 pb-1 text-green-900 border bg-green-200 border-green-600 rounded shadow cursor-pointer select-none \n                        flex items-center justify-center\n                        ${n<a?"opacity-1":"opacity-50"}\n                        `,title:"Add point (maximum is 7 points)",onClick:()=>r(q(n+1,2,a))},"+"),k.createElement("div",{className:"w-4 h-4 text-green-900 bg-green-200 border border-green-600 rounded shadow cursor-pointer select-none",title:"Show/Hide the coordinates of points",onClick:()=>t((e=>!e))},k.createElement(ce,null))),k.createElement(pe,{expanded:e}))}const he=_({maxWidth:"20rem",backgroundColor:"#28284e !important"});function ge(){const[e]=N(X);return k.createElement(A,{delayShow:200,effect:"solid"},-1===e?"":R[e].info)}const ve=_({"@bp3":{gridTemplateColumns:"minmax(604px, 1fr) max-content"}});function xe(){return k.createElement("div",{className:"select-none max-w-[600px] lg:max-w-max lg:w-auto mx-auto"},k.createElement("div",{className:`grid grid-cols-1 ${ve()}`},k.createElement("div",{className:"\r\n                    relative w-full \r\n                    border-8 shadow-lg bg-white\r\n                    before:block before:pb-[100%]\r\n                    after:absolute after:inset-0 after:border after:border-gray-300 after:pointer-events-none"},k.createElement("div",{className:"absolute inset-0"},k.createElement(oe,{svgWidth:600,svgHeight:600,className:"w-full h-full"})),k.createElement("div",{className:"absolute left-2 bottom-2"},k.createElement(fe,null))),k.createElement("div",{className:""},k.createElement(le,null),k.createElement(ue,null))),k.createElement(ge,null))}const be=O({$$borderColor:"#8e34eb7a",$$shadow:"-2px -2px 0 $$borderColor, 2px -2px 0 $$borderColor, -2px 2px 0 $$borderColor, 2px 2px 0 $$borderColor",color:"#9494e4",textShadow:"$$shadow",WebkitTextStroke:"1px #8c01ff",WebkitTextFillColor:"#9494e4"});function we(){return k.createElement("header",{className:"m-8 hidden lg:flex justify-center items-center "},k.createElement("div",{className:""},k.createElement("div",{className:""},k.createElement("div",{className:"flex items-center"},k.createElement("div",{className:""},k.createElement("img",{className:"",src:"data:image/svg+xml,%3Csvg%20viewBox%3D%22-100%20-100%20200%20200%22%20width%3D%22256px%22%20height%3D%22256px%22%20stroke%3D%22%238c00ff%22%20fill%3D%22%239494e4%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cpath%20d%3D%22M2.4-16c1.2.3%202.7-4%204.4-6%202-2.2%204-3.5%207-6.6C20-35.1%2040-61%2041-60.2c1.2.9-27.6%2040.7-25.2%2043.2%201.5%201.5%2010.2-6.2%2016.6-8.8%207.9-3.3%2026.8-10.2%2027.4-8.7%201%201.7-29.8%2020.5-38%2026C17.8-6%2012.7-4.3%2013-3c1%203%2049-7.3%2060.4-2.5%205.9%202.5%2011.7%209%2010.7%2011.8-1.4%204-30.2%201.2-32.2%205.5-1.2%202.8%208.1%209.6%207%2011.3-2%202.6-30.5-11-33.4-8.4-1.2%201.1-.3%203.5.9%206.3%203.3%208%2031.5%2032.4%2030.5%2040.3-.5%204-5.8%208.1-9.8%207.8C40%2068.6%2026%2047.4%2018.7%2038.7c-5-6-8.7-10.6-11.7-16C4.4%2018.2%202.7%208.7%201.3%208.9c-3%20.6-.7%2072.9-1.3%2072.9-.6%200%201.2-66-2.3-66.6-2-.4-5.3%2018.1-9.2%2022.2-2.5%202.6-5%201.6-8.4%204-6.7%204.7-24.4%2028.3-26.6%2026.9-2-1.3%204.6-19.5%2010.1-29%206.6-11.3%2030-31.3%2028.8-33.1-.6-.8-3.8%201.3-7.5%202.6C-26%2012.5-73.3%2035-78%2030.6c-2-2.1.5-9.9%204.4-13.8%207.2-7.2%2047-11.1%2046.7-14.8-.2-3.2-36.1-5.3-36-6.7%200-1.4%2034%201.6%2035.3-1.6.7-1.6-6.2-4.8-6.8-7.2-.4-1.8.4-4%201.6-5.4%201.2-1.4%205.2-.8%205.6-2.7%201.3-4.7-25.6-28-23.8-33.3.9-2.8%207.2-3.4%2011-3.6%204.2-.1%209.1.4%2013.4%203.4%206.5%204.6%2014.9%2028%2018%2027.4%202-.3%201.5-7.3%202.4-12.7%201.7-9.9%204.7-41.3%206.1-41.3C1.8-81.6-1-17%202.4-16%22%2F%3E%3C%2Fsvg%3E",alt:"logo"})),k.createElement("h1",{className:`text-[5rem] -ml-4 self-end tracking-tighter font-black ${be()}`},"D3 Curves")),k.createElement("div",{className:"ml-16 mb-4 text-base"},k.createElement("p",null,"Toggle each of the curve types to activate / deactivate the curve. ",k.createElement("br",{className:"hidden md:inline"}),"You can also add/remove/drag the points to change the shape of the curve.")))))}function ye(){return k.createElement("div",{className:"fixed w-full h-full bg-yellow-200 pointer-events-none z-[-1]",style:{background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAjCAQAAADRPYmtAAAAbklEQVR4Ae2TwQpCMQwEJ7GI/mj+/yKoNYmnwuJReIfC21uZhcCwtVcUxcqN4sPKlbcwm6HwTjOlOoXZI6BZGTQpr6T3rKYawFF1AxdmFarn8uPVhdkz9KSBnsTJnar/yDqXdcA3PJd1wDfcb1lf6wfYiJD/SscAAAAASUVORK5CYII=), linear-gradient(to right, #ff7800d4, #ffffff00)"}})}function Ee(){return k.createElement(k.Fragment,null,k.createElement(ye,null),k.createElement("div",{className:"App h-screen flex flex-col items-center text-gray-900"},k.createElement(we,null),k.createElement("main",{className:"flex-1 w-full"},k.createElement(xe,null))))}j.render(k.createElement(k.StrictMode,null,k.createElement(Ee,null)),document.getElementById("root"));
