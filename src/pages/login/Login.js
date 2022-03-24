import Button from "../../components/button/button.js";
import "./login.css";
import React, { useEffect, useState } from "react";
//import ReactGA from "react-ga";

function LoginPage({ setIsWalletConnected, isWalletConnected }) {
  const [errorMessage, setErrorMessage] = useState({
    display: false,
    errorMessage: "",
  });

  const saveWalletData = (walletAddress) => {
    console.log("Saving WalletAddress data of wallet... ", walletAddress);
    var userData = {
      complete: walletAddress,
      firstSix: walletAddress.substring(0, 6),
      lastFour: walletAddress.substring(walletAddress.length - 4),
      initial: walletAddress.substring(0, 1),
    };
    localStorage.setItem("userName", JSON.stringify(userData));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please make sure your Metamask is connected");
        return;
      }

      //Get User Wallet Addresses
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Accounts found: ", accounts);
      if (accounts.length > 0) {
        saveWalletData(accounts[0].toString());
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
        console.log("No authorized account found");
        //alert("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        //User does not have metamask installed
        console.log("Get MetaMask!");
        setErrorMessage({
          display: true,
          errorMessage: "Please make sure your Metamask is connected",
        });
        return;
      }

      //get wallet address and save to localstorage
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account ", accounts[0]);
      saveWalletData(accounts[0].toString());
      setIsWalletConnected(true);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });

  return (
    <div className="connectMainContainer">
      <div className="connectLeft">
        <h1>
          Ayiamco
          <span role="img" aria-label="cookies-emoji">
            🎁
          </span>
        </h1>
      </div>
      <div className="connectRight">
        <h1>
          Wishes
          <span role="img" aria-label="cookies-emoji">
            🎁
          </span>
        </h1>
        <Button
          buttonText="Connect MetaMask"
          thumb="👆"
          bg="#ffd44796"
          cursor="pointer"
          action={() => {
            connectWallet();
          }}
        />

        <h6 className="errorMessage" style={{ display: errorMessage ? "block" : "none" }}>
          {errorMessage.errorMessage}
        </h6>
      </div>
    </div>
  );
}

export default LoginPage;
