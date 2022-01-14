const initialState = {
    loading: false,
    allPickles: [],
    allOwnerPickles: [],
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CHECK_DATA_SUCCESS":
        return {
          ...initialState,
          loading: false,
          allPickles: action.payload.allPickles,
          allOwnerPickles: action.payload.allOwnerPickles,
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;