import { useEffect } from "react";

export default function CenterConRight({ setState, getContract, state }) {
  const getUserBalance = async () => {
    const { ethereum } = window;
    if (ethereum) {
      let contract = await getContract(ethereum);
      let authenticatedUser = JSON.parse(localStorage.getItem("userName")).complete;
      let balance = await contract.balanceOf(authenticatedUser);
      let stakeBalance = await contract.stakeOf(authenticatedUser);
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
        <span>User Information</span>
      </div>
      <div
        style={{
          margin: "1em 2em",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5>User Token balance: {state.balance}</h5>
        <h5>User Staked Tokens: {state.stakedTokens}</h5>
      </div>
    </div>
  );
}
