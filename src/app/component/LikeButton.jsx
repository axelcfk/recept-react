/////// mickes like button
import React, { useState } from "react";

const LikeButton = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button id="likeBtn" className="likeBtn" onClick={handleClick}>
      👍 <span>{count}</span>
    </button>
  );
};

export default LikeButton;

/////// mickes like button
/* const newLikeBtn = document.createElement("button");
newLikeBtn.className = "likeBtn";
newLikeBtn.id = "likeBtn";
newLikeBtn.textContent = "👍";

const newLikeBtnCounter = document.createElement("span");
newLikeBtnCounter.textContent = "0";
newLikeBtn.appendChild(newLikeBtnCounter);

let count = 0;
newLikeBtn.addEventListener("click", function () {
  count++;
  newLikeBtnCounter.textContent = count;
}); */
/////// mickes like button
