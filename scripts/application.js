const t="http://www.w3.org/2000/svg";class e{constructor(e){this.element=document.createElementNS(t,"mask"),this.element.setAttribute("id",e);const i=document.createElementNS(t,"circle");i.setAttribute("id",`${e}OuterCircle`),i.setAttribute("cx",0),i.setAttribute("cy",0),i.setAttribute("r",0),i.setAttribute("fill","white");const r=document.createElementNS(t,"circle");let n,s;r.setAttribute("id",`${e}InnerCircle`),r.setAttribute("cx",0),r.setAttribute("cy",0),r.setAttribute("r",0),r.setAttribute("fill","black"),this.element.appendChild(i),this.element.appendChild(r),Object.defineProperty(this,"radius",{enumerable:!0,get:()=>1+Math.sqrt((this.width/2)**2+(this.height/2)**2)}),Object.defineProperty(this,"outerRadius",{enumerable:!0,get:()=>n,set:t=>{n=t,i.setAttribute("r",n*this.radius)}}),Object.defineProperty(this,"innerRadius",{enumerable:!0,get:()=>s,set:t=>{s=t,r.setAttribute("r",s*this.radius)}}),Object.defineProperty(this,"width",{enumerable:!0,get:()=>2*parseInt(i.getAttribute("cx"),10),set:t=>{const e=this.innerRadius,n=this.outerRadius;i.setAttribute("cx",t/2),r.setAttribute("cx",t/2),this.innerRadius=e||0,this.outerRadius=n||0}}),Object.defineProperty(this,"height",{enumerable:!0,get:()=>2*parseInt(i.getAttribute("cy"),10),set:t=>{const e=this.innerRadius,n=this.outerRadius;i.setAttribute("cy",t/2),r.setAttribute("cy",t/2),this.innerRadius=e||0,this.outerRadius=n||0}})}}let i=0;class r{constructor(){i+=1;const r=`mask${i}`;this.element=document.createElementNS(t,"svg"),this.element.setAttribute("id",r),this.element.classList.add("mask");const n=document.createElementNS(t,"defs");this.mask=new e(`${r}Mask`),n.appendChild(this.mask.element),this.element.appendChild(n);const s=document.createElementNS(t,"filter");s.setAttribute("id",`${r}Blur`);const a=document.createElementNS(t,"feGaussianBlur");s.appendChild(a),n.appendChild(s);const o=document.createElementNS(t,"linearGradient");o.setAttribute("id",`${r}Gradient`),o.setAttribute("x1",0),o.setAttribute("x2",0),o.setAttribute("y1",0),o.setAttribute("y2",1);let c=document.createElementNS(t,"stop");c.setAttribute("offset","0%"),o.appendChild(c),c=document.createElementNS(t,"stop"),c.setAttribute("offset","100%"),o.appendChild(c),n.appendChild(o);const u=document.createElementNS(t,"g");u.setAttribute("width","100%"),u.setAttribute("height","100%"),u.setAttribute("mask",`url(#${r}Mask)`),this.element.appendChild(u);const l=document.createElementNS(t,"rect");l.classList.add("background"),l.setAttribute("width","100%"),l.setAttribute("height","100%"),l.setAttribute("fill",`url(#${r}Gradient)`),u.appendChild(l);const d=document.createElementNS(t,"circle");d.setAttribute("id",`${r}LoaderCircle`),d.setAttribute("class","loader"),d.setAttribute("cx",0),d.setAttribute("cy",0),d.setAttribute("r",20),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-dasharray",2*Math.PI*parseInt(d.getAttribute("r"),10)),d.setAttribute("stroke-dashoffset",d.getAttribute("stroke-dasharray")),d.setAttribute("stroke-width",8),d.setAttribute("stroke","black"),d.setAttribute("fill","transparent"),d.setAttribute("mask",`url(#${r}Mask)`),this.element.appendChild(d),Object.defineProperty(this,"outerRadius",{enumerable:!0,get:()=>this.mask.outerRadius,set:t=>{this.mask.outerRadius=t}}),Object.defineProperty(this,"innerRadius",{enumerable:!0,get:()=>this.mask.innerRadius,set:t=>{this.mask.innerRadius=t}}),Object.defineProperty(this,"blur",{enumerable:!0,get:()=>a.getAttribute("stdDeviation"),set:t=>a.setAttribute("stdDeviation",t)}),Object.defineProperty(this,"width",{enumerable:!0,get:()=>this.element.getAttribute("width"),set:t=>{this.element.setAttribute("width",Math.floor(t)),this.mask.width=Math.floor(t),d.setAttribute("cx",Math.floor(t/2)),d.setAttribute("transform",`rotate(-90, ${d.getAttribute("cx")}, ${d.getAttribute("cy")})`)}}),Object.defineProperty(this,"height",{enumerable:!0,get:()=>this.element.getAttribute("height"),set:t=>{this.element.setAttribute("height",Math.floor(t)),this.mask.height=Math.floor(t),d.setAttribute("cy",Math.floor(t/2)),d.setAttribute("transform",`rotate(-90, ${d.getAttribute("cx")}, ${d.getAttribute("cy")})`)}});let m,h=0;Object.defineProperty(this,"loader",{enumerable:!0,get:()=>h,set:t=>{h=t,d.setAttribute("stroke-opacity",h),d.setAttribute("stroke-dashoffset",parseFloat(d.getAttribute("stroke-dasharray"))*(1-h))}}),Object.defineProperty(this,"className",{enumerable:!0,get:()=>m,set:t=>{this.element.classList.remove(m),m=t,this.element.classList.add(m)}})}}const n=/(at\s|@)(?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?$/,s=()=>((()=>(new Error).stack.split("\n").slice(1).filter((t=>n.test(t))).map((t=>t.match(n))).map((t=>Object.assign({},{name:t[2],fileName:t[3],lineNumber:t[4],columnNumber:t[5]}))))().find((t=>t.fileName))||{}).fileName,a=(t,e,i,r,n,s,a,o)=>{const c=n-r;let u,l;const d={};d[e]=r,Object.assign(t,d);const m=function n(a){l=a-u;const d={};d[e]=i(l,r,c,s),Object.assign(t,d),l<s?requestAnimationFrame(n.bind(this)):(d[e]=r+c,Object.assign(t,d),o&&o.call())},h=function t(e){l=e-u,l<(a||0)?requestAnimationFrame(t.bind(this)):(u=e,requestAnimationFrame(m.bind(this)))};requestAnimationFrame((t=>{u=t,h.call(window,t)}))};if(a.easingInOut=(t,e,i,r)=>{let n=t/(r/2);return n<1?i/2*n*n+e:(n-=1,-i/2*(n*(n-2)-1)+e)},"serviceWorker"in navigator){const t=s().replace(/scripts\/[^/]+\.js$/,"sw.js");navigator.serviceWorker.register(t).then((()=>{}))}!function(t,e,i,r,n,s,a){t.GoogleAnalyticsObject=n,t[n]=t[n]||function(){(t[n].q=t[n].q||[]).push(arguments)},t[n].l=1*new Date,s=e.createElement(i),a=e.getElementsByTagName(i)[0],s.async=1,s.src="https://www.google-analytics.com/analytics.js",a.parentNode.insertBefore(s,a)}(window,document,"script",0,"ga"),ga("create","UA-101946239-1","auto");const o={},c=document.querySelector('[rel="home"]').getAttribute("href"),u=document.querySelector('[rel="canonical"]').getAttribute("href").replace(c,"/"),l=document.URL.replace(new RegExp(`${u}$`,"i"),"/");let d,m,h,b,p;const A=()=>{const t=document.querySelector("h1").getBoundingClientRect();m=window.innerWidth,h=window.innerHeight,b=t.top,p=t.left;const e=.01*h;document.documentElement.style.setProperty("--vh",`${e}px`)},g=(t,e,i)=>{d||(d=new r,d.blur=3,d.innerRadius=0,d.outerRadius=1,d.width=m,d.height=h,d.x=b,d.y=p,d.text=e,i||(d.className=t),document.body.appendChild(d.element))},f=function(t,e,i){e&&A();const r=o[t],n=document.querySelector(".container"),s=document.querySelector("main");if(!e){document.querySelector("h1").innerHTML=r.title,n.setAttribute("id",r.id),document.querySelector('[rel="canonical"]').setAttribute("href",r.canonical),s.innerHTML=r.content}(e||i)&&Array.prototype.slice.call(s.querySelectorAll('[rel="noopener"]')).forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault(),ga("send","event","outbound","click",t.href,{transport:"beacon",hitCallback:()=>{document.location=t.href}})}))})),document.title=r.documentTitle;const c=document.createElement("div");document.querySelector("main").appendChild(c),g(r.id,"",e),n.classList.add(r.id),e&&window.history.replaceState(r,r.documentTitle,`${l}${t.substring(1)}`),i&&window.history.pushState(r,r.documentTitle,`${l}${t.substring(1)}`),ga("send","pageview",document.location.pathname),a(d.mask,"innerRadius",a.easingInOut,0,1,500,0,(()=>{(()=>{d.element.parentNode.removeChild(d.element),d=null})()}))},y=function(t,e,i){g(t,e),d.loader=0,a(d.mask,"innerRadius",a.easingInOut,1,0,500,0,(()=>{const t=document.querySelector(".container");t.classList.remove(t.getAttribute("id")),t.removeAttribute("id"),i&&i.call(this)}))},w=function(t,e){const i=t.querySelector('[rel="canonical"]').getAttribute("href"),r=i.replace(c,"/"),n=t.querySelector("main"),s={id:t.querySelector(".container").getAttribute("id"),title:t.querySelector("h1").innerHTML,documentTitle:t.querySelector("title").textContent,content:n.innerHTML,canonical:i,url:r};o[r]=s,f(r,t===document,e)};w(document),window.addEventListener("DOMContentLoaded",(()=>{window.addEventListener("resize",A),A()}));window.addEventListener("popstate",(t=>{const e=o[t.state.url];y(e.id,e.documentTitle,(()=>{f(e.url)}))}));Array.prototype.slice.call(document.querySelector("nav ol").querySelectorAll("a")).forEach((t=>{t.addEventListener("click",(e=>{e.preventDefault(),document.getElementById("toggle").checked=!1,window.scrollTo(0,0),t.href!==document.URL&&y(t.getAttribute("data-id"),t.textContent,(()=>{const e=t.href.replace(c,"/");o[e]?f(e,!1,!0):a(d,"loader",a.easingInOut,0,1,500,0,(()=>{const e=new XMLHttpRequest;e.addEventListener("readystatechange",(()=>{if(4===e.readyState&&200===e.status){const t=document.implementation.createHTMLDocument("");t.documentElement.innerHTML=e.responseText,w(t,!0)}})),e.open("GET",t.href),e.send()}))}))}))}));
