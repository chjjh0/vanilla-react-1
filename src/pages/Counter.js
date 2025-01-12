import { h, Fragment } from "@/libs/h";
import { createState } from "@/libs/state";
import { cleanupState } from "@/libs/cleanup";

const counterState = createState({ count: 0 });

const Counter = () => {
  const updateUI = (state) => {
    const countElement = document.getElementById("count");
    countElement.textContent = `Count: ${state.count}`;
  };

  counterState.subscribe(updateUI);
  cleanupState(counterState);

  const increment = () => {
    counterState.setState({ count: counterState.state.count + 1 });
  };

  return (
    <div>
      <h2>Counter Component</h2>
      <p id="count">Count: {counterState.state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default Counter;
