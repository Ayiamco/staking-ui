import { useState, useReducer, useContext } from "react";
import reducer from "../../reducers/centerConRightReducer";
import spinner from "../../assets/spinner.gif";
import { ethers } from "ethers";
import "./txnForm.css";

export default function TxnForm({ getContract, state, setState }) {
  const [isBuyingToken, setIsBuyingToken] = useState(false);
  const [address, setAddress] = useState("");
  const [tokenAmt, setTokenAmt] = useState("");
  const [stakingAmt, setStakingAmt] = useState("");
  const [isGettingBalance, setIsGettingBalance] = useState(false);
  const [isStakingToken, setIsStakingToken] = useState(false);

  const buyToken = async (e) => {
    e.preventDefault();
    let tokenPriceInEth;
    try {
      if (tokenAmt) {
        setIsBuyingToken(true);
        const contract = await getContract(window.ethereum);
        let tokenPriceInWei = await contract.getTokenEthPrice();
        tokenPriceInEth = Number(tokenPriceInWei) / 10 ** 18;
        let authenticatedUser = JSON.parse(localStorage.getItem("userName")).complete;
        console.log("tokenPriceInEth:", tokenPriceInEth);
        let txn = await contract.buyToken(authenticatedUser, {
          value: ethers.utils.parseEther(`${tokenPriceInEth * tokenAmt}`),
        });
        await txn.wait();
        setIsBuyingToken(false);
      } else alert("Token amount cannot be empty");
    } catch (e) {
      setIsBuyingToken(false);
      if (e.message.includes("insufficient funds for gas")) {
        alert(`You need at least ${tokenPriceInEth * tokenAmt} to buy ${tokenAmt} of Ayiamco token.`);
      }
    }
  };

  const getUserBalance = async (e) => {
    e.preventDefault();
    try {
      setIsGettingBalance(true);
      const { ethereum } = window;
      if (ethereum) {
        let contract = await getContract(ethereum);
        let balance = await contract.balanceOf(address);
        let stakeBalance = await contract.stakeOf(address);
        console.log("con state:", state);
        setState({ ...state, balance: Number(balance), stakedTokens: Number(stakeBalance) });
      }
      setIsGettingBalance(false);
    } catch (e) {
      console.log(e);
    }
  };

  const stakeToken = async (e) => {
    e.preventDefault();
    try {
      setIsStakingToken(true);
      const { ethereum } = window;
      if (ethereum) {
        let contract = await getContract(ethereum);
        await contract.createStake(stakingAmt);
        let stakeBalance = await contract.stakeOf(address);
        setState({ ...state, stakedTokens: Number(stakeBalance) });
      }
      setIsStakingToken(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="txnforms" style={{ display: "flex", flexDirection: "column", width: "100%", margin: "1em 2em" }}>
      <form className="form">
        <div>
          <input
            className="form-wish"
            type="text"
            placeholder="Enter Token Amount.."
            value={tokenAmt}
            onChange={(e) => {
              setTokenAmt(e.target.value);
            }}
          />
        </div>

        {isBuyingToken ? (
          <span className="sendButton">
            <img src={spinner} alt="spinner" />
          </span>
        ) : (
          <button className="sendButton" onClick={buyToken}>
            Buy Token
          </button>
        )}
      </form>
      <br></br>
      <form className="form" onSubmit={getUserBalance}>
        <div>
          <input
            className="form-wish"
            type="text"
            placeholder="Enter wallet address.."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        {isGettingBalance ? (
          <span className="sendButton">
            <img src={spinner} alt="spinner" />
          </span>
        ) : (
          <button className="sendButton">
            <span role="img" aria-label="wave-emoji">
              View balance
            </span>
          </button>
        )}
      </form>
      <br></br>
      <form className="form" onSubmit={stakeToken}>
        <div>
          <input
            className="form-wish"
            type="text"
            placeholder="Enter staking amount.."
            value={stakingAmt}
            onChange={(e) => {
              setStakingAmt(e.target.value);
            }}
          />
        </div>

        {isStakingToken ? (
          <span className="sendButton">
            <img src={spinner} alt="spinner" />
          </span>
        ) : (
          <button className="sendButton">
            <span role="img" aria-label="wave-emoji">
              Stake Token
            </span>
          </button>
        )}
      </form>
    </div>
  );
}
