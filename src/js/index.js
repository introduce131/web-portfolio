///////////////////////////////////////////////////////
/* 활성화, 비활성화된 페이지를 표시해주는 함수 setHeader */
///////////////////////////////////////////////////////
function setHeader(page) {
  const cPage = page - 1; // 현재 페이지를 저장한 변수, 사용할 일 많음.

  /* 헤더 바 */
  const activeHeaderList = $(".header__list")[0].children[cPage];
  const headerListAll = $(".header__list")[0].children;

  /* 오른쪽 네비게이션 바 */
  const activeNavList = $(".sideBar__list")[0].children[cPage];
  const navListAll = $(".sideBar__list")[0].children;

  // 비활성화된 페이지에 대한 요소는 active 클래스 제거
  for (let i = 0; i < headerListAll.length; i++) {
    headerListAll[i].classList.remove("header__list__li__active");
    navListAll[i].classList.remove("sideBar__list__li__active");
  }

  // 현재 활성화된 페이지에 해당하는 헤더, 네비게이션에 active 클래스 추가
  activeHeaderList.classList.add("header__list__li__active");
  activeNavList.classList.add("sideBar__list__li__active");
}
///////////////////////////////////////////////////////
/* setHeader 함수 끝남                                */
///////////////////////////////////////////////////////

//////////////////////////
/* 원페이지 스크롤 소스임 */
//////////////////////////
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

var mHtml = $("html");
var page = 1;

// 페이지 로드 시 실행할 구문, useEffect((), []) 와 같음
window.onload = () => {
  setHeader(1);
};

// 처음 기본 Home 페이지, 1페이지에 해당함
mHtml.animate({ scrollTop: 0 }, 10);

$(window).on("wheel", function (e) {
  if (mHtml.is(":animated")) return;
  if (e.originalEvent.deltaY > 0) {
    if (page == 5) return; // 마지막 페이지는 더 못내립니다.
    page++;

    setHeader(page); // 현재 페이지를 보여줘야함
  } else if (e.originalEvent.deltaY < 0) {
    if (page == 1) return;
    page--;

    setHeader(page); // 현재 페이지를 보여줘야함
  }
  var posTop = (page - 1) * $(window).height();
  mHtml.animate({ scrollTop: posTop }, 750);
});
/////////////////////////////
/* 원페이지 스크롤 소스 끝임 */
/////////////////////////////

///////////////////////////////////////////////////////////////////////////
/* headerlist, SidebarList 클릭 시, 하이퍼링크 및 부드러운 모션 제공하는거임 */
///////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
  // 헤더 목록 클릭 이벤트
  $(".header__list li").click(function () {
    var index = $(this).index() + 1; // 인덱스는 0부터 시작하므로 1을 더함
    setHeader(index);
    page = index; // 그리고 전역변수 page에 현재 인덱스값 저장

    var section = $(".section").eq(index - 1); // 다시 1빼면 됨
    $("html, body").animate(
      {
        scrollTop: section.offset().top,
      },
      1000
    );
  });

  // 사이드바 목록 클릭 이벤트
  $(".sideBar__list li").click(function () {
    var index = $(this).index() + 1; // 1더하기
    setHeader(index);
    page = index; // 그리고 전역변수 page에 현재 인덱스값 저장

    var section = $(".section").eq(index - 1); // 다시 1 빼기
    $("html, body").animate(
      {
        scrollTop: section.offset().top,
      },
      1000
    );
  });
});
