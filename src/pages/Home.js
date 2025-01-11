import { h, Fragment } from "@/libs/h";

export const Home = () => {
  // 클릭 이벤트 핸들러 함수
  const handleClick = () => {
    alert("Hello!");
  };

  return (
    <>
      <h2>홈 페이지</h2>
      <button onClick={handleClick}>Click Me</button>
    </>
  );
};
