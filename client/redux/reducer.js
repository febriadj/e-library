const initialState = {
  user: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/user':
      return {
        ...state,
        user: action.payload.data,
      }
    default:
      return state;
  }
}

export default reducer;
