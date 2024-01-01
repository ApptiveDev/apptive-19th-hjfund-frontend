# Apptive 19기 웹 1팀 프론트엔드
`했제펀드` 팀의 프론트엔드 프로젝트입니다. Next.js를 이용하여 개발하였습니다.

## 구동 방법

1. 프로젝트 클론하기
```
git clone https://github.com/ApptiveDev/apptive-19th-hjfund-frontend.git
```
2. 패키지 설치하기
```
yarn install
```
3. 구동하기
```
yarn dev
```

## 파일 관리 정책

1. 소스 폴더 루트에는 3개의 폴더가 존재합니다.
- `app`: Next App Router
- `components`: 공용 컴포넌트
- `styles`: 공용 스타일시트 및 SCSS 변수, 믹스인 등

2. 하나의 Route는 `page.jsx`를 비롯한 App Router 관련 파일, `styles.module.scss` 스타일시트 모듈이 기본적으로 존재하고, 필요에 따라 페이지에서 사용할 컴포넌트를 모아두는 폴더인 `(components)`, 자식 Route를 모아두는 `(children)`을 생성하여 사용합니다. 페이지별로 파일을 깔끔하게 관리하기 위한 정책입니다.

예시:
```
├── app/
│ ├── (components)/
│ │ ├── Button.js
│ │ └── Header.js
│ ├── (children)/
│ │ ├── report
│ │ │ ├── page.jsx
│ │ │ └──styles.module.scss
│ │ ├── login
│ │ │ ├── page.jsx
│ │ │ └── styles.module.scss
│ ├── styles.module.scss
│ └── page.jsx
```

3. 공용 컴포넌트는 Props의 자료형을 명시하는 `d.ts` 파일을 되도록 작성해주시기 바랍니다.
