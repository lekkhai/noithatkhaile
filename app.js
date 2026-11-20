const ZALO='https://zalo.me/0974208882';
/* Dán link "URL ứng dụng web" của Google Apps Script vào đây (xem file HUONG-DAN-GOOGLE-SHEET.md).
   Có link này: yêu cầu tư vấn được lưu vào Google Sheet và sản phẩm thêm trong Sheet sẽ tự hiện lên trang. Để trống = chỉ gửi qua Zalo. */
    const SHEET_API ='https://script.google.com/macros/s/AKfycbyFrdraP67au0HUpM9TQyzLYIeKy_sT1XsEj_F3Td_oHPL3EJPRdHAV36I8gILcpfuz/exec';
function saveLead(d){
  if(!SHEET_API)return;
  try{fetch(SHEET_API,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(Object.assign({source:location.href},d))}).catch(()=>{})}catch(_){}
}
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove('show'),3800)}

/* Header khi cuộn */
const header=document.getElementById('top');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();

/* Menu mobile */
const menu=document.getElementById('menu');
document.getElementById('burger').addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

/* Hiệu ứng xuất hiện khi cuộn */
const io=new IntersectionObserver((es)=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* Tàn hương / đốm sáng bay (canvas) */
(function(){
  const c=document.getElementById('embers'),x=c.getContext('2d');
  let w,h,ps=[];
  function size(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight}
  size();addEventListener('resize',size);
  const N=Math.min(60,Math.floor(innerWidth/22));
  const mk=(init)=>({x:Math.random()*w,y:init?Math.random()*h:h+10,r:Math.random()*1.8+.4,v:Math.random()*.5+.15,s:Math.random()*Math.PI*2,a:Math.random()*.6+.2});
  for(let i=0;i<N;i++)ps.push(mk(true));
  (function loop(){
    x.clearRect(0,0,w,h);
    ps.forEach((p,i)=>{
      p.y-=p.v;p.s+=.012;p.x+=Math.sin(p.s)*.4;
      if(p.y<-10)ps[i]=mk(false);
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);
      x.fillStyle=`rgba(236,209,151,${p.a*(p.y/h*.9+.1)})`;
      x.shadowColor='rgba(212,170,95,.9)';x.shadowBlur=8;x.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

/* ===== Mẫu hoa văn (vẽ lại theo mẫu của cửa hàng) ===== */
const BASE='<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/>'
  +'<rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/>'
  +'<rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/>';
const CORNERS=(x,y,w,h)=>`<use href="#corner" transform="translate(${x-4} ${y-4})"/><use href="#corner" transform="translate(${x+w+4} ${y-4}) scale(-1 1)"/><use href="#corner" transform="translate(${x-4} ${y+h+4}) scale(1 -1)"/><use href="#corner" transform="translate(${x+w+4} ${y+h+4}) scale(-1 -1)"/>`;

const patterns=[
 {name:'Hoa sen',desc:'Sen – thanh khiết, tĩnh tại, hướng thiện. Tấm sen cắt CNC có bông nở, nụ, lá, chim én và cò trắng trên mặt nước, đặt đối xứng hai bên vách.',
  svg:()=>`<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/><rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/><g><rect x="34" y="36" width="141.6" height="354.0" fill="#2a170b"/><rect x="34" y="36" width="141.6" height="354.0" fill="url(#grain)"/><rect x="34" y="36" width="141.6" height="354.0" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="39.9" y="41.9" width="129.79999999999998" height="342.2" fill="none" stroke="#d4aa5f" stroke-width=".8" opacity=".8"/><use href="#corner" transform="translate(36.9 38.9)"/><use href="#corner" transform="translate(172.7 38.9) scale(-1 1)"/><use href="#corner" transform="translate(36.9 387.09999999999997) scale(1 -1)"/><use href="#corner" transform="translate(172.7 387.09999999999997) scale(-1 -1)"/><g filter="url(#glowF)" color="#e3bd62"><g transform="translate(34 36) scale(1.18)"><use href="#lotusCut"/></g></g></g><g><rect x="266" y="36" width="141.6" height="354.0" fill="#2a170b"/><rect x="266" y="36" width="141.6" height="354.0" fill="url(#grain)"/><rect x="266" y="36" width="141.6" height="354.0" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="271.9" y="41.9" width="129.79999999999998" height="342.2" fill="none" stroke="#d4aa5f" stroke-width=".8" opacity=".8"/><use href="#corner" transform="translate(268.9 38.9)"/><use href="#corner" transform="translate(404.69999999999993 38.9) scale(-1 1)"/><use href="#corner" transform="translate(268.9 387.09999999999997) scale(1 -1)"/><use href="#corner" transform="translate(404.69999999999993 387.09999999999997) scale(-1 -1)"/><g filter="url(#glowF)" color="#e3bd62"><g transform="translate(407.6 36) scale(-1.18 1.18)"><use href="#lotusCut"/></g></g></g><g filter="url(#glowF)"><rect x="186" y="40" width="68" height="16" fill="url(#hoiBand)"/><rect x="186" y="344" width="68" height="16" fill="url(#hoiBand)"/></g><rect x="186" y="96" width="68" height="208" fill="none" stroke="url(#goldG)" stroke-width="2.4"/><use href="#corner" transform="translate(183 93)"/><use href="#corner" transform="translate(257 93) scale(-1 1)"/><use href="#corner" transform="translate(183 307) scale(1 -1)"/><use href="#corner" transform="translate(257 307) scale(-1 -1)"/><circle cx="220" cy="200" r="32" fill="url(#lampG)" class="pulse"/><circle cx="220" cy="200" r="31.0" fill="#33190c"/><g color="#e3bd62" filter="url(#glowF)"><use href="#thoRound" transform="translate(220 200) scale(0.62)"/></g>`},
 {name:'Phúc – Lộc – Thọ',desc:'Ba huy hiệu tròn viền hạt, chữ thư pháp nổi màu vàng trên nền gỗ sẫm, đặt phía trên khung hồi văn ở giữa vách.',
  svg:()=>`<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/><rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/><rect x="34" y="36" width="372" height="124" fill="#2e190c"/><rect x="34" y="36" width="372" height="124" fill="url(#grain)"/><rect x="34" y="36" width="372" height="124" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="34" y="36" width="372" height="124" fill="url(#latT)" opacity=".28"/><g transform="translate(120 98) scale(1.2)"><use href="#pltRing"/><text y="8.8" text-anchor="middle" font-family="'Dancing Script','Great Vibes',cursive" font-weight="700" font-size="26" fill="url(#goldG)" stroke="#6b4a1a" stroke-width=".35">Phúc</text></g><g transform="translate(220 98) scale(1.2)"><use href="#pltRing"/><text y="8.8" text-anchor="middle" font-family="'Dancing Script','Great Vibes',cursive" font-weight="700" font-size="26" fill="url(#goldG)" stroke="#6b4a1a" stroke-width=".35">Lộc</text></g><g transform="translate(320 98) scale(1.2)"><use href="#pltRing"/><text y="8.8" text-anchor="middle" font-family="'Dancing Script','Great Vibes',cursive" font-weight="700" font-size="26" fill="url(#goldG)" stroke="#6b4a1a" stroke-width=".35">Thọ</text></g><rect x="110" y="176" width="220" height="196" fill="#523018"/><rect x="110" y="176" width="220" height="196" fill="url(#grain)"/><rect x="110" y="176" width="220" height="196" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><g filter="url(#glowF)"><rect x="110" y="176" width="220" height="18" fill="url(#hoiBand)"/><rect x="110" y="354" width="220" height="18" fill="url(#hoiBand)"/><rect x="110" y="194" width="18" height="160" fill="url(#hoiBand)"/><rect x="312" y="194" width="18" height="160" fill="url(#hoiBand)"/></g><rect x="110" y="176" width="220" height="196" fill="none" stroke="url(#goldG)" stroke-width="1.4"/><rect x="144" y="210" width="152" height="128" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><use href="#corner" transform="translate(141 207)"/><use href="#corner" transform="translate(299 207) scale(-1 1)"/><use href="#corner" transform="translate(141 341) scale(1 -1)"/><use href="#corner" transform="translate(299 341) scale(-1 -1)"/><circle cx="220" cy="274" r="41" fill="url(#lampG)" class="pulse"/><circle cx="220" cy="274" r="39.0" fill="#33190c"/><g color="#e3bd62" filter="url(#glowF)"><use href="#thoRound" transform="translate(220 274) scale(0.78)"/></g>`},
 {name:'Chữ Thọ tròn',desc:'Chữ Thọ cách điệu hình tròn, cắt rời hoặc chạm nổi, đặt giữa khung chữ nhật hồi. Có thể sơn vàng, mạ vàng hoặc để màu gỗ.',
  svg:()=>`<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/><rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/><rect x="30" y="30" width="380" height="340" fill="#3a2010"/><rect x="30" y="30" width="380" height="340" fill="url(#grain)"/><rect x="30" y="30" width="380" height="340" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><g filter="url(#glowF)"><rect x="30" y="30" width="380" height="18" fill="url(#hoiBand)"/><rect x="30" y="352" width="380" height="18" fill="url(#hoiBand)"/><rect x="30" y="48" width="18" height="304" fill="url(#hoiBand)"/><rect x="392" y="48" width="18" height="304" fill="url(#hoiBand)"/></g><rect x="30" y="30" width="380" height="340" fill="none" stroke="url(#goldG)" stroke-width="1.4"/><rect x="48" y="48" width="344" height="304" fill="#eadfc6"/><rect x="84" y="84" width="272" height="232" fill="none" stroke="#5a331b" stroke-width="4"/><use href="#corner" transform="translate(78 78)"/><use href="#corner" transform="translate(362 78) scale(-1 1)"/><use href="#corner" transform="translate(78 322) scale(1 -1)"/><use href="#corner" transform="translate(362 322) scale(-1 -1)"/><g color="#bf8c2c"><use href="#thoRound" transform="translate(220 200) scale(1.75)"/></g>`},
 {name:'Hồi văn viền',desc:'Hồi văn – nét uốn khúc liên hoàn, tượng trưng phúc lộc nối dài. Dùng làm viền khung chính, dải trang trí dưới mặt bàn và mép tường.',
  svg:()=>`<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/><rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/><rect x="36" y="34" width="368" height="236" fill="#523018"/><rect x="36" y="34" width="368" height="236" fill="url(#grain)"/><rect x="36" y="34" width="368" height="236" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><g filter="url(#glowF)"><rect x="36" y="34" width="368" height="28" fill="url(#hoiBand)"/><rect x="36" y="242" width="368" height="28" fill="url(#hoiBand)"/><rect x="36" y="62" width="28" height="180" fill="url(#hoiBand)"/><rect x="376" y="62" width="28" height="180" fill="url(#hoiBand)"/></g><rect x="36" y="34" width="368" height="236" fill="none" stroke="url(#goldG)" stroke-width="1.4"/><rect x="78" y="76" width="284" height="152" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><use href="#corner" transform="translate(75 73)"/><use href="#corner" transform="translate(365 73) scale(-1 1)"/><use href="#corner" transform="translate(75 231) scale(1 -1)"/><use href="#corner" transform="translate(365 231) scale(-1 -1)"/><circle cx="150" cy="152" r="25.0" fill="#33190c"/><g color="#e3bd62" filter="url(#glowF)"><use href="#thoRound" transform="translate(150 152) scale(0.5)"/></g><circle cx="290" cy="152" r="25.0" fill="#33190c"/><g color="#e3bd62" filter="url(#glowF)"><use href="#thoRound" transform="translate(290 152) scale(0.5)"/></g><g filter="url(#glowF)"><rect x="36" y="290" width="368" height="24" fill="url(#hoiBand)"/></g><rect x="36" y="330" width="368" height="24" fill="#2e190c"/><rect x="36" y="330" width="368" height="24" fill="url(#hoiWood)"/>`},
 {name:'Vách hồi',desc:'Vách hồi là hai tấm vách dựng ngắn hai bên bàn thờ, thường cắt lam hồi hoặc hoa sen; vách hậu là mảng tường phía sau bàn thờ. Tấm lam trên trần làm không gian thờ thoáng và nhẹ hơn.',
  svg:()=>`<rect width="440" height="400" rx="10" fill="url(#woodG)"/><rect width="440" height="400" rx="10" fill="url(#grain)"/><rect x="10" y="10" width="420" height="380" rx="6" fill="none" stroke="url(#goldG)" stroke-width="2.2"/><rect x="18" y="18" width="404" height="364" rx="3" fill="none" stroke="#d4aa5f" stroke-width=".7" opacity=".6"/><rect x="140" y="34" width="160" height="28" fill="#4a2b14"/><rect x="140" y="34" width="160" height="28" fill="url(#grain)"/><rect x="140" y="34" width="160" height="28" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="144" y="38" width="152" height="20" fill="url(#latT)"/><rect x="34" y="76" width="100" height="288" fill="#2e190c"/><rect x="34" y="76" width="100" height="288" fill="url(#grain)"/><rect x="34" y="76" width="100" height="288" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="42" y="84" width="84" height="272" fill="url(#latT)"/><rect x="306" y="76" width="100" height="288" fill="#2e190c"/><rect x="306" y="76" width="100" height="288" fill="url(#grain)"/><rect x="306" y="76" width="100" height="288" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="314" y="84" width="84" height="272" fill="url(#latT)"/><rect x="146" y="76" width="148" height="288" fill="#3a2010"/><rect x="146" y="76" width="148" height="288" fill="url(#grain)"/><rect x="146" y="76" width="148" height="288" fill="none" stroke="url(#goldG)" stroke-width="1.5"/><rect x="168" y="100" width="104" height="164" fill="none" stroke="url(#goldG)" stroke-width="2.4"/><use href="#corner" transform="translate(165 97)"/><use href="#corner" transform="translate(275 97) scale(-1 1)"/><use href="#corner" transform="translate(165 267) scale(1 -1)"/><use href="#corner" transform="translate(275 267) scale(-1 -1)"/><circle cx="220" cy="182" r="32" fill="url(#lampG)" class="pulse"/><circle cx="220" cy="182" r="31.0" fill="#33190c"/><g color="#e3bd62" filter="url(#glowF)"><use href="#thoRound" transform="translate(220 182) scale(0.62)"/></g><rect x="146" y="290" width="148" height="74" fill="url(#latT)" opacity=".55"/>`},
 {name:'Tranh trúc chỉ',desc:'Tranh trúc chỉ – hoa sen, chim, cò dệt bằng những đường chỉ vàng mảnh trên nền sẫm, đặt hai bên bàn thờ. Giữa vách có thể làm đèn tròn sáng vàng như các công trình trong phần Mẫu thực tế.',
  svg:()=>{
    const PANEL=`<rect width="112" height="328" rx="3" fill="#2a170b" stroke="url(#goldG)" stroke-width="2"/><rect x="6" y="6" width="100" height="316" fill="none" stroke="#d4aa5f" stroke-width=".9"/>${CORNERS(6,6,100,316)}<g clip-path="url(#tcClip)" filter="url(#glowF)"><use href="#threadLotus"/></g>`;
    const petals=Array.from({length:12},(_,i)=>`<ellipse cy="-33" rx="8.5" ry="22" transform="rotate(${i*30})"/>`).join('');
    const inner=Array.from({length:8},(_,i)=>`<ellipse cy="-16" rx="5" ry="11" transform="rotate(${i*45+22.5})"/>`).join('');
    return BASE+
     `<g transform="translate(36 36)">${PANEL}</g>
      <g transform="translate(404 36) scale(-1 1)">${PANEL}</g>
      <g filter="url(#glowF)"><rect x="162" y="38" width="116" height="16" fill="url(#fretCream)"/><rect x="162" y="346" width="116" height="16" fill="url(#fretCream)"/></g>
      <circle cx="220" cy="200" r="88" fill="url(#lampG)" class="pulse"/>
      <circle cx="220" cy="200" r="64" fill="url(#lampAmber)" stroke="url(#goldG)" stroke-width="5"/>
      <circle cx="220" cy="200" r="57" fill="none" stroke="#7a4210" stroke-width="1.2" stroke-dasharray="3 4"/>
      <g transform="translate(220 200)" fill="none" stroke="#6b3a10" stroke-width="1.5">${petals}${inner}<circle r="7"/><circle r="3" fill="#6b3a10"/></g>`}}
];
const pSvg=document.getElementById('patternSvg'),pName=document.getElementById('patternName'),pDesc=document.getElementById('patternDesc');
function showPattern(i){
  pSvg.style.opacity=0;
  setTimeout(()=>{
    pSvg.innerHTML=patterns[i].svg();
    pName.textContent=patterns[i].name;pDesc.textContent=patterns[i].desc;
    pSvg.style.opacity=1;
  },200);
}
document.querySelectorAll('#tabs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('#tabs button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');showPattern(+b.dataset.p);
}));
showPattern(0);

/* ===== Thư viện ảnh + lightbox (phóng to / thu nhỏ / kéo) ===== */
const GALLERY=[
 {c:'Vách thờ',src:'anh/mau-01.jpg',title:'Vách thờ sen ôm góc phòng',desc:'Vách hậu ốp vân gỗ đỏ có khung viền vàng và huy hiệu sen ở giữa, dải Phúc – Lộc – Thọ phía trên. Hai vách hồi dựng ngắn hai bên cắt rỗng hoa sen, ôm lấy góc phòng.'},
 {c:'Bàn thờ',src:'anh/mau-02.jpg',title:'Bàn thờ chân cuốn kèm tủ thờ',desc:'Bàn thờ hai ngăn kéo tay nắm đồng, dải hồi văn dưới mặt bàn, vòng tròn ở giữa phía dưới. Tủ thờ hai cánh bên dưới chạm chữ Thọ tròn.'},
 {c:'Phối cảnh 3D',src:'anh/mau-03.jpg',title:'Phối cảnh vách thờ ốp vân gỗ',desc:'Bản dựng 3D để gia chủ xem trước: vách hậu có khung hồi viền vàng và chữ Thọ tròn, dải Phúc – Lộc – Thọ phía trên, hai vách hồi cắt hoa sen dựng hai bên.'},
 {c:'Vách thờ',src:'anh/mau-04.jpg',title:'Vách thờ tranh trúc chỉ',desc:'Hai tranh trúc chỉ sáng đèn vàng đặt hai bên vách hậu, hàng Phúc – Lộc – Thọ và huy hiệu sen vàng ở giữa. Hai vách hồi ngoài cùng cắt rỗng hoa sen, trần ốp vân gỗ viền hồi văn.'},
 {c:'Vách thờ',src:'anh/mau-05.jpg',title:'Vách hậu chữ Phúc',desc:'Vách hậu ốp nan đứng, chữ Phúc tròn nổi trong khung chữ nhật hồi, trên trần có tấm lam hồi. Bàn thờ phía dưới chạm nổi hoa văn cuốn.'},
 {c:'Bàn thờ',src:'anh/mau-06.jpg',title:'Bàn thờ chạm hoa sen',desc:'Bàn thờ gỗ nâu đậm lộ rõ vân gỗ, ngăn kéo chạm ba bông sen, tủ thờ hai cánh chạm chữ Thọ tròn, tay nắm đồng.'},
 {c:'Vách thờ',src:'anh/mau-07.jpg',title:'Vách hậu chữ Thọ viền hồi văn',desc:'Vách hậu có viền hồi văn cắt rỗng bao quanh ô giữa, chữ Thọ tròn màu vàng đồng nổi trên nền sáng. Hai vách hồi lam dựng hai bên; bàn thờ nâu trầm, tủ thờ chạm chữ Thọ có bánh xe.'},
 {c:'Bàn thờ',src:'anh/mau-08.jpg',title:'Bàn thờ hai tầng ngăn kéo',desc:'Bàn thờ hai ngăn kéo với ô hồi văn vuông chạm nổi hai bên, tủ thờ ba ngăn kéo cùng kiểu, màu gỗ nâu cam.'},
 {c:'Phối cảnh 3D',src:'anh/mau-09.jpg',title:'Phối cảnh 350 × 315 cm',desc:'Bản dựng 3D theo kích thước thực 350 × 315 cm: vách hậu có khung vàng và huy hiệu sen, dải Phúc – Lộc – Thọ phía trên; hai vách hồi cắt hoa sen và lam hai bên.'},
 {c:'Bàn thờ',src:'anh/mau-10.jpg',title:'Bàn thờ hai ngăn kéo',desc:'Bàn thờ nâu đỏ với dải hồi văn dưới mặt bàn, ô hồi vuông giữa hai ngăn kéo, vòng tròn ở giữa phía dưới. Tủ thờ chạm chữ Thọ.'},
 {c:'Vách thờ',src:'anh/mau-11.jpg',title:'Hai vách hồi hoa sen',desc:'Hai vách hồi lam hồi dựng hai bên, đầu vách có hoa sen cắt rỗng. Vách hậu sáng với khung chữ nhật hồi và chữ Thọ tròn, bàn thờ đặt giữa hai đôn nhỏ.'},
 {c:'Vách thờ',src:'anh/mau-12.jpg',title:'Vách hậu chữ Phúc, vách hồi hoa sen',desc:'Vách hậu nền sáng viền hồi văn cắt rỗng, chữ Phúc tròn ở giữa. Hai vách hồi dựng hai bên cắt rỗng hoa sen và lam hồi, ốp ván vân gỗ đỏ.'},
 {c:'Vách thờ',src:'anh/mau-13.jpg',title:'Phòng thờ vách hậu chữ Thọ',desc:'Vách hậu nền sáng có khung chữ nhật hồi và chữ Thọ tròn, hai bên là các ô vách viền hồi văn. Trên trần có tấm lam hồi, bàn thờ và ghế đôn cùng tông gỗ trầm.'},
 {c:'Vách thờ',src:'anh/mau-14.jpg',title:'Hai vách hồi cao',desc:'Hai vách hồi lam dựng cao hai bên, giữa là vách hậu nền sáng với khung chữ nhật hồi và chữ Thọ tròn nổi.'},
 {c:'Vách thờ',src:'anh/mau-15.jpg',title:'Tranh trúc chỉ hai bên bàn thờ',desc:'Hai tranh trúc chỉ sáng đèn vàng dựng hai bên, vách hậu có viền hồi văn và đèn tròn sáng vàng ở giữa; phía dưới là vách hồi lam. Bàn thờ đỏ chạm hoa văn.'},
 {c:'Vách thờ',src:'anh/mau-16.jpg',title:'Tranh trúc chỉ hoa sen',desc:'Hai tranh trúc chỉ hoa sen, chim vàng dựng hai bên vách hậu. Hàng Phúc – Lộc – Thọ phía trên, đèn tròn sáng vàng ở giữa, trên trần có tấm lam hồi. Bàn thờ đỏ kèm hai đôn nhỏ.'},
 {c:'Vách thờ',src:'anh/mau-17.jpg',title:'Hai vách hồi ôm bàn thờ',desc:'Hai vách hồi cắt rỗng hoa sen và lam hồi dựng hai bên ôm lấy bàn thờ, vách hậu ốp gỗ phía sau. Bàn thờ chạm hoa văn, tủ thờ bên dưới.'},
 {c:'Vách thờ',src:'anh/mau-18.jpg',title:'Vách hồi lam, vách hậu chữ Thọ',desc:'Vách hồi lam dựng hai bên, vách hậu tông nâu có viền hồi văn và chữ Thọ tròn ở giữa. Bàn thờ cùng tông gỗ trầm, trần có đèn hắt sáng.'},
 {c:'Vách thờ',src:'anh/mau-19.jpg',title:'Vách hậu chạm nổi chữ Thọ',desc:'Vách hậu chạm nổi chữ Thọ tròn trong khung hồi văn, hai bên là tấm hoa sen chạm nổi. Vách hồi lam dựng ở mép trái, gỗ màu cam vàng.'},
 {c:'Vách thờ',src:'anh/mau-20.jpg',title:'Vách thờ khung hồi chữ Thọ',desc:'Vách hậu nền sáng, khung chữ nhật hồi và chữ Thọ tròn nổi ở giữa; hai bên là các ô vách viền hồi văn. Trên trần có tấm lam hồi, bàn thờ và ghế đôn tông nâu.'},
 {c:'Bản vẽ CNC',src:'anh/mau-21.jpg',title:'Bản vẽ CNC vách ba mảng',desc:'Bản vẽ CNC cả mặt vách: hai bên ngoài cùng là vách hồi có huy hiệu sen, tiếp đó là tranh sen, ở giữa là vách hậu với khung hồi và chữ Thọ tròn.'},
 {c:'Bản vẽ CNC',src:'anh/mau-22.jpg',title:'Bản vẽ CNC vách hậu',desc:'Bản vẽ CNC phòng thờ: ba huy hiệu Phúc – Lộc – Thọ, hoa sen hai góc, khung hồi văn viền vách hậu và chữ Phúc tròn ở giữa; hai vách hồi dựng hai bên.'}
];
const gal=document.getElementById('gallery'),fbar=document.getElementById('gFilters');
const CAT_ORDER=['Vách thờ','Bàn thờ','Phối cảnh 3D','Bản vẽ CNC'];
let list=GALLERY.slice(),curFilter='all',shown=6;
function driveUrl(u){
  u=String(u||'').trim();if(!u)return '';
  const m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=|thumbnail\?id=)([\w-]{20,})/)||u.match(/\/d\/([\w-]{20,})/);
  return m?'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600':u;
}
function cats(){
  const seen=[];GALLERY.forEach(g=>{if(!seen.includes(g.c))seen.push(g.c)});
  return CAT_ORDER.filter(c=>seen.includes(c)).concat(seen.filter(c=>!CAT_ORDER.includes(c)));
}
function buildFilters(){
  fbar.innerHTML='';
  [['all','Tất cả']].concat(cats().map(c=>[c,c])).forEach(([k,label])=>{
    const n=k==='all'?GALLERY.length:GALLERY.filter(g=>g.c===k).length;
    const b=document.createElement('button');b.type='button';b.dataset.f=k;b.className=k===curFilter?'active':'';b.innerHTML=`${label}<em>${n}</em>`;fbar.appendChild(b);
  });
  const nc=document.getElementById('navCats');
  if(nc)nc.innerHTML=['all'].concat(cats()).map(c=>`<button type="button" data-cat="${c}">${c==='all'?'Tất cả sản phẩm':c}</button>`).join('');
  const fc=document.getElementById('fCats');
  if(fc)fc.innerHTML=cats().map(c=>`<li><button type="button" data-cat="${c}">${c}</button></li>`).join('');
}
function matches(g){return curFilter==='all'||g.c===curFilter}
const PS=6;let page=0;
function applyGallery(animate){
  const items=[...gal.querySelectorAll('.g-item')];let n=0;
  const total=GALLERY.filter(matches).length,pages=Math.max(1,Math.ceil(total/PS));
  page=Math.min(page,pages-1);
  items.forEach((el,i)=>{
    let vis=false;
    if(matches(GALLERY[i])){vis=n>=page*PS&&n<(page+1)*PS;n++}
    const was=!el.hidden;el.hidden=!vis;
    if(vis&&animate&&!was){el.classList.remove('pop');void el.offsetHeight;el.classList.add('pop')}
  });
  const pg=document.getElementById('gMoreWrap');pg.hidden=pages<=1;
  const AR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  let s=`<button type="button" class="gp-ar prev" data-pg="${page-1}" aria-label="Trang trước"${page===0?' disabled':''}>${AR}</button>`;
  for(let i=0;i<pages;i++)s+=`<button type="button" class="gp-n${i===page?' on':''}" data-pg="${i}" aria-label="Trang ${i+1}">${i+1}</button>`;
  s+=`<button type="button" class="gp-ar" data-pg="${page+1}" aria-label="Trang sau"${page===pages-1?' disabled':''}>${AR}</button>`;
  pg.innerHTML=s;
  list=GALLERY.filter(matches);
}
function buildTiles(){
  gal.innerHTML='';
  GALLERY.forEach(g=>{
    const f=document.createElement('figure');
    f.className='g-item glass'+(g.c==='Bản vẽ CNC'?' draw':'');
    f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','Xem chi tiết: '+g.title);
    f.innerHTML=`<img src="${g.src}" alt="${g.title}" loading="lazy" decoding="async"><svg class="g-wm" viewBox="0 0 64 64" aria-hidden="true"><use href="#logoMark"/></svg><span class="g-tag">${g.c}</span><i class="g-zoom">⤢</i><figcaption><b>${g.title}</b>${g.desc?`<span class="gd">${g.desc}</span>`:''}</figcaption>`;
    f.addEventListener('click',()=>openLb(g));
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(g)}});
    gal.appendChild(f);
  });
  applyGallery(false);
}
function setCategory(k,scroll){
  curFilter=k;page=0;buildFilters();applyGallery(true);
  if(scroll)document.getElementById('mau-thuc-te').scrollIntoView({behavior:'smooth'});
}
fbar.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setCategory(b.dataset.f,false)});
document.getElementById('gMoreWrap').addEventListener('click',e=>{
  const b=e.target.closest('[data-pg]');if(!b||b.disabled)return;
  page=+b.dataset.pg;applyGallery(true);
  document.getElementById('gFilters').scrollIntoView({behavior:'smooth',block:'start'});
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(b)setCategory(b.dataset.cat,true)});
buildFilters();buildTiles();

/* Sản phẩm thêm từ Google Sheet (không cần sửa code) */
(async function(){
  if(!SHEET_API)return;
  try{
    const r=await fetch(SHEET_API+(SHEET_API.includes('?')?'&':'?')+'action=products');
    const j=JSON.parse(await r.text());
    if(j.note)console.warn('Google Sheet:',j.note);
    const add=(j.products||[]).map(p=>({c:String(p.category||'Sản phẩm').trim()||'Sản phẩm',src:driveUrl(p.image),title:String(p.title||'').trim(),desc:String(p.desc||'').trim()})).filter(p=>p.src&&p.title);
    if(!add.length)return;
    GALLERY.unshift(...add);buildFilters();buildTiles();
  }catch(e){console.warn('Không đọc được sản phẩm từ Google Sheet (kiểm tra bản triển khai Apps Script):',e)}
})();

const lb=document.getElementById('lb'),stage=document.getElementById('lbStage'),lbImg=document.getElementById('lbImg'),lbZl=document.getElementById('lbZl');
let cur=0,sc=1,tx=0,ty=0;
function apply(){lbImg.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`;lbZl.textContent=Math.round(sc*100)+'%';stage.classList.toggle('zoomed',sc>1.001)}
function clamp(){
  if(sc<=1.001){sc=1;tx=0;ty=0;return}
  const W=stage.clientWidth,H=stage.clientHeight;
  tx=Math.min(0,Math.max(W-W*sc,tx));ty=Math.min(0,Math.max(H-H*sc,ty));
}
function zoomAt(ns,px,py){
  ns=Math.min(6,Math.max(1,ns));const r=ns/sc;
  tx=px-(px-tx)*r;ty=py-(py-ty)*r;sc=ns;clamp();apply();
}
function zoomCenter(f){zoomAt(sc*f,stage.clientWidth/2,stage.clientHeight/2)}
function resetZoom(){sc=1;tx=0;ty=0;apply()}
function renderLb(){
  const g=list[cur];resetZoom();
  lbImg.src=g.src;lbImg.alt=g.title;
  document.getElementById('lbTitle').textContent=g.title;
  document.getElementById('lbDesc').textContent=g.c+(g.desc?' · '+g.desc:'');
  document.getElementById('lbCount').textContent=(cur+1)+' / '+list.length;
}
function openLb(g){
  cur=Math.max(0,list.indexOf(g));lb.classList.add('open');document.body.style.overflow='hidden';renderLb();
}
function closeLb(){lb.classList.remove('open');document.body.style.overflow=''}
function stepLb(d){cur=(cur+d+list.length)%list.length;renderLb()}
document.getElementById('lbClose').addEventListener('click',closeLb);
document.getElementById('lbPrev').addEventListener('click',()=>stepLb(-1));
document.getElementById('lbNext').addEventListener('click',()=>stepLb(1));
document.getElementById('lbIn').addEventListener('click',()=>zoomCenter(1.5));
document.getElementById('lbOut').addEventListener('click',()=>zoomCenter(1/1.5));
document.getElementById('lbReset').addEventListener('click',resetZoom);
stage.addEventListener('wheel',e=>{
  e.preventDefault();const r=stage.getBoundingClientRect();
  zoomAt(sc*Math.exp(-e.deltaY*0.0016),e.clientX-r.left,e.clientY-r.top);
},{passive:false});
stage.addEventListener('dblclick',e=>{
  const r=stage.getBoundingClientRect();
  if(sc>1.001)resetZoom();else zoomAt(2.6,e.clientX-r.left,e.clientY-r.top);
});
const ptrs=new Map();let drag=null,pinch=null;
stage.addEventListener('pointerdown',e=>{
  if(e.target.closest('.lb-btn'))return;
  stage.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(ptrs.size===1){drag={x:e.clientX,y:e.clientY,tx,ty};stage.classList.add('dragging')}
  else if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),s:sc};drag=null}
});
stage.addEventListener('pointermove',e=>{
  if(!ptrs.has(e.pointerId))return;ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(ptrs.size===2&&pinch){
    const [a,b]=[...ptrs.values()],r=stage.getBoundingClientRect();
    zoomAt(pinch.s*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top);
  }else if(drag&&sc>1.001){tx=drag.tx+e.clientX-drag.x;ty=drag.ty+e.clientY-drag.y;clamp();apply()}
});
function endPtr(e){
  if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);
  if(drag&&ptrs.size===0){
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(sc<=1.001&&Math.abs(dx)>60&&Math.abs(dy)<80)stepLb(dx<0?1:-1);
    drag=null;
  }
  if(ptrs.size<2)pinch=null;
  if(ptrs.size===1){const p=[...ptrs.values()][0];drag={x:p.x,y:p.y,tx,ty}}
  if(ptrs.size===0)stage.classList.remove('dragging');
}
stage.addEventListener('pointerup',endPtr);stage.addEventListener('pointercancel',endPtr);
addEventListener('resize',()=>{if(lb.classList.contains('open')){clamp();apply()}});
addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')closeLb();
  else if(e.key==='+'||e.key==='=')zoomCenter(1.5);
  else if(e.key==='-')zoomCenter(1/1.5);
  else if(e.key==='0')resetZoom();
  else if(e.key==='ArrowLeft'){sc>1.001?(tx+=80,clamp(),apply()):stepLb(-1)}
  else if(e.key==='ArrowRight'){sc>1.001?(tx-=80,clamp(),apply()):stepLb(1)}
  else if(e.key==='ArrowUp'&&sc>1.001){ty+=80;clamp();apply()}
  else if(e.key==='ArrowDown'&&sc>1.001){ty-=80;clamp();apply()}
});

/* ===== Dự toán ===== */
const cw=document.getElementById('cw'),ch=document.getElementById('ch');
const fmt=n=>Math.round(n).toLocaleString('vi-VN');
function calc(){
  const w=Math.max(0,+cw.value||0),h=Math.max(0,+ch.value||0);
  const area=w*h/10000;
  document.getElementById('cArea').textContent=area.toFixed(2).replace('.',',')+' m²';
  document.getElementById('cTotal').textContent=fmt(area*1000000)+'đ';
  return {w,h,area};
}
cw.addEventListener('input',calc);ch.addEventListener('input',calc);calc();

function copyText(t){
  try{
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(t).then(()=>true).catch(()=>false)}
  }catch(e){}
  try{
    const ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();const ok=document.execCommand('copy');ta.remove();
    return Promise.resolve(ok);
  }catch(e){return Promise.resolve(false)}
}
document.getElementById('sendEstimate').addEventListener('click',async()=>{
  const {w,h,area}=calc();
  const msg=`Chào Nội Thất Khải Lê, tôi muốn làm vách thờ kích thước ${w} x ${h} cm (khoảng ${area.toFixed(2).replace('.',',')} m², dự toán ${fmt(area*1000000)}đ). Nhờ shop tư vấn mẫu và báo giá giúp tôi.`;
  saveLead({name:'(Dự toán trên web)',phone:'',type:'',note:msg});
  const okc=await copyText(msg);
  toast(okc?'Đã sao chép nội dung dự toán – dán vào Zalo rồi gửi nhé.':'Zalo đang mở – hãy gõ kích thước vách để nhận báo giá.');
  window.open(ZALO,'_blank','noopener');
});

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach(item=>{
  const q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
  q.addEventListener('click',()=>{
    const open=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=0});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}
  });
});

/* Form tư vấn → soạn sẵn tin nhắn, mở Zalo của cửa hàng (và lưu Google Sheet nếu có SHEET_API) */
const form=document.getElementById('leadForm'),ok=document.getElementById('formOk');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('name'),p=document.getElementById('phone');
  const nOk=n.value.trim().length>1;
  const pOk=/^(0|\+84)\d{9}$/.test(p.value.replace(/[\s.\-]/g,''));
  n.parentElement.classList.toggle('error',!nOk);
  p.parentElement.classList.toggle('error',!pOk);
  if(!(nOk&&pOk))return;
  const type=document.getElementById('type').value,note=document.getElementById('note').value.trim();
  const msg=`Chào Nội Thất Khải Lê, tôi là ${n.value.trim()}, SĐT ${p.value.trim()}.`+(type?` Nhà: ${type}.`:'')+(note?` Ghi chú: ${note}.`:'')+' Tôi muốn nhận tư vấn và báo giá vách thờ.';
  const copyP=copyText(msg);
  saveLead({name:n.value.trim(),phone:p.value.trim(),type,note});
  document.getElementById('okMsg').value=msg;
  form.style.display='none';ok.style.display='block';
  copyP.then(done=>{document.getElementById('okText').textContent=done
    ?'Đã sao chép nội dung. Zalo vừa mở ở tab mới: giữ ô chat → Dán → Gửi. Nếu Zalo chưa mở, bấm nút bên dưới.'
    :'Chưa sao chép tự động được. Bấm “Sao chép lại nội dung” (hoặc chọn nội dung trong ô), rồi mở Zalo và dán.'});
  window.open(ZALO,'_blank','noopener');
});
document.getElementById('okCopy').addEventListener('click',async()=>{
  const d=await copyText(document.getElementById('okMsg').value);
  toast(d?'Đã sao chép nội dung tin nhắn.':'Không sao chép được – hãy chọn nội dung trong ô rồi sao chép thủ công.');
});
document.getElementById('okBack').addEventListener('click',()=>{ok.style.display='none';form.style.display='grid'});

/* Hiệu ứng nghiêng nhẹ theo chuột cho thẻ kính (desktop) */
if(matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.benefit').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const rx=((e.clientY-r.top)/r.height-.5)*-6,ry=((e.clientX-r.left)/r.width-.5)*6;
      card.style.transform=`translateY(-8px) perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}

/* ===== Tab thông tin ===== */
function activateTab(id){
  const panel=document.getElementById(id);
  if(!panel||!panel.classList.contains('tab-panel'))return false;
  const parent=panel.parentElement.closest('.tab-panel');if(parent)activateTab(parent.id);
  const wrap=panel.parentElement;
  wrap.querySelectorAll(':scope>.tab-panel').forEach(p=>p.classList.toggle('active',p===panel));
  const bar=document.querySelector('.tabbar[data-for="'+wrap.id+'"]');
  if(bar)bar.querySelectorAll('button').forEach(b=>{const on=b.dataset.tab===id;b.classList.toggle('active',on);b.setAttribute('aria-selected',on)});
  requestAnimationFrame(()=>panel.querySelectorAll('.reveal').forEach(el=>el.classList.add('in')));
  return true;
}
document.addEventListener('click',e=>{
  const btn=e.target.closest('.tabbar button');
  if(btn){activateTab(btn.dataset.tab);return}
  const go=e.target.closest('.pg[data-go]');
  if(go){
    activateTab(go.dataset.go);
    const bar=document.querySelector('.tabbar[data-for="infoPanels"]');
    scrollTo({top:bar.getBoundingClientRect().top+scrollY-100,behavior:'smooth'});
    return;
  }
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  const id=a.getAttribute('href').slice(1);
  if(activateTab(id)){
    e.preventDefault();
    document.getElementById('thong-tin').scrollIntoView({behavior:'smooth',block:'start'});
    try{history.replaceState(null,'','#'+id)}catch(_){}
  }
});
if(location.hash&&activateTab(location.hash.slice(1)))setTimeout(()=>document.getElementById('thong-tin').scrollIntoView(),60);

/* ===== Nút "Xem thêm" lật sang trang kế ===== */
(function(){
  const ARR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const PAGES=[['loi-ich','Lợi ích & tính năng'],['mau','Hoa văn'],['g-intro','Cẩm nang: Giới thiệu'],['g-use','Cẩm nang: Công dụng'],['g-mat','Cẩm nang: Chất liệu'],['faq','Hỏi đáp']];
  PAGES.forEach(([id],i)=>{
    const panel=document.getElementById(id);if(!panel)return;
    const pager=document.createElement('div');pager.className='pager';
    if(i>0)pager.insertAdjacentHTML('beforeend',`<button type="button" class="pg prev" data-go="${PAGES[i-1][0]}"><span class="ar">${ARR}</span>${PAGES[i-1][1]}</button>`);
    if(i<PAGES.length-1)pager.insertAdjacentHTML('beforeend',`<button type="button" class="pg next" data-go="${PAGES[i+1][0]}">Xem thêm: ${PAGES[i+1][1]}<span class="ar">${ARR}</span></button>`);
    else pager.insertAdjacentHTML('beforeend',`<a class="pg next down" href="#bang-gia">Xem bảng giá<span class="ar">${ARR}</span></a>`);
    panel.appendChild(pager);
  });
})();

/* ===== Chính sách (cửa sổ nhỏ) ===== */
(function(){
  const pol=document.getElementById('pol'),body=document.getElementById('polBody');
  function open(id){const t=document.getElementById('pol-'+id);if(!t)return;body.innerHTML=t.innerHTML;pol.classList.add('open');document.body.style.overflow='hidden';pol.querySelector('.pol-box').scrollTop=0}
  function close(){pol.classList.remove('open');document.body.style.overflow=''}
  document.addEventListener('click',e=>{const b=e.target.closest('[data-policy]');if(b){open(b.dataset.policy)}});
  document.getElementById('polX').addEventListener('click',close);
  pol.addEventListener('click',e=>{if(e.target===pol)close()});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&pol.classList.contains('open'))close()});
})();

/* ===== Theo dõi lượt truy cập =====
   1) Google Analytics (tùy chọn): dán mã đo lường dạng G-XXXXXXXXXX vào GA_ID.
   2) Ghi vào Google Sheet (tab "Lượt truy cập" và "Thống kê") khi đã có SHEET_API. Không thu thập tên, SĐT hay IP. */
const GA_ID='G-78WM3606HG';
if(GA_ID){
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA_ID);
}
function track(type,detail){
  try{if(window.gtag)gtag('event',type.replace(/\s+/g,'_').toLowerCase(),{detail:detail||''})}catch(_){}
  if(!SHEET_API)return;
  let ref='Trực tiếp';
  try{
    const u=new URL(location.href),utm=u.searchParams.get('utm_source');
    if(utm)ref=utm;else if(document.referrer){const r=new URL(document.referrer).hostname;if(r&&r!==location.hostname)ref=r}
  }catch(_){}
  const dev=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?'Điện thoại':'Máy tính';
  try{fetch(SHEET_API,{method:'POST',mode:'no-cors',keepalive:true,headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({kind:'event',type,detail:detail||'',ref,device:dev,screen:innerWidth+'x'+innerHeight,source:location.href})}).catch(()=>{})}catch(_){}
}
(function(){
  let seen=false;try{seen=sessionStorage.getItem('kl_visit')==='1';sessionStorage.setItem('kl_visit','1')}catch(_){}
  if(!seen)track('Vào web','');
  document.addEventListener('click',e=>{
    const z=e.target.closest('a[href*="zalo.me"]');if(z){track('Bấm Zalo',(z.textContent||'').replace(/\s+/g,' ').replace(/^Zalo\s*/,'').trim().slice(0,40)||'nút Zalo');return}
    const t=e.target.closest('a[href^="tel:"]');if(t){track('Bấm gọi','');return}
    const f=e.target.closest('a[href*="facebook.com"],a[href*="tiktok.com"]');if(f){track('Bấm mạng xã hội',f.href.includes('tiktok')?'TikTok':'Facebook')}
  });
  const _open=openLb;openLb=function(g){track('Xem ảnh',g&&g.title||'');_open(g)};
})();

/* ===== Popup danh mục ở menu ===== */
(function(){
  const li=document.getElementById('subProducts'),ar=document.getElementById('subArrow');
  function set(o){li.classList.toggle('open',o);ar.setAttribute('aria-expanded',o?'true':'false')}
  ar.addEventListener('click',e=>{e.stopPropagation();set(!li.classList.contains('open'))});
  document.addEventListener('click',e=>{
    if(e.target.closest('#navCats [data-cat]')){set(false);menu.classList.remove('open')}
    else if(!e.target.closest('#subProducts'))set(false);
  });
  addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
})();
