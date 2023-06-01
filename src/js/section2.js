// var listArray = document.querySelector("#section2 .keywordList__container ul").children;

// for (let i = 0; i < listArray.length; i++) {
//   listArray[i].style.top = `${(i + 1) * 68}px`;
// }

// var i = 0;

// setInterval(() => {
//   if (i >= listArray.length) i = 0;

//   // 1) 맨 위로 올려서 i번째 자기소개 요소가 보여짐
//   const sltdItem = listArray[i];
//   sltdItem.style.top = "0";

//   // 2) 트랜지션 시간(0.5초) 후, i번째를 제외한 나머지에 대한 처리임
//   setTimeout(() => {
//     for (let j = 0; j < listArray.length; j++) {
//       // 2.1) i번째 제외 후, 나머지 들러리는 2번째 줄(68px)에 전부 몰아넣을거임
//       if (i !== j) {
//         listArray[j].style.top = `${68}px`;
//       }
//     }
//   }, 500);

//   // 3) 0.501초 후.. 1증가.. 이딴게..최선..?
//   setTimeout(() => {
//     i++;
//   }, 501);
// }, 2000);
