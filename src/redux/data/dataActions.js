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
      let allPickle = await store
        .getState()
        .blockchain.PickleCoin.methods.getPickle()
        .call();
      let allOwnerPickle = await store
        .getState()
        .blockchain.PickleCoin.methods.getOwnerPickle(account)
        .call();

      dispatch(
        fetchDataSuccess({
          allPickle,
          allOwnerPickle,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
