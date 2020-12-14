const initialState = {
  ur: 0,
  cgpa: 1,
  error: "",
  aptitudescore: 0
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "UPDATE UR":
      return {
        ...state,
        ur: action.data
      };
      break;
    case "UPDATE CGPA":
      if (1 <= action.data && action.data <= 10) {
        return {
          ...state,
          cgpa: action.data,
          error: ""
        };
      } else {
        console.log(action.data);
        return {
          ...state,
          cgpa: action.data,
          error: "Please enter a number between 1 and 10"
        };
      }
      break;
    case "ADD FIFTY":
      return {
        ...state,
        aptitudescore: state.aptitudescore + 50
      };
      break;
    case "ADD TWENTY":
      return {
        ...state,
        aptitudescore: state.aptitudescore + 20
      };
      break;
    default:
      return state;
  }
};

export default reducer;
