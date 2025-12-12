///////////////////////////////////////////////////////
/* 활성화, 비활성화된 페이지를 표시해주는 함수 setHeader */
///////////////////////////////////////////////////////
function setHeader(page) {
  const cPage = page - 1; // 현재 페이지 인덱스

  const headerListEl = document.querySelector('.header__list');
  const sideBarListEl = document.querySelector('.sideBar__list');
  if (!headerListEl || !sideBarListEl) return;

  const headerListAll = headerListEl.children;
  const navListAll = sideBarListEl.children;

  for (let i = 0; i < headerListAll.length; i++) {
    headerListAll[i].classList.remove('header__list__li__active');
    navListAll[i].classList.remove('sideBar__list__li__active');
  }

  if (headerListAll[cPage]) headerListAll[cPage].classList.add('header__list__li__active');
  if (navListAll[cPage]) navListAll[cPage].classList.add('sideBar__list__li__active');
}
///////////////////////////////////////////////////////
/* setHeader 함수 끝남                                */
///////////////////////////////////////////////////////

// 원페이지 스크롤 기능 완전 제거 - 일반 웹페이지처럼 자유 스크롤
window.addEventListener('load', () => {
  setHeader(1);
});

/* Simple slider implementation (slick-like 기본 기능) */
class SimpleSlider {
  constructor(root, options = {}) {
    this.root = root;
    this.slidesWrap = root.querySelector('.slides');
    this.slides = Array.from(root.querySelectorAll('.slide'));
    this.prevBtn = root.querySelector('.slider__prev');
    this.nextBtn = root.querySelector('.slider__next');
    this.dotsWrap = root.querySelector('.slider__dots');
    this.current = 0;
    this.timer = null;
    this.options = Object.assign({ autoplay: true, interval: 3000, pauseOnHover: true }, options);
    this.isDragging = false;
    this.startX = 0;
    this.deltaX = 0;
    this.isHovered = false;
  }

  init() {
    if (!this.root || this.slides.length === 0) return;
    this.update();
    this.createDots();
    this.bind();
    if (this.options.autoplay) this.startAutoplay();
  }

  update() {
    // CSS controls widths: each .slide is flex:0 0 100%; just ensure transform matches current index
    this.goTo(this.current, false);
  }

  createDots() {
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = '';
    this.slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => this.goTo(i));
      if (i === this.current) btn.classList.add('active');
      this.dotsWrap.appendChild(btn);
    });
  }

  bind() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    if (this.options.pauseOnHover) {
      this.root.addEventListener('mouseenter', () => {
        this.isHovered = true;
        this.stopAutoplay();
      });
      this.root.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.startAutoplay();
      });
    }

    // touch / drag support
    this.slidesWrap.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: true });
    this.slidesWrap.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: true });
    this.slidesWrap.addEventListener('touchend', (e) => this.onTouchEnd(e));

    // resize
    window.addEventListener('resize', () => this.update());
  }

  onTouchStart(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.deltaX = 0;
    this.stopAutoplay();
  }

  onTouchMove(e) {
    if (!this.isDragging) return;
    const x = e.touches[0].clientX;
    this.deltaX = x - this.startX;
  }

  onTouchEnd() {
    this.isDragging = false;
    if (Math.abs(this.deltaX) > 50) {
      if (this.deltaX < 0) this.next();
      else this.prev();
    }
    this.deltaX = 0;
    if (this.options.autoplay && !this.isHovered) this.startAutoplay();
  }

  goTo(index, animate = true) {
    if (index < 0) index = 0;
    if (index >= this.slides.length) index = this.slides.length - 1;
    this.current = index;
    const offset = -100 * index; // each slide is 100% width
    if (!animate) this.slidesWrap.style.transition = 'none';
    else this.slidesWrap.style.transition = '';
    this.slidesWrap.style.transform = `translateX(${offset}%)`;
    this.updateDots();
  }

  next() {
    const nextIndex = this.current + 1 >= this.slides.length ? 0 : this.current + 1;
    this.goTo(nextIndex);
  }

  prev() {
    const prevIndex = this.current - 1 < 0 ? this.slides.length - 1 : this.current - 1;
    this.goTo(prevIndex);
  }

  updateDots() {
    if (!this.dotsWrap) return;
    Array.from(this.dotsWrap.children).forEach((b, i) => {
      b.classList.toggle('active', i === this.current);
    });
  }

  startAutoplay() {
    if (!this.options.autoplay) return;
    this.stopAutoplay();
    this.timer = setInterval(() => this.next(), this.options.interval || 3000);
  }

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderEl = document.getElementById('portfolio-slider');
  if (sliderEl) {
    const slider = new SimpleSlider(sliderEl, { autoplay: true, interval: 3000, pauseOnHover: true });
    slider.init();
  }
});

// 스크롤 위치에 따라 헤더/네비게이션 활성화 상태 업데이트
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  let currentPage = 1;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      currentPage = index + 1;
    }
  });

  setHeader(currentPage);
});

///////////////////////////////////////////////////////////////////////////
/* headerlist, SidebarList 클릭 시, 스크롤 이동 */
///////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const headerItems = document.querySelectorAll('.header__list li');
  headerItems.forEach((li) => {
    li.addEventListener('click', function () {
      const parent = this.parentElement;
      const index = Array.prototype.indexOf.call(parent.children, this) + 1;
      const section = document.querySelectorAll('.section')[index - 1];
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sideItems = document.querySelectorAll('.sideBar__list li');
  sideItems.forEach((li) => {
    li.addEventListener('click', function () {
      const parent = this.parentElement;
      const index = Array.prototype.indexOf.call(parent.children, this) + 1;
      const section = document.querySelectorAll('.section')[index - 1];
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

