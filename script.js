const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>{loader.style.opacity='0';setTimeout(()=>loader.remove(),700)},500));

const canvas=document.getElementById('space'),ctx=canvas.getContext('2d');
let W,H,dpr,stars=[];
function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:180},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random(),s:Math.random()*0.45+0.08}))}
function frame(){ctx.clearRect(0,0,W,H);for(const p of stars){p.y+=p.s;if(p.y>H)p.y=-2;ctx.fillStyle=`rgba(111,242,208,${.15+p.z*.45})`;ctx.beginPath();ctx.arc(p.x,p.y,p.z*1.2+.2,0,Math.PI*2);ctx.fill()}requestAnimationFrame(frame)}
addEventListener('resize',resize);resize();frame();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));

const core=document.querySelector('.hero-core');
addEventListener('pointermove',e=>{if(innerWidth<900)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;core.style.transform=`translateY(-50%) translate(${x*18}px,${y*18}px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`});

// Reactive cursor, magnetic controls and 3D card response.
const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{
  mx=e.clientX; my=e.clientY;
  if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}
});
function cursorLoop(){
  rx+=(mx-rx)*.16; ry+=(my-ry)*.16;
  if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll('a,.skill-card,.research-card,.project').forEach(el=>{
  el.addEventListener('mouseenter',()=>{if(ring){ring.style.width='52px';ring.style.height='52px';ring.style.borderColor='rgba(111,242,208,.85)'}});
  el.addEventListener('mouseleave',()=>{if(ring){ring.style.width='32px';ring.style.height='32px';ring.style.borderColor='rgba(111,242,208,.5)'}});
});

document.querySelectorAll('.tilt,.skill-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<900)return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateZ(6px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    if(innerWidth<900)return;
    const r=el.getBoundingClientRect(), x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
    el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});

const depth=document.querySelector('.depth-line span');
addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  if(depth) depth.style.transform=`translateY(${(scrollY/Math.max(1,max))*102}px)`;
});
