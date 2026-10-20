/* SPanditG site core: config, layout, effects, data-driven sections */
const DEF={wa:'918552923132',phone:'+91 8552923132',email:'swarnamandaracharya@gmail.com',upi:'spanditg@upi',min:500,qr:'',ig:'#',fb:'#',yt:'#',pass:'admin123'};
const CFG=Object.assign({},DEF,(()=>{try{return JSON.parse(localStorage.getItem('spg_cfg')||'{}')}catch(e){return{}}})());
const ADMIN=sessionStorage.getItem('spg_admin')==='1';
if(!ADMIN)document.body.classList.add('noup');
const $=id=>document.getElementById(id);
const PAGES=[['index.html','Home'],['services.html','Services'],['kundli.html','Free Kundli'],['about.html','About'],['reviews.html','Reviews'],['gallery.html','Gallery'],['contact.html','Contact']];
const cur=location.pathname.split('/').pop()||'index.html';
const POS=['left top','right center','center bottom','left center','right top','center','left bottom','right bottom'];
const slot=(key,ph,label,i=0,def='assets/img/hero.jpg',pos)=>`<figure class="slot" data-key="${key}" data-ph="${ph}" data-label="${label}" data-def="${def}" style="--pos:${pos||POS[i%8]}"></figure>`;
const PIMG=[['assets/img/pandits/suresh.jpg','left 14%'],['assets/img/pandits/saurabh.jpg','center 24%'],['assets/img/pandits/rajnish.jpg','center 14%'],['assets/img/pandits/rakesh.jpg','center 22%'],['assets/img/pandits/bhupendra.jpg','center 30%']];
const GIMG=[['assets/img/gallery/pind-dan.jpg','center'],['assets/img/gallery/asthi-pooja.jpg','center 40%'],['assets/img/gallery/gauri-ganpati.jpg','center 42%'],['assets/img/gallery/satyanarayan.jpg','center 38%'],['assets/img/gallery/karna-vedh.jpg','center 58%'],['assets/img/gallery/vedarambh.jpg','center 52%'],['assets/img/gallery/swastik.jpg','center 55%']];
const SVCIMG=[['assets/img/services/satyanarayan.jpg','center'],['assets/img/services/griha.jpg','center'],['assets/img/services/havan.jpg','center 60%'],['assets/img/services/vivah.jpg','center 72%'],['assets/img/services/rudra.jpg','center 55%'],['assets/img/services/jyotish.jpg','center 62%']];

/* background: looping video + canvas celestial effect */
(function(){
  const d=document.createElement('div');d.id='bgfx';
  d.innerHTML='<div class="fb"></div><video autoplay muted loop playsinline preload="auto" src="assets/video/celestial.mp4"></video><canvas></canvas>';
  document.body.prepend(d);
  const v=d.querySelector('video');v.addEventListener('error',()=>v.remove());v.play&&v.play().catch(()=>{});
  const s=document.createElement('div');s.id='spot';document.body.append(s);
  addEventListener('pointermove',e=>{s.style.setProperty('--mx',e.clientX+'px');s.style.setProperty('--my',e.clientY+'px');s.classList.add('on')});
  document.addEventListener('pointerleave',()=>s.classList.remove('on'));
})();

/* header + footer */
(function(){
  const h=document.createElement('header');h.className='nav';
  h.innerHTML=`<div class="wrap"><a class="logo gold" href="index.html">SPanditG</a><nav aria-label="Main"><ul id="nl">${PAGES.map(p=>`<li><a href="${p[0]}" class="${p[0]===cur?'on':''}">${p[1]}</a></li>`).join('')}</ul></nav><div style="display:flex;gap:10px;align-items:center"><a class="btn sm" href="book.html">Book Now</a><button class="menu" aria-label="Menu" type="button">MENU</button></div></div>`;
  document.body.prepend(h);
  h.querySelector('.menu').onclick=()=>$('nl').classList.toggle('open');
  const f=document.createElement('footer');
  f.innerHTML=`<div class="fbg"></div><div class="wrap"><div class="fg glass">
   <div><div class="logo gold" style="font-size:1.8rem">SPanditG</div><p style="margin-top:12px">An online pandit booking service for puja, havan, wedding, Vastu and Jyotish. Authentic Vedic rituals by experienced panditjis, at your home, on time. Your faith, our guidance.</p>
   <div class="soc"><a href="${CFG.ig}" aria-label="Instagram">IG</a><a href="${CFG.fb}" aria-label="Facebook">FB</a><a href="${CFG.yt}" aria-label="YouTube">YT</a><a href="https://wa.me/${CFG.wa}" aria-label="WhatsApp" target="_blank" rel="noopener">WA</a></div></div>
   <div><h4>Quick Links</h4><ul>${PAGES.map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join('')}<li><a href="book.html">Book Appointment</a></li></ul></div>
   <div><h4>Popular Poojas</h4><ul><li><a href="services.html">Satyanarayan Katha</a></li><li><a href="services.html">Griha Pravesh</a></li><li><a href="services.html">Havan</a></li><li><a href="services.html">Rudrabhishek</a></li><li><a href="services.html">Vastu &amp; Jyotish</a></li></ul></div>
   <div><h4>Contact</h4><ul><li>${CFG.phone}</li><li style="overflow-wrap:anywhere">${CFG.email}</li><li>Mumbai, Maharashtra</li></ul></div></div>
   <div class="copy"><span class="shloka" style="font-size:1.1rem;letter-spacing:0">॥ सर्वे भवन्तु सुखिनः ॥</span><br>© ${new Date().getFullYear()} SPanditG · <a href="admin.html">Admin</a></div></div>`;
  document.body.append(f);
  if(ADMIN){const a=document.createElement('a');a.className='admin-tag';a.href='admin.html';a.textContent='ADMIN MODE · IMAGE EDIT ON';document.body.append(a)}
})();

/* mandala backgrounds */
function mandalaSVG(){const st='stroke="#d9b36a" fill="none"';let h='';
  [198,186,150,118,86,56,30].forEach((r,i)=>h+=`<circle r="${r}" ${st} stroke-width="${i%2?.5:1.1}" ${i==3?'stroke-dasharray="2 5"':''}/>`);
  [[16,176,14,40],[12,138,18,44],[8,100,22,50],[8,60,14,34]].forEach(([n,r,w,l])=>{h+=`<g ${st} stroke-width=".8">`;for(let i=0;i<n;i++)h+=`<ellipse rx="${w}" ry="${l}" transform="rotate(${i*360/n}) translate(0,-${r})"/>`;h+='</g>'});
  for(let i=0;i<36;i++){const a=i*10*Math.PI/180;h+=`<line x1="${Math.cos(a)*186}" y1="${Math.sin(a)*186}" x2="${Math.cos(a)*198}" y2="${Math.sin(a)*198}" ${st} stroke-width=".6"/>`}
  return h}
document.querySelectorAll('[data-mandala]').forEach(sec=>{
  const pos={l:'width:min(90vw,720px);left:-18%;top:-8%',r:'width:min(70vw,520px);right:-12%;bottom:-14%',c:'width:min(100vw,860px);left:50%;top:50%;translate:-50% -50%'};
  [...sec.dataset.mandala].forEach((k,i)=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','mandala'+(i?' rev':''));s.setAttribute('viewBox','-200 -200 400 400');s.setAttribute('style',pos[k]);s.setAttribute('aria-hidden','true');s.innerHTML=mandalaSVG();sec.prepend(s)});
});
/* section videos (e.g. mandala loop behind contact) */
document.querySelectorAll('[data-vid]').forEach(sec=>{sec.classList.add('vidsec');const v=document.createElement('video');Object.assign(v,{muted:true,loop:true,autoplay:true,playsInline:true,src:'assets/video/'+sec.dataset.vid});v.setAttribute('muted','');v.addEventListener('error',()=>v.remove());sec.prepend(v);v.play&&v.play().catch(()=>{})});

/* ticker */
document.querySelectorAll('.ticker').forEach(t=>{
  const en=['Satyanarayan Katha','Griha Pravesh','Havan','Vivah','Rudrabhishek','Vastu Puja','Jyotish','Navgraha Shanti'],hi=['सत्यनारायण कथा','गृह प्रवेश','हवन','विवाह संस्कार','रुद्राभिषेक','वास्तु पूजा','ज्योतिष','नवग्रह शांति'];
  const row=(a,c)=>{const s=a.map(x=>`<span>${x}</span><i>✦</i>`).join('');return `<div class="row ${c}">${s}${s}${s}${s}</div>`};t.innerHTML=row(en,'')+row(hi,'r2')});

/* data */
const SERVICES=[['Satyanarayan Katha','A calm, traditional katha for family gatherings, new beginnings and thanksgiving.','SK'],['Griha Pravesh','A house-warming puja to bless your new home with peace and good energy.','GP'],['Havan','The sacred fire ritual, with Vedic mantras, for health, success and purity.','HV'],['Wedding (Vivah)','Complete wedding rituals, guided step by step with the right mantras.','VV'],['Rudrabhishek','Abhishek of Lord Shiva with Vedic chanting, for peace and strength.','RA'],['Jyotish & Vastu','Birth chart guidance, and Vastu advice for your home, office or shop.','JV']];
const PANDITS=['Suresh Shastri','Pandit Saurabh Shastri','Pandit Rajnish Sharma','Pandit Rakesh','Bhupendra Guruji'];
const DEEP=[['Detailed','Full Life Reading','Career, marriage, money and health outlook','Full life reading (career, marriage, money, health)'],['Detailed','Dasha & Remedies','Your planet periods and simple remedies','Dasha report and remedies'],['Detailed','Kundli Matching','Match two charts for marriage','Kundli matching for marriage'],['Detailed','Muhurat','Best date and time for your ceremony','Muhurat (best date and time) for a puja or wedding'],['Detailed','Vastu Consultation','Home, office or shop energy balance','Vastu consultation (home, office or shop)'],['Personal','Ask Panditji','Talk to Suresh Shastri directly','I want to ask a question to the panditji']];
const TESTI=[['Priya Deshmukh','Vashi','Booked a Griha Pravesh at the last minute. Panditji arrived 20 minutes early with all the samagri and explained every mantra. My parents were so happy.'],['Rohit & Neha Sharma','Thane','Our wedding rituals were guided beautifully, step by step. Guests kept asking who our pandit was.'],['Anjali Kulkarni','Pune','Satyanarayan Katha at home went smoothly. Calm, devoted and never rushed. Will book every year.'],['Mahesh Patil','Panvel','The Rudrabhishek was so peaceful. You could feel the difference in the house afterwards.'],['Sunita Agarwal','Mumbai','Kundli matching was honest and clear. No fear tactics, just practical remedies. Thank you!'],['Vikram Joshi','Nashik','Booking was easy and payment simple. The pandit called a day before to confirm everything.'],['Kavita Nair','Navi Mumbai','Vastu advice for our new shop was practical and affordable. Business has picked up since.'],['Deepak Mishra','Delhi','Did a Havan online follow-up consultation. Patient answers to all my questions.'],['Shweta Rane','Kalyan','Rescheduling was effortless. They moved our puja date without any fuss.'],['Amit Trivedi','Ahmedabad','Authentic pronunciation of mantras and a very warm nature. Highly recommended.'],['Meera Iyer','Bengaluru','Booked a Navgraha Shanti puja for my father. Everything was explained so we could follow along.'],['Harish Gupta','Lucknow','Fair pricing, no hidden charges, and the pandit was punctual. Exactly what we needed.']];
const BEST=[['Ritu Malhotra','"Best pandit service in Mumbai. Professional, punctual and truly devoted."'],['Sandeep Pawar','"Panditji explained the meaning behind each ritual. Felt very spiritual."'],['Pooja Bhatt','"Smooth booking, great communication, and a beautiful Satyanarayan puja."']];
const FAQ=[['How do I book a pandit?','Open the Book page, pick your visit type, choose a date and slot, and pay a small advance (minimum ₹500) to confirm. We will call you to finalise details.'],['What is the advance payment for?','It holds your slot and the pandit. It is adjusted against the final dakshina. The minimum is ₹500.'],['Can I reschedule or cancel?','Yes. Choose "Reschedule" in the booking steps and share your original date. Please reschedule at least 24 hours before.'],['Is puja samagri included?','We can arrange the full samagri list for you, or share the list if you prefer to buy it yourself.'],['Do you serve areas outside Mumbai?','Yes, Navi Mumbai, Thane, Pune and nearby cities. For other cities, online consultation is available.'],['How accurate is the free Kundli?','It uses the Lahiri system with about 1 degree accuracy. It is a guide, not a full reading. For depth, talk to our Panditji.'],['Can I get an online consultation?','Yes. Pick "New Consultation" or "Follow Up" and choose online as the mode.'],['Which languages do the pandits speak?','Hindi, Marathi, Gujarati and English, plus Sanskrit for mantras.']];
const gl=n=>`<div class="head" data-r>`+n;

/* render sections */
const lim=(el,a)=>a.slice(0,+(el.dataset.n||a.length));
if($('svc'))$('svc').innerHTML=lim($('svc'),SERVICES).map((s,i)=>`<article class="card" data-r><div class="up"><div class="imgbox">${slot('svc-'+(i+1),s[2],'Puja photo',i,SVCIMG[i][0],SVCIMG[i][1])}</div></div><div class="body"><h3>${s[0]}</h3><p>${s[1]}</p><a class="more" href="book.html?type=${encodeURIComponent(s[0])}">Book this pooja →</a></div></article>`).join('');
if($('pandits'))$('pandits').innerHTML=PANDITS.map((n,i)=>`<article class="pandit" data-r><div class="up"><div class="frame">${slot('pandit-'+(i+1),n.replace(/Pandit /,'').split(' ').map(w=>w[0]).join('').slice(0,2),'Pandit photo',i,PIMG[i][0],PIMG[i][1])}</div></div><div><h3>${n}</h3><span class="r">Vedic Rituals</span></div></article>`).join('');
if($('gal'))$('gal').innerHTML=[1,2,3,4,5,6,7].map(i=>`<div class="up" data-r><div class="imgbox">${slot('gal-'+i,'ॐ','Puja photo',i,GIMG[i-1][0],GIMG[i-1][1])}</div></div>`).join('');
if($('prem'))$('prem').innerHTML=DEEP.map((d,i)=>`<div class="pc" data-r><div class="up"><div class="imgbox">${slot('deep-'+(i+1),'✦','Category photo',i+2)}</div></div><a class="wa" data-topic="${d[3]}" target="_blank" rel="noopener"><em>${d[0]}</em><b>${d[1].replace('&','&amp;')}</b><span>${d[2]}</span></a></div>`).join('');
if($('testi')){const c=TESTI.map(t=>`<div class="tcard"><div class="stars">★★★★★</div><p>“${t[2]}”</p><div class="who"><div class="av">${t[0][0]}</div><div><b>${t[0]}</b><br><small>${t[1]}</small></div></div></div>`).join('');$('testi').innerHTML=`<div class="ctrack">${c}${c}</div>`}
if($('rating'))$('rating').innerHTML=`<div class="rate" data-r><div class="gbadge">G</div><div><div class="big">4.9</div><div class="stars">★★★★★</div></div><div><b style="font:500 1.2rem var(--display)">Excellent on Google</b><p class="fine">Based on 1,240+ Google reviews</p></div><a class="btn line sm" href="#" target="_blank" rel="noopener">Read on Google</a></div>`+($('rating').dataset.best?`<div class="best">${BEST.map(b=>`<div class="tcard" data-r><div class="stars">★★★★★</div><p>${b[1]}</p><small>${b[0]} · Google review</small></div>`).join('')}</div>`:'');
if($('faq'))$('faq').innerHTML=lim($('faq'),FAQ).map(f=>`<details class="q" data-r><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');

/* sky canvas (celestial moving effect) */
/* looping galaxy: stars, spiral arms, shooting stars */
function sky(cv,opt){
  const ctx=cv.getContext('2d');let W,H,D,stars=[],gal=[],shoot=null,t=0,vis=true,raf=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){D=Math.min(devicePixelRatio||1,1.5);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*D;cv.height=H*D;
    stars=Array.from({length:Math.round(W*H/5200)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,p:Math.random()*6.28,s:Math.random()*1.5+.4,z:Math.random()*.6+.2}));
    const N=opt.galaxy?(W<700?900:1900):0;
    gal=Array.from({length:N},(_,i)=>{const arm=i%4,r=Math.pow(Math.random(),.62),ang=arm*Math.PI/2+r*5.2+(Math.random()-.5)*.55;
      return{r,ang,o:Math.random()*.7+.2,c:Math.random()<.55?'217,179,106':(Math.random()<.5?'232,120,150':'150,130,235'),sz:Math.random()*1.5+.4}});}
  function frame(){
    raf=0;if(!vis)return;
    t+=reduce?0:.016;
    ctx.setTransform(D,0,0,D,0,0);ctx.clearRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';
    for(const s of stars){const a=.35+.65*Math.abs(Math.sin(t*s.s+s.p));ctx.fillStyle=`rgba(255,240,215,${a*s.z+.1})`;
      const x=(s.x+t*3*s.z)%W;ctx.fillRect(x,s.y,s.r,s.r)}
    if(opt.galaxy){
      const cx=W*(W<800?.5:.72),cy=H*.45,R=Math.min(W,H)*(W<800?.62:.78),tilt=-.35,ct=Math.cos(tilt),st=Math.sin(tilt);
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,R*.45);g.addColorStop(0,'rgba(255,225,160,.55)');g.addColorStop(.25,'rgba(217,150,90,.22)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(cx-R,cy-R,R*2,R*2);
      for(const p of gal){const a=p.ang+t*.09/(p.r*.8+.25);const x=Math.cos(a)*p.r*R,y=Math.sin(a)*p.r*R*.42;
        ctx.fillStyle=`rgba(${p.c},${p.o*(1.05-p.r*.7)})`;ctx.fillRect(cx+x*ct-y*st,cy+x*st+y*ct,p.sz,p.sz)}
    }
    if(!reduce){
      if(!shoot&&Math.random()<.004)shoot={x:Math.random()*W,y:Math.random()*H*.5,l:0};
      if(shoot){shoot.l+=14;const dx=shoot.l*.85,dy=shoot.l*.45;const gr=ctx.createLinearGradient(shoot.x+dx,shoot.y+dy,shoot.x+dx-110,shoot.y+dy-58);
        gr.addColorStop(0,'rgba(255,240,210,.9)');gr.addColorStop(1,'rgba(255,240,210,0)');ctx.strokeStyle=gr;ctx.lineWidth=1.4;ctx.beginPath();
        ctx.moveTo(shoot.x+dx,shoot.y+dy);ctx.lineTo(shoot.x+dx-110,shoot.y+dy-58);ctx.stroke();if(shoot.l>W)shoot=null}
      raf=requestAnimationFrame(frame);
    }
  }
  const start=()=>{if(!raf)raf=requestAnimationFrame(frame)};
  size();frame();
  addEventListener('resize',()=>{size();if(reduce)frame()});
  new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis)start()}).observe(cv);
}
/* image storage for testing: IndexedDB in this browser only */
let db=null;const mem={};
function openDB(){return new Promise(res=>{try{const r=indexedDB.open('spanditg',1);r.onupgradeneeded=()=>r.result.createObjectStore('img');r.onsuccess=()=>{db=r.result;res()};r.onerror=()=>res()}catch(e){res()}})}
function store(mode,fn){return new Promise(res=>{if(!db){res(null);return}try{const q=fn(db.transaction('img',mode).objectStore('img'));q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)}catch(e){res(null)}})}
const getImg=async k=>mem[k]||await store('readonly',s=>s.get(k));
const putImg=async(k,v)=>{mem[k]=v;await store('readwrite',s=>s.put(v,k))};
function shrink(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onerror=rej;fr.onload=()=>{const im=new Image();im.onerror=rej;im.onload=()=>{
  const sc=Math.min(1,1400/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*sc);c.height=Math.round(im.height*sc);
  c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.86))};im.src=fr.result};fr.readAsDataURL(file)})}
function show(slot,src,btn){let img=slot.querySelector('img');
  if(!img){img=document.createElement('img');img.alt='';slot.prepend(img)}img.src=src;slot.classList.add('has');if(btn)btn.firstChild.nodeValue='Change photo'}
function setupSlot(slot){
  const k=slot.dataset.key;
  slot.insertAdjacentHTML('beforeend',`<div class="ph" aria-hidden="true">${slot.dataset.ph||''}</div>`);
  const up=slot.closest('.up');
  const b=document.createElement('label');b.className='upbtn';b.innerHTML=`Upload ${(slot.dataset.label||'photo').toLowerCase()}<input type="file" accept="image/*">`;
  up.appendChild(b);
  b.querySelector('input').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;
    try{const d=await shrink(f);await putImg(k,d);show(slot,d,b)}catch(err){}e.target.value=''});
  getImg(k).then(d=>{if(d)show(slot,d,b);else if(slot.dataset.def)show(slot,slot.dataset.def,b)});
}


sky(document.querySelector('#bgfx canvas'),{galaxy:true});
document.querySelectorAll('.hero canvas').forEach(c=>sky(c,{galaxy:false}));
openDB().then(()=>document.querySelectorAll('.slot').forEach(setupSlot));

/* WhatsApp links for Go-deeper cards (kundli.js overrides with chart data) */
document.querySelectorAll('a.wa').forEach(a=>a.href=`https://wa.me/${CFG.wa}?text=${encodeURIComponent('Namaste Panditji, I want: '+a.dataset.topic)}`);

/* scroll-reveal motion (built in, no external library) */
(function(){
  document.querySelectorAll('.head>*,.hero .glass>*,.about .text>*,.contact>*,.pagehero .wrap>*').forEach(e=>e.setAttribute('data-r',''));
  if(!('IntersectionObserver' in window)||!Element.prototype.animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const els=[...document.querySelectorAll('[data-r]')];
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target;io.unobserve(el);
    const a=el.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'none'}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'});
    a.onfinish=()=>{el.style.opacity=1;el.style.transform='none';a.cancel()}}),{rootMargin:'0px 0px -6% 0px'});
  document.documentElement.classList.add('m');els.forEach(e=>io.observe(e));
  setTimeout(()=>els.forEach(e=>{if(getComputedStyle(e).opacity==='0'&&e.getBoundingClientRect().top<innerHeight){e.style.opacity=1;e.style.transform='none'}}),2500);
})();
