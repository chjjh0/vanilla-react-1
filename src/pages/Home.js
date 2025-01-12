import { h, Fragment } from "@/libs/h";
import { createState } from "@/libs/state";
import { cleanupState } from "@/libs/cleanup";

const homeState = createState({ text: "Hello, World!" });

export const Home = () => {
  const updateUI = (state) => {
    const userElement = document.getElementById("user");
    userElement.textContent = `User: ${state.text}`;
  };
  homeState.subscribe(updateUI);

  // 클릭 이벤트 핸들러 함수
  const handleClick = () => {
    alert(homeState.state.text);
  };

  window.addEventListener("beforeunload", cleanupState);

  return (
    <>
      <h2>홈 페이지</h2>
      <button onClick={handleClick}>Click Me</button>
    </>
  );
};
