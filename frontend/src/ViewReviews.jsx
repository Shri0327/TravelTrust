// frontend/src/ViewReviews.jsx
import React, { useEffect, useState } from "react";
import { getContract } from "./contract";

function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  const [serviceId, setServiceId] = useState("");

  
    const fetchReviews = async () => {
        if (!serviceId) return; // Skip if no serviceId is set
      try {
        const contract = await getContract();
        const reviewList = await contract.getReviews(serviceId);
        setReviews(reviewList);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    useEffect(() => {
        if (serviceId) {
            fetchReviews();
        } 
  }, [serviceId]);

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h2>📝 All Travel Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((r, index) => (
            <li key={index} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem", borderRadius: "8px" }}>
              <strong>Service:</strong> {r.serviceId}<br />
              <strong>Review:</strong> {r.reviewText}<br />
              <strong>User:</strong> {r.user.slice(0, 6)}...{r.user.slice(-4)}<br />
              <strong>Time:</strong> {new Date(r.timestamp * 1000).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewReviews;
