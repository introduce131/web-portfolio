window.addEventListener("wheel", function(e){
    e.preventDefault();
},{passive : false});

var mHtml = $("html");
var page = 1;

// 페이지 로드 시 실행할 구문, useEffect((), []) 와 같음
window.onload = () => {
    setHeader(1);
}

// 처음 기본 Home 페이지, 1페이지에 해당함
mHtml.animate({scrollTop : 0},10);

$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(page == 5) return;   // 마지막 페이지는 더 못내립니다.
        page++;

        setHeader(page);    // 현재 페이지를 보여줘야함
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 1) return;
        page--;

        setHeader(page);    // 현재 페이지를 보여줘야함
    }
    var posTop =(page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop}, 750);
})

// 활성화, 비활성화된 페이지를 표시해주는 함수 setHeader
function setHeader(page) {
    const cPage = page - 1;     // 현재 페이지를 저장한 변수, 사용할 일 많음.

    /* 헤더 바 */
    const activeHeaderList = $(".header__list")[0].children[cPage];
    const headerListAll = $(".header__list")[0].children;
    let unActiveHeadList = [];

    /* 오른쪽 네비게이션 바 */
    const activeNavList = $(".sideBar__list")[0].children[cPage];
    const navListAll = $(".sideBar__list")[0].children;
    let unActiveNavList = [];

    // Array.push()를 통한, HTMLCollection -> Array로 변환하는 작업
    for(let i = 0; i<headerListAll.length; i++) {
        unActiveHeadList.push(headerListAll[i]);
        unActiveNavList.push(navListAll[i]);
    }

    // splice 함수로 비활성화된 페이지의 배열을 얻을 수 있다.
    unActiveHeadList.splice(cPage, 1);
    unActiveNavList.splice(cPage, 1);

    // 현재 활성화 된 페이지에 해당하는 헤더, 네비게이션에 active css 추가
    activeHeaderList.classList.add("header__list__li__active");
    activeNavList.classList.add("sideBar__list__li__active");

    // 비활성화 된 페이지(4페이지)에 대한 요소는 active css 제거
    for(let i=0; i<unActiveHeadList.length; i++) {
        unActiveHeadList[i].classList.remove("header__list__li__active");
        unActiveHeadList[i].removeAttribute('class');   // class 요소가 안남게 아예 삭제
        unActiveNavList[i].classList.remove("sideBar__list__li__active");
        unActiveNavList[i].removeAttribute('class');
    }
}