export default function reducer(state, action) {
  if (action.type === "SET_EXPAND_STATE") {
    let newState = {
      ...state,
      expand: { ...state.expand, open: action.payload },
    };
    return newState;
  }

  if (action.type === "SET_EXPAND") {
    let newState = { ...state, expand: action.payload };
    return newState;
  }

  if (action.type === "SET_ALL_WISHES") {
    let newState = { ...state, allWishes: action.payload.wishes };
    return newState;
  }

  if (action.type === "NEW_WISH") {
    console.log("Current state: ", state);
    let newState = {
      ...state,
      allWishes: [...state.allWishes, { ...action.payload }],
    };

    console.log("new state: ", newState);
    return newState;
  }
}
