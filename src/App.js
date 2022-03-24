import "./App.css";
import { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import LoginPage from "./pages/login/Login.js";
const defaultState = {
  chatMode: false,
  showLeft: false,
  showRight: true,
  modalDisplay: "none",
  username: JSON.parse(localStorage.getItem("userName")),
  balance: 0,
  stakedTokens: 0,
};
function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [_state, setState] = useState(defaultState);
  return (
    <div>
      {isWalletConnected ? (
        <Dashboard setIsWalletConnected={setIsWalletConnected} _state={_state} setState={setState} />
      ) : (
        <LoginPage
          _state={_state}
          setState={setState}
          isWalletConnected={isWalletConnected}
          setIsWalletConnected={setIsWalletConnected}
        />
      )}
    </div>
  );
}

export default App;
