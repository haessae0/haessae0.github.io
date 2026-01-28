---
layout: post
title: "Spring Boot + Thymeleaf + Tailwind CSS 연동 및 설정 정리"
date: 2026-01-28 21:10:00 +0900
categories: [SpringBoot]
tags: [Spring Boot, Java, Thymeleaf, Tailwind CSS, Web Design, UI/UX]
---

레거시 방식의 모놀리식 웹 개발하면서 스프링부트와 타임리프 그리고 테일윌드를 사용하여서 기존과 다른 방식의 프론트를 경험해보고 싶어서 설정 방식에 대해 작성해본다.

혼자서 리액트 개발할 때 항상 테일윈드 설정하는게 귀찮았는데 타임리프에 사용하기 위해 테일윈드를 설치하는 방식이 더 귀찮고 복잡하다고 느꼈다.

해당 포스트는 tailwind4가 아닌 3 버전 기반으로 작성하며 4버전은 아래와 같은 방식으로 설정할 수 없는 것을 사전에 알린다.

## 1. Thymeleaf 기본 설정

일단 `build.gradle`에 타임리프 디펜던시를 추가한다.

```groovy
dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
}
```

추가 후 아래와 같이 properties 혹은 yml 파일을 작성한다. (현재는 yml로 설명한다.)

```yml
spring:
  thymeleaf:
    prefix: classpath:/templates/
    suffix: .html
    mode: HTML
    encoding: UTF-8
    check-template-location: true
    cache: false # 개발시 false 운영시 true
```

## 2. Tailwind CSS (v3.4) 설치 및 설정

테일윈드를 사용하기 위해서 Node 설치는 필수이다.

패키지 설치를 위해서는 아래 명령어를 실행해서 `package.json`과 `tailwind.config.js`를 생성한다.

```bash
npm init -y
npm install -D tailwindcss@3
npx tailwindcss init
```

이후 `tailwind.config.js` 파일에 클래스 명을 스캔할 HTML 파일 경로를 지정한다. 해당 경로가 올바르게 설정되어야 JIT 컴파일러가 정상 작동한다.

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/main/resources/templates/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

경로 설정 후 css 파일 생성을 하고 tailwind 관련 참조를 설정한다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

또한, `package.json`에 빌드 명령어를 추가해 html에 작성된 테일윈드 문법을 사용할 수 있게 해준다.

```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./src/main/resources/static/css/input.css -o ./src/main/resources/static/css/output.css",
    "watch:css": "tailwindcss -i ./src/main/resources/static/css/input.css -o ./src/main/resources/static/css/output.css --watch",
    "build:css:prod": "tailwindcss -i ./src/main/resources/static/css/input.css -o ./src/main/resources/static/css/output.css --minify"
  }
}
```

## 3. 실행 및 테스트

이제 모든 설정이 끝나서 아래 명령어를 통해 output.css를 생성한다.

```bash
npm run build:css
```

output.css가 생성되고 아래와 같이 참조한다.

```css
<link rel="stylesheet" th:href="@{/css/output.css}">
```

## 결론

매번 테일윈드 설정하는게 헷갈리고 제대로 적용이 안됐는데 이번에야 말로 기록하고 남겨서 다음에도 참고할 수 있도록 했다.
