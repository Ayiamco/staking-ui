import { useEffect, useReducer, useCallback } from "react";
import reducer from "../../reducers/centerConRightReducer";
import DP from "../../assets/profile.svg";

export default function CenterConRight({ _state, getWishContract }) {
  const [state, dispatch] = useReducer(reducer, _state);

  const getAllWishes = useCallback(async () => {
    console.log("getting all wishes....");
    try {
      const { ethereum } = window;
      if (ethereum) {
        let wishPortalContract = await getWishContract(ethereum);
        let wishes = await wishPortalContract.getPublicWishes();
        const _privateWishes = await wishPortalContract.getPrivateWishes();

        wishes = [...wishes, ..._privateWishes];
        let wishesArray = [];
        wishes.forEach((wish) => {
          wishesArray.push({
            address: wish.from,
            timestamp: new Date(wish.timeStamp * 1000),
            wish: wish.wish,
            isPrivate: wish.isPrivate,
          });
        });

        dispatch({
          type: "SET_ALL_WISHES",
          payload: { wishes: wishesArray.reverse() },
        });

        wishPortalContract.on("NewWish", (wish, timeStamp, isPrivate, from) => {
          dispatch({
            type: "NEW_WISH",
            payload: { wish, timeStamp, isPrivate, address: from },
          });
        });
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  }, [getWishContract]);

  useEffect(() => {
    getAllWishes();
  }, []);

  return (
    <div
      className="centerConRight"
      style={{
        display: state.showRight ? "flex" : "none",
      }}
    >
      <div className="messagesHeader">
        <h1
          className="total"
          onClick={() => {
            if (state.expand.open) {
              dispatch({ type: "SET_EXPAND_STATE", payload: false });
            } else {
              return;
            }
          }}
        >
          {state.expand.open ? "〈〈 " : null}
          {state.allWishes.length}
        </h1>
        <span>Wishes</span>
      </div>
      <div className="messagesContainer">
        {state.expand.open ? (
          <div className="expandedMessageWrapper">
            <div className="expandedMessageCon">
              <h1 className="expandedMessageDp">
                <span role="img" aria-label="wave-emoji">
                  ✉️
                </span>
              </h1>
              <h3 className="expandedMessageAddress">{state.expand.address}</h3>
              <h3 className="expandedMessageText">"{state.expand.wish}"</h3>
              <h3 className="expandedMessageTime">{state.expand.time} </h3>
              <h3 className="expandedMessageTime">
                {state.expand.isPrivate ? "Private wish." : "Public wish."}
              </h3>
            </div>
          </div>
        ) : (
          <>
            {state.allWishes.map((wish, key) => {
              return (
                <div
                  className="transaction"
                  key={key}
                  onClick={() => {
                    console.log("wish in loop:", wish);
                    dispatch({
                      type: "SET_EXPAND",
                      payload: {
                        open: true,
                        wish: wish.wish,
                        time: wish.timestamp.toString(),
                        address: wish.address,
                        isPrivate: wish.isPrivate,
                      },
                    });
                    console.log(state.expand);
                  }}
                >
                  <img src={DP} alt="" className="dp" />
                  <div className="info">
                    <div className="messageWrapper">
                      <h4>{wish.address}</h4>
                      <span className="recievedMessage">
                        {wish.wish.substring(0, 10)} ...
                      </span>
                    </div>
                    <span className="expand">〉</span>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
