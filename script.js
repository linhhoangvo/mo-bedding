const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const searchOverlay = $('#searchOverlay');
const cartDrawer = $('#cartDrawer');
const mobileMenu = $('#mobileMenu');

$('#searchBtn')?.addEventListener('click', () => searchOverlay?.classList.add('open'));
$('#cartBtn')?.addEventListener('click', () => cartDrawer?.classList.add('open'));
$('#menuBtn')?.addEventListener('click', () => mobileMenu?.classList.add('open'));
$('#menuClose')?.addEventListener('click', () => mobileMenu?.classList.remove('open'));
$$('[data-close]').forEach(b => b.addEventListener('click', () => {
  if (b.dataset.close === 'search') searchOverlay?.classList.remove('open');
  else cartDrawer?.classList.remove('open');
}));
$$('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu?.classList.remove('open')));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchOverlay?.classList.remove('open');
    cartDrawer?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  }
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .08 });
$$('.reveal').forEach(el => revealObserver.observe(el));

let slide = 0;
const blocks = $$('.reviews blockquote');
const dots = $$('.review-dots button');
function showReview(n) {
  if (!blocks.length) return;
  slide = n;
  blocks.forEach(b => b.style.transform = `translateX(-${n * 100}%)`);
  dots.forEach((d, i) => d.classList.toggle('active', i === n));
}
dots.forEach(d => d.addEventListener('click', () => showReview(+d.dataset.slide)));
if (blocks.length) setInterval(() => showReview((slide + 1) % blocks.length), 5500);

let cart = [];
const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + '₫';
function renderCart() {
  if ($('#cartCount')) $('#cartCount').textContent = cart.length;
  const box = $('#cartItems');
  if (box) {
    if (!cart.length) box.innerHTML = '<p class="empty">Chiếc bag đang trống.</p>';
    else box.innerHTML = cart.map((x, i) => `<div class="cart-item"><div><b>${x.name}</b><small>${fmt(x.price)}</small></div><button class="remove" data-rm="${i}">remove</button></div>`).join('');
  }
  if ($('#cartTotal')) $('#cartTotal').textContent = fmt(cart.reduce((s, x) => s + x.price, 0));
  $$('[data-rm]').forEach(b => b.onclick = () => { cart.splice(+b.dataset.rm, 1); renderCart(); });
}

$$('.quick-add').forEach(btn => btn.addEventListener('click', e => {
  const card = e.currentTarget.closest('.product-card');
  if (!card) return;
  if (card.dataset.link) {
    window.open(card.dataset.link, '_blank', 'noopener');
    return;
  }
  cart.push({ name: card.dataset.name, price: +card.dataset.price });
  renderCart();
  cartDrawer?.classList.add('open');
}));

$('.add-bundle')?.addEventListener('click', e => {
  const link = e.currentTarget.dataset.link;
  if (link) window.open(link, '_blank', 'noopener');
});

const translations = {
  navNew:['Nghệ thuật làm giường','The Art of Making a Bed'],
  navShop:['Lựa chọn của bạn','Your Selection'],
  navStory:['Mô bedding kể chuyện','Mô Bedding Stories'],
  navJournal:['Phối giường','Style Your Bed'],
  navContact:['Liên hệ','Contact'],
  heroTitle:['Ru Tình','Ru Tình'],
  heroText:['ga gối cho riêng bạn','bedding made just for you'],
  heroCta:['Nghệ thuật làm giường','The Art of Making a Bed'],
  shopEyebrow:['NGHỆ THUẬT LÀM GIƯỜNG','THE ART OF MAKING A BED'],
  shopTitle:['Mỗi chiếc giường có một nhịp riêng.','Every bed has its own rhythm.'],
  viewAll:['Xem thêm →','See more →'],
  storyEyebrow:['MÔ BEDDING KỂ CHUYỆN','MÔ BEDDING STORIES'],
  storyTitle:['Ngày mới vui','A Happy New Day'],
  storyText:['Được thức giấc cùng tia nắng xiên xiên qua khe cửa sổ thật là tuyệt. Nếu đủ may mắn ta sẽ cảm nhận được niềm vui, sự đủ đầy mà một tia nắng có thể mang đến. Giờ là năm phút cho “người tình” ga gối.','Waking to a slant of sunlight through the window is wonderful. If we are lucky enough, a ray of sun can bring a sense of joy and fullness. Now, five minutes for our bedding “lover”.'],
  readStory:['Nghe chuyện →','Read the story →'],
  productEyebrow:['LỰA CHỌN CỦA BẠN','YOUR SELECTION'],
  bestTitle:['Những món cho chiếc giường của bạn','Pieces for your bed'],
  shopAll:['Xem thêm →','See more →'],
  lifeTitle:['Nhớ về tuổi thơ','Remembering Childhood'],
  lifeText:['Thuở bé ở khu tập thể hay nghe đủ thứ tiếng rao của những người bán rong. Tiếng rao người bán chiếu kéo theo mùi chiếu cói thơm mộc mạc và cả một thời nhà không có điều hòa, không có đệm.','As a child in the old collective housing blocks, street vendors called out all day. The mat seller’s voice brings back the scent of woven rush mats and a time before air-conditioning and mattresses.'],
  materialEyebrow:['NGHỆ THUẬT LÀM GIƯỜNG','THE ART OF MAKING A BED'],
  matTitle:['Making bed','Making bed'],
  matText:['Không biết nên gọi “making bed” bằng tiếng Việt là gì cho đúng. Dọn giường? Xếp chăn? Trải lại ga? Chưa từ nào thật sự vừa ý — nhưng cảm giác dành vài phút làm chiếc giường đẹp lên thì rất Mô.','What is the right Vietnamese phrase for “making bed”? Tidying the bed? Folding the duvet? Straightening the sheet? No phrase feels quite right — but spending a few minutes making the bed beautiful feels very Mô.'],
  learnMore:['Xem nghệ thuật làm giường →','Explore the art of making a bed →'],
  experienceEyebrow:['ĐẶT TRẢI NGHIỆM','BOOK AN EXPERIENCE'],
  bundleTitle:['Ngủ thử Mô Bedding tại khách sạn','Try Mô Bedding at a hotel'],
  bundleSet:['Đặt trải nghiệm','Experience'],
  bundleCta:['Đặt trải nghiệm','Book the experience'],
  communityTitle:['Theo dõi Mô trên Instagram','Follow Mô on Instagram'],
  footerTag:['ga gối cho riêng bạn','bedding made just for you'],
  newsTitle:['Có một câu chuyện muốn kể với Mô?','Have a story to tell Mô?']
};

let lang = 'vi';
$('#langBtn')?.addEventListener('click', () => {
  lang = lang === 'vi' ? 'en' : 'vi';
  document.documentElement.lang = lang;
  $('#langBtn').textContent = lang === 'vi' ? 'EN' : 'VI';
  $$('[data-i18n]').forEach(el => {
    const t = translations[el.dataset.i18n];
    if (t) el.innerHTML = t[lang === 'vi' ? 0 : 1];
  });
});

$('#searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) alert(`Tìm trong Mô: “${q}”`);
  }
});

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#contactEmail')?.value.trim() || '';
  const subject = encodeURIComponent('Hello Mô Bedding');
  const body = encodeURIComponent(`Email của tôi: ${email}\n\nMình muốn liên hệ với Mô.`);
  window.location.href = `mailto:modiphe.bedding@gmail.com?subject=${subject}&body=${body}`;
});

renderCart();

/* Hero photo-film */
const heroEl = document.querySelector('.hero');
if (heroEl) {
  const heroFrames = [
    ['hero-photo.jpg','Mô Bedding — Ru Tình','50% 52%'],
    ['linen.jpg','Mô Bedding linen mood','50% 50%'],
    ['pillows.jpg','Mô Bedding pillows','50% 50%'],
    ['window.jpg','Morning light by the bed','50% 50%'],
    ['corner.jpg','A quiet bedroom corner','50% 54%'],
    ['rumple.jpg','Relaxed bedding texture','50% 55%']
  ];
  const originalHero = heroEl.querySelector('.hero-image');
  const stage = document.createElement('div');
  stage.className = 'hero-slides';
  heroFrames.forEach(([src, alt, pos], i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'hero-slide' + (i === 0 ? ' active' : '');
    img.style.objectPosition = pos;
    img.decoding = 'async';
    if (i === 0) img.fetchPriority = 'high';
    stage.appendChild(img);
  });
  originalHero?.replaceWith(stage);

  const progress = document.createElement('div');
  progress.className = 'hero-progress';
  progress.setAttribute('aria-label', 'Hero slides');
  heroFrames.forEach((_, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = i === 0 ? 'active' : '';
    button.setAttribute('aria-label', `Slide ${i + 1}`);
    progress.appendChild(button);
  });
  heroEl.appendChild(progress);

  const heroSlides = [...stage.querySelectorAll('.hero-slide')];
  const heroDots = [...progress.querySelectorAll('button')];
  let heroIndex = 0;
  const showHero = n => {
    heroIndex = (n + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((img, i) => img.classList.toggle('active', i === heroIndex));
    heroDots.forEach((dot, i) => dot.classList.toggle('active', i === heroIndex));
  };
  heroDots.forEach((dot, i) => dot.addEventListener('click', () => showHero(i)));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => showHero(heroIndex + 1), 4800);
  }
}

/* Mô Bedding — 27 stories kept inside this site */
const moStories = [
  {status:'Chuyện',title:'Ngày mới vui',desc:'Được thức giấc cùng tia nắng xiên xiên qua khe cửa sổ thật là tuyệt. Nếu đủ may mắn ta sẽ cảm nhận được…',img:'corner.jpg'},
  {status:'Nháp',title:'Nhiều năng lượng',desc:'Dậy sớm chuẩn bị cho một chuyến đi.',img:'window.jpg'},
  {status:'Chuyện',title:'Nhớ về tuổi thơ',desc:'Thuở bé ở khu tập thể hay nghe đủ thứ tiếng rao của những người bán rong. Không hiểu sao tiếng rao của một…',img:'linen.jpg'},
  {status:'Nháp',title:'Cái đệm mới',desc:'Dắt tấm trải quanh cái đệm rất dày và nhớ lần đầu được nằm đệm.',img:'rumple.jpg'},
  {status:'Chuyện',title:'Vitamin B1',desc:'Có cái gì cộm cộm dưới chăn. Ơ, không biết ai để lọ vitamin B1 trên giường vậy nhỉ? Viên B1 và câu chuyện…',img:'pillows.jpg'},
  {status:'Nháp',title:'Phong thuỷ',desc:'Tỉnh dậy sau giấc ngủ ngon, chồng kể chuyện nhắc đến từ phong thuỷ.',img:'green.jpg'},
  {status:'Nháp',title:'Màu ngày mưa',desc:'Trời mưa, có chút buồn nhẹ nhẹ.',img:'green.jpg'},
  {status:'Nháp',title:'Lucky underwear',desc:'Nhận được điện thoại của Steve, nhớ câu chuyện Patty nói về “a lucky under wear của Steve”.',img:'pillows.jpg'},
  {status:'Nháp',title:'Dặn con trai',desc:'Ngang qua con phố cũ có nhà anh họ, nhớ lần đi qua phòng cô cháu gái.',img:'corner.jpg'},
  {status:'Chuyện',title:'Thương bạn',desc:'Đi công tác Sài gòn, về nhà cô bạn thân ngủ mấy đêm. Dậy thì bạn đã đi làm từ sớm, ghé ngang phòng bạn,…',img:'window.jpg'},
  {status:'Nháp',title:'Lây cảm hứng cho bạn',desc:'Bạn không biết cách làm giường.',img:'linen.jpg'},
  {status:'Chuyện',title:'Making bed',desc:'Không biết nên gọi “making bed” bằng tiếng Việt là gì cho đúng. Dọn giường? Xếp chăn? Trải lại ga? Chưa từ…',img:'rumple.jpg'},
  {status:'Nháp',title:'Tò mò',desc:'Hỏi bạn về việc làm giường buổi sáng (phỏng vấn bạn bè).',img:'pillows.jpg'},
  {status:'Nháp',title:'Cô đơn',desc:'Ở nhà một mình.',img:'green.jpg'},
  {status:'Nháp',title:'Công chúa và hạt đậu',desc:'Câu chuyện này Mô đang viết.',img:'green.jpg'},
  {status:'Nháp',title:'Em Híp',desc:'Câu chuyện này Mô đang viết.',img:'pillows.jpg'},
  {status:'Nháp',title:'Chăn đệm đắt tiền',desc:'Đến thăm nhà người nổi tiếng.',img:'corner.jpg'},
  {status:'Chuyện',title:'Gối thêu tay',desc:'Nghỉ đêm ở Camfusion, một căn phòng airBNB xinh xắn, được chăm sóc rất kỹ lưỡng và thứ khiến mình nhớ lâu…',img:'window.jpg'},
  {status:'Nháp',title:'Chăn đệm khách sạn 5 sao',desc:'Ở phòng khách sạn 5 sao.',img:'linen.jpg'},
  {status:'Nháp',title:'Mất ngủ',desc:'Một đêm mất ngủ.',img:'rumple.jpg'},
  {status:'Nháp',title:'“Người tình” forever',desc:'Câu chuyện này Mô đang viết.',img:'pillows.jpg'},
  {status:'Nháp',title:'Màn chống muỗi',desc:'Ngủ nhà bạn có muỗi.',img:'green.jpg'},
  {status:'Nháp',title:'Ngủ với áo của mẹ',desc:'Chuyện em bé ôm áo mẹ đi ngủ.',img:'green.jpg'},
  {status:'Chuyện',title:'Feeling sexy',desc:'Vô tình nghe một đoạn clip nói về chuyện chăn gối, đoạn clip nhẹ nhàng nhắc đến cảm giác được chạm, được…',img:'pillows.jpg'},
  {status:'Nháp',title:'Hài lòng với bản thân',desc:'Nhận xét của bác Phương về giường của con trai.',img:'corner.jpg'},
  {status:'Nháp',title:'Một ngày người không khoẻ',desc:'Ngủ dậy với cảm giác uể oải.',img:'window.jpg'},
  {status:'Nháp',title:'“Nhà gọn thích nhỉ”',desc:'Tâm sự của một người bạn trai.',img:'linen.jpg'}
];

/* Reserve #story for the complete 27-story catalogue. */
const storyFeature = document.querySelector('.story-split');
if (storyFeature) storyFeature.id = 'story-featured';

const storySection = document.querySelector('.journal');
if (storySection) {
  storySection.id = 'story';
  storySection.classList.add('story-list-section');
  storySection.innerHTML = `
    <div class="story-list-intro">
      <p class="eyebrow">MÔ BEDDING KỂ CHUYỆN</p>
      <h2>Danh sách chuyện</h2>
      <p>27 câu chuyện giường.</p>
    </div>
    <div class="story-list-grid">
      ${moStories.map((story, i) => `
        <article class="story-list-card ${story.status === 'Nháp' ? 'is-draft' : ''}">
          <div class="story-list-image"><img src="${story.img}" alt="${story.title}" loading="lazy" decoding="async"></div>
          <div class="story-list-meta"><span class="story-list-status">${story.status}</span><span class="story-list-number">${String(i + 1).padStart(2, '0')}</span></div>
          <h3>${story.title}</h3>
          <p>${story.desc}</p>
        </article>`).join('')}
    </div>`;
}

const storyLeadLink = document.querySelector('.story-copy .line-link');
if (storyLeadLink) {
  storyLeadLink.href = '#story';
  storyLeadLink.removeAttribute('target');
  storyLeadLink.removeAttribute('rel');
  storyLeadLink.removeAttribute('data-i18n');
  storyLeadLink.textContent = 'Xem danh sách chuyện →';
}

/* When opening the direct /#story URL, land on the 27-story catalogue after JS assigns the id. */
if (location.hash === '#story' && storySection) {
  requestAnimationFrame(() => storySection.scrollIntoView({ block: 'start' }));
}
