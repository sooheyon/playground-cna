---
title: CSR과 SSR의 차이
date: 2024-02-19
thumbnail: nextjs.png
description: CSR과 SSR의 차이에 대해 공부하고 각각 상황에 맞게 적절하게 사용하는 것을 목적으로 합니다
---

---

## CSR이란

client side rendering으로 서버로부터 초기 html을 전달받아 클라이언트에서 실행단계에 동적으로 html을 구성합니다.

## SSR이란

server side rendering으로 서버에서 완성된 html을 전달받아 client에서 정적으로 보여주는 방법입니다.

## CSR의 특징

- 사용자의 사용성을 올려줍니다
   - 초기 렌더링 시 모든 페이지를 실행하기 때문에 느리지만, 이 후 화면 전환 시 속도가 빠릅니다.

## SSR의 특징

- 초기 렌더링 속도가 빠릅니다
   - 초기 렌더링 속도가 빠릅니다.
- SEO(Search Engine Optimization)에 최적화 되어있습니다.
   - 검색엔진은 서버에서 실행된 페이지를 토대로 탐색하기 때문

---

