const rad=Math.PI/180,nm=x=>((x%360)+360)%360;
function julian(y,m,d,h){if(m<=2){y--;m+=12}const A=Math.floor(y/100),B=2-A+Math.floor(A/4);return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5+h/24}
const EL={
 mercury:[0.38709927,0.20563593,7.00497902,252.25032350,77.45779628,48.33076593,0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.12534081],
 venus:[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255,0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418],
 earth:[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0.0,0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0.0],
 mars:[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891,0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],
 jupiter:[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909,-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],
 saturn:[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448,-0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794]};
function helioXY(n,T){const p=EL[n],a=p[0]+p[6]*T,e=p[1]+p[7]*T,I=(p[2]+p[8]*T)*rad,L=p[3]+p[9]*T,w=p[4]+p[10]*T,O=p[5]+p[11]*T;
 let M=nm(L-w);if(M>180)M-=360;const Mr=M*rad;let E=Mr+e*Math.sin(Mr);for(let i=0;i<14;i++)E=E-(E-e*Math.sin(E)-Mr)/(1-e*Math.cos(E));
 const xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E),om=(w-O)*rad,Or=O*rad,co=Math.cos(om),so=Math.sin(om),cO=Math.cos(Or),sO=Math.sin(Or),cI=Math.cos(I);
 return[(co*cO-so*sO*cI)*xp+(-so*cO-co*sO*cI)*yp,(co*sO+so*cO*cI)*xp+(-so*sO+co*cO*cI)*yp]}
const ayanamsa=T=>23.853+1.396971*T;
function moonLon(T){const Lp=218.3164477+481267.88123421*T,D=297.8501921+445267.1114034*T,M=357.5291092+35999.0502909*T,Mp=134.9633964+477198.8675055*T,F=93.2720950+483202.0175233*T,s=x=>Math.sin(x*rad);
 return nm(Lp+6.288774*s(Mp)+1.274027*s(2*D-Mp)+0.658314*s(2*D)+0.213618*s(2*Mp)-0.185116*s(M)-0.114332*s(2*F)+0.058793*s(2*D-2*Mp)+0.057066*s(2*D-M-Mp)+0.053322*s(2*D+Mp)+0.045758*s(2*D-M)-0.040923*s(M-Mp)-0.034720*s(D)-0.030383*s(M+Mp)+0.015327*s(2*D-2*F)-0.012528*s(Mp+2*F)+0.010980*s(Mp-2*F))}
function planetsAt(jd,sid=true){const T=(jd-2451545)/36525,e=helioXY('earth',T),ay=sid?ayanamsa(T):0,pr=1.396971*T,o={};
 o.Su=nm(Math.atan2(-e[1],-e[0])/rad+pr-ay);
 for(const[k,n]of[['Me','mercury'],['Ve','venus'],['Ma','mars'],['Ju','jupiter'],['Sa','saturn']]){const p=helioXY(n,T);o[k]=nm(Math.atan2(p[1]-e[1],p[0]-e[0])/rad+pr-ay)}
 o.Mo=nm(moonLon(T)-ay);o.Ra=nm(125.04452-1934.136261*T-ay);o.Ke=nm(o.Ra+180);return o}
function ascendant(jd,lat,lon,sid=true){const T=(jd-2451545)/36525,th=nm(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T*T+lon),eps=(23.4392911-0.0130042*T)*rad,t=th*rad,ph=lat*rad;
 return nm(Math.atan2(Math.cos(t),-(Math.sin(t)*Math.cos(eps)+Math.tan(ph)*Math.sin(eps)))/rad-(sid?ayanamsa(T):0))}


/* free kundli tools */
(function(){
const WA='918552923132';
const SIGNS=[['Mesha','Aries'],['Vrishabha','Taurus'],['Mithuna','Gemini'],['Karka','Cancer'],['Simha','Leo'],['Kanya','Virgo'],['Tula','Libra'],['Vrishchika','Scorpio'],['Dhanu','Sagittarius'],['Makara','Capricorn'],['Kumbha','Aquarius'],['Meena','Pisces']];
const NAKS=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
const PN={Su:'Sun',Mo:'Moon',Ma:'Mars',Me:'Mercury',Ju:'Jupiter',Ve:'Venus',Sa:'Saturn',Ra:'Rahu',Ke:'Ketu'};
const ORDER=['Su','Mo','Ma','Me','Ju','Ve','Sa','Ra','Ke'];
const CITIES=[['Mumbai',19.076,72.8777],['Navi Mumbai',19.033,73.0297],['Thane',19.2183,72.9781],['Pune',18.5204,73.8567],['Nashik',19.9975,73.7898],['Nagpur',21.1458,79.0882],['Delhi',28.6139,77.209],['Kolkata',22.5726,88.3639],['Chennai',13.0827,80.2707],['Bengaluru',12.9716,77.5946],['Hyderabad',17.385,78.4867],['Ahmedabad',23.0225,72.5714],['Surat',21.1702,72.8311],['Vadodara',22.3072,73.1812],['Rajkot',22.3039,70.8022],['Jaipur',26.9124,75.7873],['Jodhpur',26.2389,73.0243],['Lucknow',26.8467,80.9462],['Kanpur',26.4499,80.3319],['Varanasi',25.3176,82.9739],['Patna',25.5941,85.1376],['Ranchi',23.3441,85.3096],['Bhopal',23.2599,77.4126],['Indore',22.7196,75.8577],['Raipur',21.2514,81.6296],['Chandigarh',30.7333,76.7794],['Amritsar',31.634,74.8723],['Dehradun',30.3165,78.0322],['Guwahati',26.1445,91.7362],['Bhubaneswar',20.2961,85.8245],['Visakhapatnam',17.6868,83.2185],['Kochi',9.9312,76.2673],['Thiruvananthapuram',8.5241,76.9366],['Coimbatore',11.0168,76.9558],['Mysuru',12.2958,76.6394],['Panaji (Goa)',15.4909,73.8278]];
const $=id=>document.getElementById(id);
$('k-place').innerHTML=CITIES.map((c,i)=>`<option value="${i}">${c[0]}</option>`).join('')+'<option value="x">Other place (enter latitude and longitude)</option>';
$('k-place').addEventListener('change',()=>{$('k-manual').hidden=$('k-place').value!=='x'});

const fmt=l=>{const d=l%30,m=Math.floor((d%1)*60);return Math.floor(d)+'°'+String(m).padStart(2,'0')+'′'};
const signOf=l=>Math.floor(l/30);
const nak=l=>{const n=Math.floor(l/(360/27));return{n:NAKS[n],pada:Math.floor((l%(360/27))/(360/108))+1}};
let sample=true,lastSample=true,last=null;

function chartSVG(lagSign,pos){
  const HC=[0,[200,96],[100,40],[40,100],[96,200],[40,300],[100,360],[200,304],[300,360],[360,300],[304,200],[360,100],[300,40]];
  const diamond=h=>h%3===1;
  let s='<svg viewBox="0 0 400 400" role="img" aria-label="North Indian style Kundli chart"><g fill="none" stroke="#d9b36a" stroke-width="1.5"><rect x="2" y="2" width="396" height="396"/><path d="M2 2L398 398M398 2L2 398M200 2L398 200L200 398L2 200Z"/></g>';
  for(let h=1;h<=12;h++){
    const items=(h===1?['As']:[]).concat(ORDER.filter(p=>((signOf(pos[p])-lagSign+12)%12)+1===h));
    const per=diamond(h)?3:2,lines=[];for(let i=0;i<items.length;i+=per)lines.push(items.slice(i,i+per).join(' '));
    const [cx,cy]=HC[h],nx=cx+(200-cx)*.4,ny=cy+(200-cy)*.4,y0=cy-(lines.length-1)*8;
    s+=`<text x="${nx}" y="${ny}" fill="#b8a290" font-size="12" text-anchor="middle" dominant-baseline="central" font-family="Jost,sans-serif">${(lagSign+h-1)%12+1}</text>`;
    lines.forEach((t,i)=>{s+=`<text x="${cx}" y="${y0+i*16}" fill="#f4dca2" font-size="14" text-anchor="middle" dominant-baseline="central" font-family="Jost,sans-serif" font-weight="500">${t}</text>`});
  }
  return s+'</svg>';
}
function table(rows,head){return `<div class="tw"><table class="pt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}

function compute(){
  const dob=$('k-dob').value,tob=$('k-tob').value,msg=$('k-msg');msg.textContent='';
  if(!dob||!tob){msg.textContent='Please enter your date and time of birth.';return null}
  const [y,m,d]=dob.split('-').map(Number),[hh,mm]=tob.split(':').map(Number);
  if(y<1800||y>2050){msg.textContent='These free tools work for birth years 1800 to 2050.';return null}
  let lat,lon,place;
  if($('k-place').value==='x'){lat=parseFloat($('k-lat').value);lon=parseFloat($('k-lon').value);place='Lat '+$('k-lat').value+', Lon '+$('k-lon').value;
    if(!isFinite(lat)||!isFinite(lon)||Math.abs(lat)>66){msg.textContent='Enter latitude and longitude as numbers, for example 19.07 and 72.87.';return null}}
  else{const c=CITIES[+$('k-place').value];lat=c[1];lon=c[2];place=c[0]}
  const tz=parseFloat($('k-tz').value),jd=julian(y,m,d,hh+mm/60-tz);
  const pos=planetsAt(jd),asc=ascendant(jd,lat,lon);
  return{pos,asc,lag:signOf(asc),place,dob,tob,name:$('k-name').value.trim()};
}

function render(r){
  const {pos,asc,lag}=r,moon=pos.Mo,nk=nak(moon);
  $('chips').innerHTML=[['Lagna (Ascendant)',SIGNS[lag][0],SIGNS[lag][1]+' · '+fmt(asc)],['Moon sign (Rashi)',SIGNS[signOf(moon)][0],SIGNS[signOf(moon)][1]],['Nakshatra',nk.n,'Pada '+nk.pada],['Sun sign',SIGNS[signOf(pos.Su)][0],SIGNS[signOf(pos.Su)][1]]]
    .map(c=>`<div class="chip"><small>${c[0]}</small><b>${c[1]}</b><span>${c[2]}</span></div>`).join('');
  const rows=ORDER.map(p=>{const n=nak(pos[p]);return[PN[p],SIGNS[signOf(pos[p])][0],fmt(pos[p]),n.n,((signOf(pos[p])-lag+12)%12)+1]});
  $('pane-kundli').innerHTML=`<div class="kbody"><div class="chart">${chartSVG(lag,pos)}</div>${table(rows,['Planet','Sign','Degree','Nakshatra','House'])}</div>`;
  const now=planetsAt(julian(...(d=>[d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCHours()+d.getUTCMinutes()/60])(new Date())));
  const ms=signOf(moon);
  $('pane-transit').innerHTML=`<p class="fine" style="margin-bottom:12px">Where the planets are today (sidereal). The last column counts the house from your Moon sign.</p>`+
    table(ORDER.map(p=>{const n=nak(now[p]);return[PN[p],SIGNS[signOf(now[p])][0],fmt(now[p]),n.n,((signOf(now[p])-ms+12)%12)+1]}),['Planet','Now in','Degree','Nakshatra','From your Moon']);
  const mh=((signOf(pos.Ma)-lag+12)%12)+1,manglik=[1,2,4,7,8,12].includes(mh);
  const sd=(signOf(now.Sa)-ms+12)%12;
  let ss,ssT;
  if(sd===11){ss=true;ssT='Saturn is in the sign before your Moon sign. This is the first phase of Sade Sati.'}
  else if(sd===0){ss=true;ssT='Saturn is in your Moon sign. This is the middle phase of Sade Sati.'}
  else if(sd===1){ss=true;ssT='Saturn is in the sign after your Moon sign. This is the last phase of Sade Sati.'}
  else ssT='Saturn is not in the 12th, 1st or 2nd sign from your Moon sign right now.';
  const dh=sd===3?'Saturn is also in the 4th sign from your Moon (Dhaiya).':sd===7?'Saturn is also in the 8th sign from your Moon (Dhaiya).':'';
  $('pane-dosha').innerHTML=`<div class="dgrid">
   <div class="verdict ${manglik?'yes':'no'}"><b>Mangal Dosha: ${manglik?'Present':'Not present'}</b><p>Mars is in house ${mh} from your Lagna. ${manglik?'Mars in the 1st, 2nd, 4th, 7th, 8th or 12th house is counted as Mangal Dosha by the common rule. Its strength depends on many other factors, so please check with a panditji before any decision.':'Mars is outside the houses 1, 2, 4, 7, 8 and 12, so the common rule shows no Mangal Dosha.'}</p></div>
   <div class="verdict ${ss?'yes':'no'}"><b>Sade Sati: ${ss?'Running now':'Not running now'}</b><p>${ssT} ${dh}</p></div>
   <p class="fine">For the effect on your life, remedies and timing, use the WhatsApp options below.</p></div>`;
  last=r;lastSample=sample;
}
function waHref(topic){
  let t=`Namaste Panditji, I used the free Kundli tool on SPanditG. I want: ${topic}.`;
  if(last&&!lastSample){const l=last;t+=`\nName: ${l.name||'-'}\nDate of birth: ${l.dob}\nTime of birth: ${l.tob}\nPlace: ${l.place}\nLagna: ${SIGNS[l.lag][1]}, Moon sign: ${SIGNS[signOf(l.pos.Mo)][1]}`}
  return `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
}
function links(){document.querySelectorAll('a.wa').forEach(a=>a.href=waHref(a.dataset.topic))}
function run(){const r=compute();if(!r)return;render(r);$('k-sample').textContent=sample?'This is a sample chart (1 January 1990, 10:30, Mumbai). Enter your own details and press Generate.':'';links()}
$('kform').addEventListener('submit',e=>{e.preventDefault();sample=false;run()});
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
  document.querySelectorAll('.pane').forEach(p=>p.hidden=p.id!=='pane-'+b.dataset.t)}));
run();
})();

