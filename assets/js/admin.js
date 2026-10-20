(function(){
  const gate=$('login'),panel=$('panel');
  const unlock=()=>{gate.hidden=true;panel.hidden=false;fill()};
  if(ADMIN)unlock();
  $('login').onsubmit=e=>{e.preventDefault();if($('pw').value===CFG.pass){sessionStorage.setItem('spg_admin','1');location.reload()}else $('gmsg').textContent='Wrong passcode.'};
  const save=o=>{const c=Object.assign({},JSON.parse(localStorage.getItem('spg_cfg')||'{}'),o);localStorage.setItem('spg_cfg',JSON.stringify(c))};
  function fill(){['upi','min','phone','email','wa','ig','fb','yt'].forEach(k=>$('c-'+k).value=CFG[k]);if(CFG.qr)$('qrprev').src=CFG.qr;
    const a=JSON.parse(localStorage.getItem('spg_bookings')||'[]');$('bk').innerHTML=a.length?a.map(b=>`<tr><td>${b.id}</td><td>${b.type}</td><td>${b.name}<br>${b.phone}</td><td>${b.cer}</td><td>${b.date} ${b.slot}</td><td>₹${b.amt}<br>${b.utr}</td></tr>`).join(''):'<tr><td colspan=6>No bookings yet on this browser.</td></tr>'}
  $('c-qr').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{save({qr:r.result});$('qrprev').src=r.result;$('amsg').textContent='QR saved.'};r.readAsDataURL(f)};
  $('qrclear').onclick=()=>{save({qr:''});$('qrprev').removeAttribute('src');$('amsg').textContent='QR reset to sample.'};
  $('save').onclick=()=>{const o={};['upi','phone','email','wa','ig','fb','yt'].forEach(k=>o[k]=$('c-'+k).value.trim());o.min=Math.max(500,+$('c-min').value||500);if($('c-pass').value)o.pass=$('c-pass').value;save(o);$('amsg').textContent='Settings saved. Reload other pages to see changes.'};
  $('logout').onclick=()=>{sessionStorage.removeItem('spg_admin');location.href='index.html'};
})();
