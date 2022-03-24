import "./Dashboard.css";
import NavBar from "../../components/navBar/navBar.js";
import CenterConRight from "../../components/centerConRight/centerConRight";
import React, { useState, useEffect } from "react";
import reducer from "../../reducers/wishDashboardReducer";
import wishPortal from "../../utils/ayiamcoStakingToken.json";
//import DP from "../../assets/profile.svg";
import { ethers } from "ethers";
import TxnForm from "../../components/txnForm/txnForm";

const contractAddress = "0xa4B4c91D1e018c6F92C8549753cED579c482f9D7";
const contractABI = wishPortal.abi;
const defaultState = {
  chatMode: false,
  showLeft: false,
  showRight: true,
  modalDisplay: "none",
  username: {
    complete: "",
    firstSix: "",
    lastFour: "",
    initial: "",
  },
  balance: 0,
  stakedTokens: 0,
};

function Dashboard({ setIsWalletConnected }) {
  const [_state, setState] = useState(defaultState);

  const getStakeContract = async (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const stakeContract = new ethers.Contract(contractAddress, contractABI, signer);
    return stakeContract;
  };

  const responsiveness = () => {
    if (window.innerWidth < 979) {
      setState({ ..._state, columnLayout: true });
    } else if (window.innerWidth > 979) {
      setState({ ..._state, columnLayout: false });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", responsiveness);
    return () => {
      window.removeEventListener("resize", responsiveness);
    };
  });

  useEffect(() => {
    //fetchUserName();
    let newUsername = JSON.parse(localStorage.getItem("userName"));
    if (!newUsername) setIsWalletConnected(false);
    else {
      console.log("Username before:", newUsername);
      setState({ ..._state, username: newUsername });
      console.log("state: ", { ..._state, username: newUsername });
    }
    responsiveness();
  }, []);

  return (
    <div className="mainContainer">
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBar />
          <div className="centerCon" style={{ flexDirection: _state.columnLayout ? "column" : "row" }}>
            <div className="centerConLeft">
              <h1 className="walletAddress">
                Hi{" "}
                <span className="shortenedAddress">
                  {_state.username.firstSix}...
                  {_state.username.lastFour}
                </span>{" "}
                ,
              </h1>
              This is a token created for <a src="">Zuri Blockgames task.</a> 😊.
              <br></br>
              <br></br>
              <i>N/B: There might be bugs.</i>
              <br />
              <TxnForm getContract={getStakeContract} setState={setState} state={_state}></TxnForm>
            </div>

            <CenterConRight setState={setState} getContract={getStakeContract} state={_state} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
