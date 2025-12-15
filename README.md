# Web Portfolio

백종원의 웹 포트폴리오 사이트입니다.

## 🚀 배포 방법

### 자동 배포 (권장)
코드를 수정한 후 다음 명령어로 자동 배포:

```bash
./deploy.sh
```

이 스크립트는:
1. `src/` 폴더의 파일들을 `docs/` 폴더로 복사
2. 변경사항을 커밋
3. GitHub에 푸시
4. GitHub Pages에 자동 배포

### 수동 배포
```bash
# docs 폴더 업데이트
rm -rf docs/*
cp -r src/* docs/

# git 커밋 및 푸시
git add .
git commit -m "배포 업데이트"
git push origin master
```

## 🌐 사이트 주소
[https://introduce131.github.io/web-portfolio](https://introduce131.github.io/web-portfolio)

## 📁 프로젝트 구조
```
web-portfolio/
├── src/                    # 개발용 소스 파일
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── resource/
├── docs/                   # GitHub Pages 배포용 파일
├── deploy.sh              # 자동 배포 스크립트
└── README.md
```

## 🛠️ 기술 스택
- HTML5
- CSS3 (SCSS)
- Vanilla JavaScript
- GitHub Pages