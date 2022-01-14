// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allPickles = await store
        .getState()
        .blockchain.PickleCoin.methods.getPickles()
        .call();
      let allOwnerPickles = await store
        .getState()
        .blockchain.PickleCoin.methods.getOwnerPickles(account)
        .call();

      dispatch(
        fetchDataSuccess({
          allPickles,
          allOwnerPickles,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};