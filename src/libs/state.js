class State {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = []; // 상태 변경을 감지할 리스너 배열
  }

  // 상태를 업데이트하는 메서드
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify(); // 상태 변경 시 모든 리스너에게 알림
  }

  // 리스너를 추가하는 메서드
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 리스너에게 알림을 보내는 메서드
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

// 각 컴포넌트에서 사용할 상태 객체 생성
export const createState = (initialState) => {
  return new State(initialState);
};
