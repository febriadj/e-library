const initialState = {
  user: null,
  isLoggedIn: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'counter/user':
      return {
        ...state,
        user: action.payload.data,
      }
    case 'counter/isLoggedIn':
      return {
        ...state,
        isLoggedIn: action.payload.data,
      }
    default:
      return state;
  }
}

export default reducer;
