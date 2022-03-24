export default function reducer(state, action) {
  if (action.type === "SET_USERNAME") {
    let newState = { ...state, username: action.payload };
    return newState;
  }

  if (action.type === "CHANGE_LAYOUT") {
    let newState = { ...state, columnLayout: action.payload };
    return newState;
  }
}
