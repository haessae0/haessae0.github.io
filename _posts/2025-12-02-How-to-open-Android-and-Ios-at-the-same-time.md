---
layout: post
title: "[Mac][RN] 터미널 상에서 안드로이드와 IOS 에뮬레이터 동시에 실행하는 방법"
date: 2025-12-02 14:10:00 +0900
categories: [React Native]
tags: [Mac, Android, Ios]
---

# 개요

리액트 네이티브 개발을 하기 위해서 매번 안드로이드 스튜디오와 에뮬레이터를 실행하는 것이 번거로워서 터미널 상에 명령어로 동시에 실행하는 법에 대해 알아보았다.

# 안드로이드 에뮬레이터 실행 방법

## 1단계: 설치된 가상 기기 목록 확인하기

터미널을 열고 아래 명령어를 입력하면 현재 생성되어 있는 에뮬레이터의 이름이 출력된다.

```bash
~/Library/Android/sdk/emulator/emulator -list-avds

# 출력 예시 : Pixel_8_Pro_API_35
```

## 2단계: 에뮬레이터 실행하기

확인한 이름 중 실행하고 싶은 기기의 이름을 아래 명령어로 실행한다.

```bash
~/Library/Android/sdk/emulator/emulator -avd <기기이름>

# 입력 예시 : ~/Library/Android/sdk/emulator/emulator -avd Pixel_8_Pro_API_35
```

# IOS 에뮬레이터 실행 방법

## 1단계: 최근에 열었던 기기 불러오기

가장 최근에 실행시켰던 가상 기기를 실행한다.

```bash
open -a Simulator
```

## 2단계: 특정 기기 골라서 실행하기

### 2-1단계: 설치된 기기 목록 확인하기

```bash
xcrun simctl list devices available
```

### 2-2단계: 기기 부팅 및 시뮬레이터 앱 실행하기

```bash
# 1. 시뮬레이터 앱 실행하기
open -a Simulator

# 2. 특정 기기를 부팅하기 (UUID 붙여넣기)
xcrun simctl boot <UUID>
```

# 두 에뮬레이터 한 번에 실행하기

alias를 등록하여 두 에뮬레이터가 한 번에 실행되도록 설정한다.

필자는 가상 기기를 선택하지 않고 하드코딩 상태로 진행하려고 한다.

```bash
# 1. .zshrc 파일 열기
vim ~/.zshrc

# 2. function 형토로 실행문 작성하기
emu-start() {
  echo "🚀 iOS Simulator 실행 중..."
  open -a Simulator

  echo "🤖 Android Emulator 실행 중..."
  ~/Library/Android/sdk/emulator/emulator -avd Pixel_8_Pro_API_35 &
}

# 3. .zshrc 반영하기
source ~/.zshrc

# 4. 실행하기
emu-start
```

여기서 주의 사항은 안드로이드 에뮬레이터 실행하는 명령어 뒤에 & 를 꼭 붙여야 한다.
해당 앰퍼샌드 기호를 붙이지 않으면 안드로이드가 켜진 상태로 터미널을 점유하는 현상이 있기 때문에 IOS 가상 기기가 제대로 실행되지 않는 경우가 발생한다.
이 점 주의 하자!
