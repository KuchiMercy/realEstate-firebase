import React, { useReducer } from "react";

const initialValue = {
  value: 1,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "Increment":
      return {
        ...state,
        value: state.value >= 5 ? state.value : state.value + action.value,
      };
    case "Decrement":
      return {
        ...state,
        value: state.value <= 0 ? state.value : state.value - action.value,
      };
    default:
      return state;
  }
}
const Sample = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "Decrement", value: 1 });
        }}
      >
        -
      </button>
      <div>{state.value}</div>
      <button
        onClick={() => {
          dispatch({ type: "Increment", value: 1 });
        }}
      >
        +
      </button>
      <div style={{ color: "red", fontSize: "12px" }}>
        {state.value >= 5 || state.value <= 0 ? <p>Limit Exceeded</p> : null}
      </div>
    </div>
  );
};

export default Sample;
