// 컨테이너랑 li요소 가져오기 이때 listItems는 Collection 형태임
const keywordListContainer = document.querySelector(".keywordList__container");
const keywordListItems = keywordListContainer.querySelectorAll("li");

// http://dew-dew.com/ 해당 사이트 참조하여 한땀한땀 가져온 눈물의 배열..
let translateZArray = [0, -20, -60, -80, -60, -20]; // translateZ 값
let opacityValues = [1, 0.75, 0.25, 0, 0.25, 0.75]; // opacity(투명도) 값
let translateYArray = [0, 173.205, 173.205, 2.44929e-14, -173.205, -173.205]; // 이게 맞냐?
let currentIndex = 0;

// 값 업데이트 함수 updateTransform
function updateTransform() {
  // 현재 적용되는 값의 인덱스를 업데이트, currentIndex값은 한정됨 (0, 1, 2, 3, 4, 5)
  // (0 + 1) % 6 == 1 ... (5 + 1) % 6 == 0 으로 인덱스 값이 배열의 범위를 넘어가지 않게
  // %는 나머지를 가져오는 연산자, currentIndex는 배열 범위를 넘지 못함
  currentIndex = (currentIndex + 1) % keywordListItems.length;

  // index : 현재 요소의 인덱스 값
  // currentIndex : 현재 적용되는 값의 인덱스 값
  keywordListItems.forEach((item, index) => {
    const translateZ = translateZArray[(index + currentIndex) % translateZArray.length];
    const translateY = translateYArray[(index + currentIndex) % translateYArray.length];

    item.style.transform = `perspective(100px) translateZ(${translateZ}px) translateY(${translateY}%)`;
    item.style.opacity = opacityValues[(index + currentIndex) % opacityValues.length];
  });
}

// 업데이트의 주기는 1초(1000ms)임.
setInterval(updateTransform, 1000);
