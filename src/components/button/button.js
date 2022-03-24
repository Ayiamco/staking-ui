import React from "react";
import "./button.css";

function Button({ action, buttonText, thumb, bg, cursor }) {
  return (
    <div
      onClick={action}
      className="connectButton"
      style={{ backgroundColor: bg, cursor: cursor }}
    >
      {buttonText}
      <span className="thumb">{thumb}</span>
    </div>
  );
}

export default Button;
