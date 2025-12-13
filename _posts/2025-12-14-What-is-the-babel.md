---
layout: post
title: "[RN] babel.config.js란 무엇인가?"
date: 2025-12-14 07:00:00 +0900
categories: [React Native]
tags: [Babel, JavaScript, Configuration]
---

React Native나 프론트엔드 개발을 하다 보면 프로젝트 루트에 항상 존재하는 `babel.config.js`에 대해 알아보았다. 이는 앱 구동에 있어 핵심적인 역할을 하는 파일이며 이해하기 쉽게 정리해본다.

## 1. Babel이란 무엇인가?

Babel은 한마디로 **자바스크립트 컴파일러**이다.

우리가 작성하는 최신 자바스크립트 문법(ES6, TS)이나 리액트 고유 문법을 휴대폰 상의 자바스크립트 엔진이나 구형 브라우저가 이해할 수 있는 구버전 자바스크립트 (ES5)로 번역해 주는 도구이다.

## 2. babel.config.js의 역할

Babel이 코드를 변활할 때 따르는 **작업지시서**이다. 단순히 번역만 하는게 아니라 아래와 같은 역할을 수행한다.

### 2-1. Transpiling, 트랜스파일링

- **역할:** 최신 문법을 하위 버전의 호환성에 맞게 변환한다.
- **예시:** 화살표 함수 `() => {}`를 `function () {}`으로 변환하거나 `class` 문법을 합수형 프로토타입으로 변환하여 구형 기기에서도 돌아가게 변환한다.

### 2-2. Plugins, 문법 확장

- **역할:** 자바스크립트 표준에는 없지만 개발 편의성을 높이기 위해 사용하는 문법을 해석 가능하게 변경한다.
- **예시:**
  - **Decorators:** 한 예로 WatermelonDB에서 사용하는 `@field`와 같은 어노테이션을 지원한다.
  - **Module Resolver:** `~/Button` 처럼 경로를 단축해서 쓸 수 있게 설정할 수 있다.
    - `babel-plugin-root-import`

### 2-3. Optimization, 최적화

- **역할:** 개발 환경과 배포 환경을 구분하여 코드를 최적화한다.
- **예시:** 배포 시 console.log를 자동으로 삭제하여 성능 저하 방지하는 설정을 추가할 수 있다.

## 3. Java와의 비유

| JavaScript (Babel)  | Java (JVM)                        | 설명                                                                    |
| :------------------ | :-------------------------------- | :---------------------------------------------------------------------- |
| **Babel**           | **javac**                         | 사람이 짠 코드를 실행 환경이 이해하는 형태로 변환하는 컴파일러          |
| **babel.config.js** | **pom.xml / build.gradle**        | 컴파일 옵션 설정 (타겟 버전 지정, 플러그인 설정 등)                     |
| **Babel Plugins**   | **Lombok / Annotation Processor** | `@Data`, `@Builder` 처럼 기본 언어 스펙 이상의 기능을 전처리해주는 도구 |

## 4. 실제 코드 예시 (Expo)

가장 기본적인 React Native Expo 프로젝트의 설정 파일이다.

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true); // 설정 파일 캐싱 활성화 (빌드 속도 향상)

  return {
    // Presets: 미리 정의된 변환 규칙 세트 (Java의 타겟 버전 설정과 유사)
    presets: ["babel-preset-expo"],

    // Plugins: 추가 기능 (필요에 따라 데코레이터나 경로 별칭 등 추가)
    plugins: [
      // 예: 'react-native-reanimated/plugin',
    ],
  };
};
```
