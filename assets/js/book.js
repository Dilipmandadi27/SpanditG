/* 3-step booking: 1 visit type -> 2 details & slot -> 3 advance payment */
(function(){
  const S={type:'New Consultation',slot:''};let step=1;
  const TYPES=[['New Consultation','First visit: puja booking, Kundli, Vastu or any guidance.'],['Follow Up','Already consulted us? Continue with the same panditji.'],['Reschedule','Move an existing booking to a new date or time.']];
  $('vt').innerHTML=TYPES.map((t,i)=>`<button type="button" data-t="${t[0]}" class="${i?'':'on'}"><b>${t[0]}</b><span>${t[1]}</span></button>`).join('');
  const sel=new URLSearchParams(location.search).get('type');if(sel)[...$('b-cer').options].forEach(o=>{if(o.text===sel)o.selected=true});
  $('vt').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.type=b.dataset.t;[...$('vt').children].forEach(x=>x.classList.toggle('on',x===b));
    $('b-prev').hidden=S.type==='New Consultation';$('b-prevl').textContent=S.type==='Reschedule'?'Original booking date / reference':'Date of previous consultation'};
  const times=['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM'];
  $('slots').innerHTML=times.map(t=>`<button type="button">${t}</button>`).join('');
  $('slots').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.slot=b.textContent;[...$('slots').children].forEach(x=>x.classList.toggle('on',x===b))};
  $('b-date').min=new Date().toISOString().slice(0,10);
  const go=n=>{step=n;document.querySelectorAll('.bk .pane').forEach((p,i)=>p.classList.toggle('on',i+1===n));document.querySelectorAll('.stepper b').forEach((b,i)=>b.classList.toggle('on',i+1===n));$('b-msg').textContent='';if(n===3)pay();scrollTo({top:0,behavior:'smooth'})};
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const n=+b.dataset.go;
    if(n===3){if(!$('b-name').value.trim()||$('b-phone').value.replace(/\D/g,'').length<10)return $('b-msg').textContent='Please add your name and a valid 10-digit phone number.';
      if(!$('b-date').value||!S.slot)return $('b-msg').textContent='Please choose a date and a time slot.'}
    go(n)});
  function qr(c,seed){const N=29,x=c.getContext('2d');c.width=c.height=N*8;x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.fillStyle='#000';let s=seed;const r=()=>(s=(s*1664525+1013904223)>>>0)/4294967296;
    const fin=(a,b)=>{x.fillRect(a*8,b*8,56,56);x.fillStyle='#fff';x.fillRect(a*8+8,b*8+8,40,40);x.fillStyle='#000';x.fillRect(a*8+16,b*8+16,24,24)};
    for(let i=0;i<N;i++)for(let j=0;j<N;j++){const inF=(i<8&&j<8)||(i>N-9&&j<8)||(i<8&&j>N-9);if(!inF&&r()>.5)x.fillRect(i*8,j*8,8,8)}
    fin(0,0);fin(N-7,0);fin(0,N-7)}
  function pay(){const q=$('qrbox');q.innerHTML=CFG.qr?`<img src="${CFG.qr}" alt="Payment QR">`:'<canvas></canvas>';if(!CFG.qr)qr(q.firstChild,Date.now()%99991);
    $('upi').textContent=CFG.upi;$('amt').min=CFG.min;if(+$('amt').value<CFG.min)$('amt').value=CFG.min;$('minl').textContent=CFG.min;$('sample').hidden=!!CFG.qr}
  $('b-pay').onclick=()=>{const amt=+$('amt').value,utr=$('utr').value.trim();
    if(!(amt>=CFG.min))return $('b-msg2').textContent='Minimum advance is ₹'+CFG.min+'.';
    if(utr.length<6)return $('b-msg2').textContent='Please enter the UPI transaction / reference number after paying.';
    const id='SPG'+Date.now().toString(36).toUpperCase(),b={id,type:S.type,name:$('b-name').value.trim(),phone:$('b-phone').value.trim(),cer:$('b-cer').value,mode:$('b-mode').value,city:$('b-city').value.trim(),date:$('b-date').value,slot:S.slot,prev:$('b-prevv').value.trim(),note:$('b-note').value.trim(),amt,utr,at:new Date().toISOString()};
    try{const a=JSON.parse(localStorage.getItem('spg_bookings')||'[]');a.unshift(b);localStorage.setItem('spg_bookings',JSON.stringify(a))}catch(e){}
    const m=`Namaste, booking request ${id}\n${b.type}: ${b.cer}\nName: ${b.name}\nPhone: ${b.phone}\nMode: ${b.mode} ${b.city}\nDate: ${b.date} ${b.slot}\n${b.prev?'Previous: '+b.prev+'\n':''}Advance paid: ₹${amt} (Ref ${utr})\nNote: ${b.note||'-'}`;
    document.querySelectorAll('.bk .pane').forEach(p=>p.classList.remove('on'));$('done').classList.add('on');
    $('done').innerHTML=`<h3>Thank you, ${b.name.split(' ')[0]} 🙏</h3><p>Your request <b>${id}</b> is recorded. We will verify your ₹${amt} payment and call you to confirm. To speed things up, send the details on WhatsApp.</p><a class="btn" target="_blank" rel="noopener" href="https://wa.me/${CFG.wa}?text=${encodeURIComponent(m)}">Send on WhatsApp</a>`;
    document.querySelectorAll('.stepper b').forEach(x=>x.classList.add('on'))};
})();
