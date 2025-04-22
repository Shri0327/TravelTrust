// frontend/src/PostReview.jsx
import React, { useState } from "react";
import { getContract } from "./contract";
import ViewReviews from "./ViewReviews";

function PostReview() {
  const [serviceId, setServiceId] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contract = await getContract();
      const tx = await contract.submitReview(serviceId, reviewText);
      await tx.wait();
      setMessage("✅ Review submitted successfully!");
      fetchReviews(serviceId); // Fetch reviews after submitting
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: " + (err.reason || "Check console"));
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Service ID:</label>
        <input
          type="text"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <label>Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          style={{ width: "100%", height: "100px", marginBottom: "1rem" }}
        />
        <button type="submit">Submit Review</button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default PostReview;
