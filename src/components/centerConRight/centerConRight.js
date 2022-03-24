import { useEffect, useReducer, useCallback } from "react";
import reducer from "../../reducers/centerConRightReducer";
import DP from "../../assets/profile.svg";
import { useState } from "react/cjs/react.production.min";

export default function CenterConRight({ setState, getContract, state }) {
  const getUserBalance = async () => {
    const { ethereum } = window;
    if (ethereum) {
      let contract = await getContract(ethereum);
      let authenticatedUser = JSON.parse(localStorage.getItem("userName")).complete;
      console.log("auth user: ", authenticatedUser);
      let balance = await contract.balanceOf(authenticatedUser);
      let stakeBalance = await contract.stakeOf(authenticatedUser);
      console.log("con state:", state);
      setState({ ...state, balance: Number(balance), stakedTokens: Number(stakeBalance) });
    }
  };

  useEffect(() => {
    getUserBalance();
  }, []);

  return (
    <div
      className="centerConRight"
      style={{
        display: state.showRight ? "flex" : "none",
      }}
    >
      <div className="messagesHeader">
        <h1 className="total"></h1>
        <span>Information</span>
      </div>
      <div style={{ margin: "1em 2em" }}>
        <p>User Token balance: {state.balance}</p>
        <p>User Staked Tokens: {state.stakedTokens}</p>
      </div>
    </div>
  );
}
