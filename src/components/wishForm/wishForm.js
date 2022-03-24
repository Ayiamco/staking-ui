import { useState } from "react";
import spinner from "../../assets/spinner.gif";

export default function WishForm({ getWishContract }) {
  const [wish, setWish] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendWish = async (e) => {
    e.preventDefault();
    if (wish) {
      setLoading(true);
      const wishPortalContract = await getWishContract(window.ethereum);
      console.log("new wish data:", { isPrivate, wish });
      let txn = await wishPortalContract.makeWish(wish, isPrivate);
      await txn.wait();
      setLoading(false);
    } else alert("Wish cannot be empty");
  };
  return (
    <form className="form" onSubmit={sendWish}>
      <div>
        <input
          className="form-wish"
          type="text"
          placeholder="Make a wish...."
          value={wish}
          onChange={(e) => {
            setWish(e.target.value);
          }}
        />
        <div className="form-check">
          <label>Make Wish Private: </label>
          <input
            type={"checkbox"}
            onChange={(e) => {
              setIsPrivate(!isPrivate);
            }}
          ></input>
        </div>
      </div>

      {loading ? (
        <span className="sendButton">
          <img src={spinner} alt="spinner" />
        </span>
      ) : (
        <button className="sendButton" onClick={sendWish}>
          <span role="img" aria-label="wave-emoji">
            👋
          </span>
        </button>
      )}
    </form>
  );
}
