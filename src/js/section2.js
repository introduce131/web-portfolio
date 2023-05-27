/*
    translateZ : 0 → -20 → -60 → -80 →-60 → -20
    translateY : 알아서 고치세요
    opacity : 0 → 0.25 → 0.75 → 1 → 0.75 → 0.25
    perspctive : 100px 고정
*/

var listArray = document.querySelectorAll(".keywordList__container ul")[0].children;

console.log(listArray);

for (let i = 0; i < listArray.length; i++) {
  console.log(listArray[i].getBoundingClientRect());
  listArray[i].setAttribute("style", `top:${(i + 1) * 68}px`);
}

i = 0; // 돌려쓰기 위해서 0으로 초기화함

setInterval(() => {
  if (i >= listArray.length) i = 0;

  const sltdItem = listArray[i];
  sltdItem.setAttribute("style", `top:${0}px;`);

  // 트랜지션 시간(0.5초) 후, 다시 초기화
  setTimeout(() => {}, 500);

  i++;

  // for (i = 0; i < listArray.length; i++) {
  //   let myOwnValue = listArray[i].getBoundingClientRect().top;
  //   listArray[i].setAttribute("style", `top: ${myOwnValue + 68}px`);
  //   console.log(`${i + 1}번째 li의 top값에 ` + (myOwnValue + 68) + "px 넣었음");
  // }
}, 2000);
