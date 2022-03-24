import React, { useState } from "react";
import "./navBar.css";
import github from "../../assets/github.svg";
import twitter from "../../assets/twitter.svg";

function NavBar({ setModalDisplay }) {
  const [display, setDisplay] = useState("none");

  // function closeModal() {
  //   setDisplay("none");
  // }

  return (
    <div className="navBarContainer">
      <div className="navBarInnerCon">
        {/* <h3>Logo👊🏾</h3> */}
        <h3>
          Make a Wish
          <span
            role="img"
            aria-label="wave-emoji"
            style={{ marginLeft: "5px" }}
          >
            🎂
          </span>
        </h3>
        <div className="iconCon">
          <span
            role="img"
            aria-label="notification-emoji"
            className="notificationBell"
            onClick={() => {
              setModalDisplay("flex");
            }}
          >
            💡
          </span>
          <span
            role="img"
            aria-label="menu-emoji"
            className="hamburgerMenu"
            onClick={() => {
              setDisplay("block");
            }}
          >
            ☰
          </span>
        </div>
        <div className="menuCon" style={{ display: display }}>
          <div className="menuConWrapper">
            <span
              role="img"
              aria-label="closeButton-emoji"
              className="menuCloseButton"
              onClick={() => {
                setDisplay("none");
              }}
            >
              ✖️
            </span>
            <ul className="menuList">
              <li>
                <a
                  href="https://github.com/Ayiamco/wishclient"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github {<img src={github} alt="" />}
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/JosephAchonu"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitter {<img src={twitter} alt="" />}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
