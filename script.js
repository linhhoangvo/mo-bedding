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
function showReview(n){slide=n;blocks.forEach(b=>b.style.transform=`translateX(-${n*100}%)`);dots.forEach((d,i)=>d.classList.toggle('active',i===n))}
dots.forEach(d=>d.addEventListener('click',()=>showReview(+d.dataset.slide)));
setInterval(()=>showReview((slide+1)%blocks.length),5500);

let cart=[]; const fmt=n=>new Intl.NumberFormat('vi-VN').format(n)+'₫';
function renderCart(){
  $('#cartCount').textContent=cart.length;
  const box=$('#cartItems');
  if(!cart.length) box.innerHTML='<p class="empty">Chiếc bag đang trống.</p>';
  else box.innerHTML=cart.map((x,i)=>`<div class="cart-item"><div><b>${x.name}</b><small>${fmt(x.price)}</small></div><button class="remove" data-rm="${i}">remove</button></div>`).join('');
  $('#cartTotal').textContent=fmt(cart.reduce((s,x)=>s+x.price,0));
  $$('[data-rm]').forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.rm,1);renderCart()});
}
$$('.quick-add').forEach(btn=>btn.addEventListener('click',e=>{const card=e.currentTarget.closest('.product-card');cart.push({name:card.dataset.name,price:+card.dataset.price});renderCart();cartDrawer.classList.add('open')}));
$('.add-bundle')?.addEventListener('click',()=>{cart.push({name:'Complete Your Bed Bundle',price:4390000});renderCart();cartDrawer.classList.add('open')});

const translations={
  navNew:['Bộ sưu tập mới','New Collection'],navShop:['Sản phẩm','Shop'],navStory:['Chuyện của Mô','Our Story'],navJournal:['Bedding Story','Bedding Story'],navContact:['Liên hệ','Contact'],
  heroTitle:['Ngủ mềm hơn.<br>Sống chậm hơn.','Sleep softer.<br>Live slower.'],heroText:['Bộ chăn ga từ lụa tre dành cho những căn phòng muốn giữ lại chút dịu dàng.','Bamboo bedding for rooms that want to hold on to a little softness.'],heroCta:['Khám phá bộ sưu tập','Explore the collection'],
  introEyebrow:['BỘ SƯU TẬP MỚI · 2026','NEW COLLECTION · 2026'],introTitle:['A bed should feel like coming home.','A bed should feel like coming home.'],introText:['Mô tạo nên những lớp vải chạm nhẹ vào da, phối màu như một căn phòng có nắng và để từng chiếc giường mang một tính cách riêng.','Mô creates soft layers, sun-washed colours and bedding with a personality of its own.'],
  shopEyebrow:['CHỌN THEO CẢM GIÁC','SHOP BY MOOD'],shopTitle:['Tìm thứ hợp với chiếc giường của bạn','Find what belongs on your bed'],viewAll:['Xem tất cả →','View all →'],
  storyEyebrow:['CHUYỆN CỦA MÔ','OUR STORY'],storyTitle:['Không chỉ là ga giường. Là cách căn phòng khiến bạn muốn ở lại.','Not just bedding. A reason to stay a little longer.'],storyText:['Mô bắt đầu từ một câu hỏi rất nhỏ: điều gì khiến ta thật sự muốn trở về chiếc giường của mình? Câu trả lời không nằm ở sự cầu kỳ, mà ở chất liệu dịu, màu sắc có cảm xúc và những chi tiết vừa đủ.','Mô began with a small question: what makes us truly want to return to our own bed? We found the answer in gentle materials, emotional colour and details that never try too hard.'],readStory:['Đọc câu chuyện của Mô →','Read our story →'],
  b1t:['Mềm & mát','Soft & cool'],b1d:['Êm trên da, thoáng trong khí hậu nhiệt đới.','Gentle on skin, breathable in tropical weather.'],b2t:['Lụa tre','Bamboo silk'],b2d:['Bề mặt mịn, rủ đẹp và có cảm giác tự nhiên.','Smooth, fluid and naturally tactile.'],b3t:['Dùng lâu','Made to last'],b3d:['Thiết kế để yêu lâu hơn một mùa.','Designed to be loved beyond one season.'],b4t:['Phối có gu','Easy to layer'],b4d:['Bảng màu để bạn mix, không cần mua nguyên set.','A palette made to mix, not match.'],
  bestTitle:['Những món được yêu nhiều nhất','Most-loved pieces'],shopAll:['Xem tất cả →','Shop all →'],lifeTitle:['Chậm thêm năm phút cũng được.','Five more minutes is allowed.'],lifeText:['Ánh nắng, một chiếc giường chưa vội gấp và buổi sáng không cần bắt đầu quá nhanh.','Sunlight, an unmade bed, and a morning that does not need to start too quickly.'],
  matTitle:['Lụa tre — vì giấc ngủ cũng cần thở.','Bamboo silk — because sleep needs to breathe.'],matText:['Mô chọn lụa tre vì cảm giác mát, mềm, rủ và phù hợp với những đêm nóng ẩm. Quan trọng hơn, nó tạo nên một bề mặt rất “Mô”: dịu mắt và dịu da.','We choose bamboo silk for its cool touch, soft drape and comfort in warm, humid nights. Most of all, it feels unmistakably Mô: gentle to the eye and to the skin.'],learnMore:['Tìm hiểu về chất liệu →','Learn about our material →'],
  bundleTitle:['Một chiếc giường, nhiều lớp cảm xúc.','One bed, many layers of feeling.'],bundleSet:['Trọn bộ','Complete set'],bundleCta:['Thêm cả set vào bag','Add the look to bag'],
  susTitle:['Đẹp vừa đủ. Có trách nhiệm vừa thật.','Beautiful enough. Responsible for real.'],susText:['Mô ưu tiên chất liệu có vòng đời dài, đóng gói tối giản và sản xuất theo nhịp vừa phải. Không nói quá lớn về “xanh” — chỉ cố gắng làm từng lựa chọn tốt hơn.','We favour longer-lasting materials, restrained packaging and a slower production rhythm. We do not shout about being green — we simply try to make better choices, one by one.'],
  communityTitle:['Mô trong những căn phòng thật','Mô in real rooms'],journalTitle:['Đọc trước khi ngủ','Stories for before sleep'],allStories:['Xem tất cả story →','See all stories →'],j1:['Giặt lụa tre thế nào để càng dùng càng mềm?','How to wash bamboo bedding so it gets softer with time'],j2:['Phòng ngủ mùa nóng: ít đồ hơn, ngủ sâu hơn.','Warm-weather bedrooms: less clutter, deeper sleep'],j3:['Cách phối một chiếc giường không cần “đồng bộ”.','How to style a bed without matching everything'],footerTag:['Cho những chiếc giường bạn luôn muốn quay về.','For beds you want to come back to.'],newsTitle:['Thi thoảng Mô gửi một lá thư dễ ngủ.','Occasionally, Mô sends a letter for slower nights.']
};
let lang='vi';
$('#langBtn')?.addEventListener('click',()=>{lang=lang==='vi'?'en':'vi';document.documentElement.lang=lang;$('#langBtn').textContent=lang==='vi'?'EN':'VI';$$('[data-i18n]').forEach(el=>{const t=translations[el.dataset.i18n];if(t)el.innerHTML=t[lang==='vi'?0:1]})});

$('#searchInput')?.addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.trim();if(q) alert(`Demo search: “${q}”`);}});
renderCart();
