#!/bin/bash
echo "📦 GitHub Pages 배포 준비 중..."

# docs 폴더 업데이트
rm -rf docs/*
cp -r src/* docs/

# git add 및 commit
git add .
git commit -m "docs: GitHub Pages 배포 업데이트 $(date +%Y-%m-%d\ %H:%M:%S)"

# push
git push origin master

echo "✅ GitHub Pages에 배포 완료!"
echo "🌐 https://introduce131.github.io/web-portfolio"

