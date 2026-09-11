const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];
const searchOverlay=$('#searchOverlay'), cartDrawer=$('#cartDrawer'), mobileMenu=$('#mobileMenu');
$('#searchBtn')?.addEventListener('click',()=>searchOverlay.classList.add('open'));
$('#cartBtn')?.addEventListener('click',()=>cartDrawer.classList.add('open'));
$('#menuBtn')?.addEventListener('click',()=>mobileMenu.classList.add('open'));
$('#menuClose')?.addEventListener('click',()=>mobileMenu.classList.remove('open'));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=> b.dataset.close==='search'?searchOverlay.classList.remove('open'):cartDrawer.classList.remove('open')));
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

document.addEventListener('keydown',e=>{if(e.key==='Escape'){searchOverlay.classList.remove('open');cartDrawer.classList.remove('open');mobileMenu.classList.remove('open')}});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));

let slide=0; const blocks=$$('.reviews blockquote'); const dots=$$('.review-dots button');
function showReview(n){if(!blocks.length)return;slide=n;blocks.forEach(b=>b.style.transform=`translateX(-${n*100}%)`);dots.forEach((d,i)=>d.classList.toggle('active',i===n))}
dots.forEach(d=>d.addEventListener('click',()=>showReview(+d.dataset.slide)));
if(blocks.length)setInterval(()=>showReview((slide+1)%blocks.length),5500);

let cart=[]; const fmt=n=>new Intl.NumberFormat('vi-VN').format(n)+'₫';
function renderCart(){
  $('#cartCount').textContent=cart.length;
  const box=$('#cartItems');
  if(!cart.length) box.innerHTML='<p class="empty">Chiếc bag đang trống.</p>';
  else box.innerHTML=cart.map((x,i)=>`<div class="cart-item"><div><b>${x.name}</b><small>${fmt(x.price)}</small></div><button class="remove" data-rm="${i}">remove</button></div>`).join('');
  $('#cartTotal').textContent=fmt(cart.reduce((s,x)=>s+x.price,0));
  $$('[data-rm]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.rm,1);renderCart()});
}
$$('.quick-add').forEach(btn=>btn.addEventListener('click',e=>{
  const card=e.currentTarget.closest('.product-card');
  if(card.dataset.link){window.open(card.dataset.link,'_blank','noopener');return;}
  cart.push({name:card.dataset.name,price:+card.dataset.price});renderCart();cartDrawer.classList.add('open');
}));
$('.add-bundle')?.addEventListener('click',e=>{const link=e.currentTarget.dataset.link;if(link)window.open(link,'_blank','noopener')});

const translations={
  navNew:['Nghệ thuật làm giường','The Art of Making a Bed'],navShop:['Lựa chọn của bạn','Your Selection'],navStory:['Mô bedding kể chuyện','Mô Bedding Stories'],navJournal:['Phối giường','Style Your Bed'],navContact:['Liên hệ','Contact'],
  heroTitle:['Ru Tình','Ru Tình'],heroText:['ga gối cho riêng bạn','bedding made just for you'],heroCta:['Nghệ thuật làm giường','The Art of Making a Bed'],
  introEyebrow:['NGHỆ THUẬT LÀM GIƯỜNG','THE ART OF MAKING A BED'],introTitle:['Style bận rộn — 1 phút làm giường','Busy style — make the bed in one minute'],introText:['Ga sát nệm, gối xếp gọn. Một phút, xong.','Fitted sheet in place, pillows neatly stacked. One minute, done.'],
  shopEyebrow:['NGHỆ THUẬT LÀM GIƯỜNG','THE ART OF MAKING A BED'],shopTitle:['Mỗi chiếc giường có một nhịp riêng.','Every bed has its own rhythm.'],viewAll:['Xem thêm →','See more →'],
  storyEyebrow:['MÔ BEDDING KỂ CHUYỆN','MÔ BEDDING STORIES'],storyTitle:['Ngày mới vui','A Happy New Day'],storyText:['Được thức giấc cùng tia nắng xiên xiên qua khe cửa sổ thật là tuyệt. Nếu đủ may mắn ta sẽ cảm nhận được niềm vui, sự đủ đầy mà một tia nắng có thể mang đến. Giờ là năm phút cho “người tình” ga gối.','Waking to a slant of sunlight through the window is wonderful. If we are lucky enough, a ray of sun can bring a sense of joy and fullness. Now, five minutes for our bedding “lover”.'],readStory:['Nghe chuyện →','Read the story →'],
  b1t:['1 phút làm giường','A one-minute bed'],b1d:['Ga sát nệm, gối xếp gọn. Một phút, xong.','Fitted sheet in place, pillows neatly stacked. One minute, done.'],b2t:['Whatever it takes','Whatever it takes'],b2d:['Linen để nhăn, throw phủ lệch. Không vội.','Let linen wrinkle, let the throw fall off-centre. No rush.'],b3t:['Style cool','Cool style'],b3d:['Gối thêu đặt lệch nhịp. Giường như một tấm ảnh.','An embroidered pillow sits slightly off-beat. The bed becomes a picture.'],b4t:['Câu chuyện giường','Bed stories'],b4d:['Mô bedding kể chuyện — 27 câu chuyện và còn tiếp.','Mô Bedding Stories — 27 stories and counting.'],
  productEyebrow:['LỰA CHỌN CỦA BẠN','YOUR SELECTION'],bestTitle:['Những món cho chiếc giường của bạn','Pieces for your bed'],shopAll:['Xem thêm →','See more →'],
  lifeTitle:['Nhớ về tuổi thơ','Remembering Childhood'],lifeText:['Thuở bé ở khu tập thể hay nghe đủ thứ tiếng rao của những người bán rong. Tiếng rao người bán chiếu kéo theo mùi chiếu cói thơm mộc mạc và cả một thời nhà không có điều hòa, không có đệm.','As a child in the old collective housing blocks, street vendors called out all day. The mat seller’s voice brings back the scent of woven rush mats and a time before air-conditioning and mattresses.'],
  materialEyebrow:['NGHỆ THUẬT LÀM GIƯỜNG','THE ART OF MAKING A BED'],matTitle:['Making bed','Making bed'],matText:['Không biết nên gọi “making bed” bằng tiếng Việt là gì cho đúng. Dọn giường? Xếp chăn? Trải lại ga? Chưa từ nào thật sự vừa ý — nhưng cảm giác dành vài phút làm chiếc giường đẹp lên thì rất Mô.','What is the right Vietnamese phrase for “making bed”? Tidying the bed? Folding the duvet? Straightening the sheet? No phrase feels quite right — but spending a few minutes making the bed beautiful feels very Mô.'],learnMore:['Xem nghệ thuật làm giường →','Explore the art of making a bed →'],
  experienceEyebrow:['ĐẶT TRẢI NGHIỆM','BOOK AN EXPERIENCE'],bundleTitle:['Ngủ thử Mô Bedding tại khách sạn','Try Mô Bedding at a hotel'],bundleSet:['Đặt trải nghiệm','Experience'],bundleCta:['Đặt trải nghiệm','Book the experience'],
  susTitle:['27 câu chuyện giường.','27 bed stories.'],susText:['Ngày mới vui. Nhớ về tuổi thơ. Vitamin B1. Thương bạn. Making bed. Gối thêu tay. Feeling sexy… Mô giữ lại những chuyện nhỏ bắt đầu từ chiếc giường.','A Happy New Day. Remembering Childhood. Vitamin B1. Caring for a Friend. Making bed. Hand-embroidered pillows. Feeling sexy… Mô keeps the little stories that begin around a bed.'],storyListLink:['Xem danh sách chuyện →','See all stories →'],
  communityTitle:['Theo dõi Mô trên Instagram','Follow Mô on Instagram'],journalTitle:['Đọc một chuyện trước khi ngủ','A story before sleep'],allStories:['Xem tất cả 27 chuyện →','See all 27 stories →'],j1:['Ngày mới vui','A Happy New Day'],j2:['Vitamin B1','Vitamin B1'],j3:['Feeling sexy','Feeling sexy'],footerTag:['ga gối cho riêng bạn','bedding made just for you'],newsTitle:['Có một câu chuyện muốn kể với Mô?','Have a story to tell Mô?']
};
let lang='vi';
$('#langBtn')?.addEventListener('click',()=>{lang=lang==='vi'?'en':'vi';document.documentElement.lang=lang;$('#langBtn').textContent=lang==='vi'?'EN':'VI';$$('[data-i18n]').forEach(el=>{const t=translations[el.dataset.i18n];if(t)el.innerHTML=t[lang==='vi'?0:1]})});

$('#searchInput')?.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q) alert(`Tìm trong Mô: “${q}”`);}});

$('#contactForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const email=$('#contactEmail')?.value.trim()||'';
  const subject=encodeURIComponent('Hello Mô Bedding');
  const body=encodeURIComponent(`Email của tôi: ${email}\n\nMình muốn liên hệ với Mô.`);
  window.location.href=`mailto:modiphe.bedding@gmail.com?subject=${subject}&body=${body}`;
});

renderCart();

/* Hero photo-film: multiple stills with crossfade + slow camera movement */
const heroEl=document.querySelector('.hero');
if(heroEl){
  const heroFrames=[
    ['hero-photo.jpg','Mô Bedding — Ru Tình','50% 52%'],
    ['linen.jpg','Mô Bedding linen mood','50% 50%'],
    ['pillows.jpg','Mô Bedding pillows','50% 50%'],
    ['window.jpg','Morning light by the bed','50% 50%'],
    ['corner.jpg','A quiet bedroom corner','50% 54%'],
    ['rumple.jpg','Relaxed bedding texture','50% 55%']
  ];
  const originalHero=heroEl.querySelector('.hero-image');
  const stage=document.createElement('div');
  stage.className='hero-slides';
  heroFrames.forEach(([src,alt,pos],i)=>{
    const img=document.createElement('img');
    img.src=src; img.alt=alt; img.className='hero-slide'+(i===0?' active':'');
    img.style.objectPosition=pos;
    img.decoding='async';
    if(i===0) img.fetchPriority='high';
    stage.appendChild(img);
  });
  originalHero?.replaceWith(stage);

  const progress=document.createElement('div');
  progress.className='hero-progress';
  progress.setAttribute('aria-label','Hero slides');
  heroFrames.forEach((_,i)=>{
    const button=document.createElement('button');
    button.type='button'; button.className=i===0?'active':'';
    button.setAttribute('aria-label',`Slide ${i+1}`);
    progress.appendChild(button);
  });
  heroEl.appendChild(progress);

  const heroSlides=[...stage.querySelectorAll('.hero-slide')];
  const heroDots=[...progress.querySelectorAll('button')];
  let heroIndex=0;
  const showHero=n=>{
    heroIndex=(n+heroSlides.length)%heroSlides.length;
    heroSlides.forEach((img,i)=>img.classList.toggle('active',i===heroIndex));
    heroDots.forEach((dot,i)=>dot.classList.toggle('active',i===heroIndex));
  };
  heroDots.forEach((dot,i)=>dot.addEventListener('click',()=>showHero(i)));
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(()=>showHero(heroIndex+1),4800);}
}
