// ── STARS ──
function initStars(){
  const c=document.getElementById('stars'),x=c.getContext('2d');
  let W,H,s=[];
  const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight;};
  addEventListener('resize',rs);rs();
  for(let i=0;i<140;i++) s.push({x:Math.random()*W,y:Math.random()*H,r:.4+Math.random()*1.3,a:Math.random(),da:.002+Math.random()*.005,dir:Math.random()>.5?1:-1});
  (function L(){x.clearRect(0,0,W,H);s.forEach(p=>{p.a+=p.da*p.dir;if(p.a>1||p.a<0)p.dir*=-1;x.globalAlpha=p.a*.55;x.fillStyle='#F9B8D8';x.beginPath();x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fill();});x.globalAlpha=1;requestAnimationFrame(L);})();
}

// ── PETALS ──
function initPetals(){
  const c=document.getElementById('petals'),x=c.getContext('2d');
  let W,H,ps=[];
  const rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight;};
  addEventListener('resize',rs);rs();
  function P(){this.reset=()=>{this.x=Math.random()*W;this.y=-20;this.r=2.5+Math.random()*5;this.vy=.4+Math.random()*.9;this.vx=(Math.random()-.5)*.6;this.sp=(Math.random()-.5)*.03;this.a=Math.random()*Math.PI*2;this.o=.2+Math.random()*.35;};this.reset();}
  for(let i=0;i<22;i++){const p=new P();p.y=Math.random()*H;ps.push(p);}
  (function L(){x.clearRect(0,0,W,H);ps.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.a+=p.sp;if(p.y>H+20)p.reset();x.save();x.translate(p.x,p.y);x.rotate(p.a);x.globalAlpha=p.o;x.beginPath();x.ellipse(0,0,p.r,p.r*1.65,0,0,Math.PI*2);x.fillStyle='#F9B8D8';x.fill();x.restore();});requestAnimationFrame(L);})();
}

// ── CURSOR ──
function initCursor(){
  const emojis=['🌸','💗','✨','🌹','⭐'];let last=0;
  const spawn=(x,y)=>{const el=document.createElement('div');el.className='cursor-heart';el.textContent=emojis[Math.floor(Math.random()*emojis.length)];el.style.cssText=`left:${x-10}px;top:${y-10}px;`;document.body.appendChild(el);setTimeout(()=>el.remove(),900);};
  document.addEventListener('mousemove',e=>{const n=Date.now();if(n-last<100)return;last=n;spawn(e.clientX,e.clientY);});
  document.addEventListener('touchmove',e=>{const n=Date.now();if(n-last<160)return;last=n;const t=e.touches[0];spawn(t.clientX,t.clientY);},{passive:true});
}

// ── PROGRESS ──
function initProgress(){
  window.addEventListener('scroll',()=>{
    const p=(scrollY/(document.documentElement.scrollHeight-innerHeight))*100;
    const bar=document.getElementById('progress-bar');if(bar)bar.style.width=p+'%';
  });
}

// ── SCROLL REVEAL ──
function initReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*90);obs.unobserve(e.target);}});
  },{threshold:.1});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el=>obs.observe(el));
  return obs;
}

// ── PARTICLES ──
function spawnParticles(emoji,count){
  for(let i=0;i<count;i++){
    const el=document.createElement('div');el.className='particle';el.textContent=emoji;
    el.style.cssText=`left:${Math.random()*100}vw;top:100vh;font-size:${12+Math.random()*14}px;`;
    document.body.appendChild(el);
    el.animate([{transform:'translateY(0) rotate(0)',opacity:1},{transform:`translateY(-${280+Math.random()*350}px) rotate(${Math.random()*360}deg)`,opacity:0}],{duration:900+Math.random()*700,delay:Math.random()*350,easing:'ease-out'}).onfinish=()=>el.remove();
  }
}

// ── PAGE TRANSITION ──
const TRANSITIONS=['slide','fade','flip','zoom'];
let transIdx=0;

function navigateTo(url){
  const type=TRANSITIONS[transIdx%TRANSITIONS.length];transIdx++;
  const overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:9999;pointer-events:all;display:flex;align-items:center;justify-content:center;overflow:hidden;';

  if(type==='slide'){
    overlay.style.background='#E91E8C';
    overlay.style.transform='translateX(-100%)';
    overlay.style.transition='transform .5s cubic-bezier(.77,0,.18,1)';
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>{overlay.style.transform='translateX(0)';});
    setTimeout(()=>window.location.href=url,520);

  }else if(type==='fade'){
    overlay.style.background='#FFF0F8';
    overlay.style.opacity='0';overlay.style.transition='opacity .5s ease';
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.style.opacity='1');
    setTimeout(()=>window.location.href=url,520);

  }else if(type==='flip'){
    overlay.style.background='linear-gradient(135deg,#E91E8C,#FDE8F3)';
    overlay.style.transform='perspective(1200px) rotateY(90deg)';
    overlay.style.transition='transform .55s cubic-bezier(.77,0,.18,1)';
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.style.transform='perspective(1200px) rotateY(0deg)');
    setTimeout(()=>window.location.href=url,580);

  }else{
    overlay.style.background='#FDE8F3';
    overlay.style.transform='scale(0)';overlay.style.borderRadius='50%';
    overlay.style.transition='transform .55s cubic-bezier(.77,0,.18,1),border-radius .55s';
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>{overlay.style.transform='scale(4)';overlay.style.borderRadius='0';});
    setTimeout(()=>window.location.href=url,580);
  }
}

// ── MUSIC ──
function initMusic(autoplay){
  const bar=document.getElementById('music-bar');
  const audio=document.getElementById('audioEl');
  if(!bar||!audio)return;
  bar.classList.add('show');
  if(autoplay){audio.play().catch(()=>{});}
  let playing=!!autoplay;
  const vinyl=document.getElementById('vinyl');
  const icon=document.getElementById('music-icon');
  if(playing&&vinyl)vinyl.classList.add('spin');
  window.toggleMusic=function(){
    if(playing){audio.pause();if(vinyl)vinyl.classList.remove('spin');if(icon)icon.innerHTML='<polygon points="5,3 19,12 5,21" fill="white"/>';}
    else{audio.play();if(vinyl)vinyl.classList.add('spin');if(icon)icon.innerHTML='<rect x="6" y="5" width="4" height="14" fill="white"/><rect x="14" y="5" width="4" height="14" fill="white"/>';}
    playing=!playing;
  };
}

// ── HUD ──
function initHUD(activeChapter){
  const hud=document.getElementById('quest-hud');
  if(!hud)return;
  hud.classList.add('show');
  for(let i=0;i<4;i++){
    const d=document.getElementById(`dot-${i}`);if(!d)continue;
    if(i<activeChapter)d.classList.add('done');
    else if(i===activeChapter)d.classList.add('active');
  }
}

// ── PAGE ENTRY ANIMATION ──
function pageEntryAnimation(type){
  document.body.style.opacity='0';
  if(type==='slide'){document.body.style.transform='translateX(60px)';}
  else if(type==='flip'){document.body.style.transform='perspective(800px) rotateY(15deg)';document.body.style.opacity='0';}
  else if(type==='zoom'){document.body.style.transform='scale(.93)';}
  document.body.style.transition='opacity .6s ease, transform .6s cubic-bezier(.34,1.2,.64,1)';
  requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.body.style.opacity='1';document.body.style.transform='none';});});
}
