import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";

function Home() {
  return (
    <div className="home">
      <Banner />
      <main className="main-content">
        <section className="features">
          <Header title={"Features"}/>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy to Use</h3>
              <p>Intuitive interface for the best user experience</p>
            </div>
            <div className="feature-card">
              <h3>Secure</h3>
              <p>Your data is protected with the latest security measures</p>
            </div>
            <div className="feature-card">
              <h3>Fast</h3>
              <p>Lightning-fast performance for smooth operation</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
