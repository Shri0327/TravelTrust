import React, { useState } from "react";
import { getContract } from "./contract";
import PostReview from "./PostReview";
import ViewReviews from "./ViewReviews";

function App() {
  const [message, setMessage] = useState("");

  const handleBook = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.bookService("Paris");
      await tx.wait();
      setMessage("✅ Service booked successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error booking service: " + (err.reason || "Check console"));
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>TravelTrust DApp</h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Book a Demo Service</h2>
        <button onClick={handleBook}>Book "Paris"</button>
        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </section>

      <hr />

      <section style={{ marginTop: "2rem" }}>
        <PostReview />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <ViewReviews />
      </section>
    </div>
  );
}

export default App;
