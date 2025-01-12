/**
 * 컴포넌트 언마운트 시 상태를 초기화하는 헬퍼 함수
 * @param {Object} state - 초기화할 상태 객체
 * @param {Function} setState - 상태를 업데이트하는 함수
 */
export const cleanupState = (state) => {
  window.addEventListener("beforeunload", () => {
    state.setState(null); // 상태 초기화
    console.log("window.addEventListener ~ state: ", state);
  });
};
