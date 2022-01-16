import React, { useEffect } from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  console.log(data);

  const mintNFT = (_account, _name) => {
    blockchain.PickleCoin.methods
    .createRandomPickle(_name)
    .send({ from: _account, value: 1000000000000000000 })
    .once("error", (err) => {
      console.log(err);
    }).then((receipt) => {
      console.log(receipt);
      dispatch(fetchData());
    })
  };

  useEffect(() => {
    if (blockchain.account != "") {
      dispatch(fetchData());
    }
  }, [blockchain.account]);

  return (
    <s.Screen>
      {blockchain.account === "" || blockchain.PickleCoin === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Pickle Farm</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}
         >
            Connect
            </button>
        </s.Container>
      ) : (
        <s.Container ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the Farm</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "Jetro");
            }}
         >
            CREATE NFT PICKLE
            </button>
            <s.SpacerSmall />
        </s.Container>
      )}
    </s.Screen>
  );
}

export default App;
