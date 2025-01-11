import { render } from "@/libs/render";

// 초기화
const app = document.querySelector("#app");

// 라우팅 처리
const handleRouting = () => {
  const path = window.location.pathname; // 현재 경로 가져오기
  render(path, app); // 현재 경로에 따라 렌더링
};

// 이벤트 리스너 등록
window.addEventListener("DOMContentLoaded", handleRouting);
window.addEventListener("popstate", handleRouting); // 뒤로가기/앞으로가기 처리
