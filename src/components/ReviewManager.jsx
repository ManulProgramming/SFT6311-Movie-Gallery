import { useState, useEffect } from "react";

function ReviewManager({ movieId }) {
  const [reviews, setReviews] = useState(() => {
      const stored = localStorage.getItem(`reviews_${movieId}`);
      return stored ? JSON.parse(stored) : [];
    });
  const [text, setText] = useState("");

  useEffect(() => {
  localStorage.setItem(`reviews_${movieId}`, JSON.stringify(reviews));
}, [reviews, movieId]);

  const addReview = () => {
    if (!text.trim()) return;
    setReviews([...reviews, text]);
    setText("");
  };

  return (
    <>
      <h6>Reviews</h6>
      <input
        className="form-control mb-2"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="btn btn-success btn-sm" onClick={addReview}>
        Add Review
      </button>
      <ul className="mt-2">
        {reviews.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </>
  );
}

export default ReviewManager;
