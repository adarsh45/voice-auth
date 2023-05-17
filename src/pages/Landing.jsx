import React from "react";
import "./landing.css";
import Footer from "../components/Footer";

function Landing() {
  return (
    <div className="landing">
      <div className="">
        <div className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
          <h1 className="p-4">Voice Authentication System</h1>
          <a href="/register" className="btn btn-dark m-4">
            Register my voice!
          </a>
        </div>

        <div className="row container p-4" style={{ margin: "auto" }}>
          <div className="col-md text-center d-flex align-items-center justify-content-center">
            <h2 className="topic">Introduction</h2>
          </div>
          <div className="col-md p-4 " style={{ textAlign: "justify" }}>
            Welcome to our Voice Authentication System, where your voice becomes
            your secure identity. Our advanced technology utilizes the
            distinctive features and patterns in your voice to provide a
            seamless and robust authentication experience. Say goodbye to
            cumbersome passwords and PINs, and embrace the simplicity of
            speaking naturally. Our system offers unparalleled accuracy,
            detecting not only the tone and pitch of your voice but also the
            subtle nuances that make it truly unique. Rest assured, your
            voiceprint is securely stored and encrypted, ensuring the utmost
            privacy and protection. Join us in revolutionizing authentication,
            where your voice is the key to unlocking a world of secure and
            effortless access.
          </div>
        </div>

        <div
          className="row container p-4 text-center"
          style={{ margin: "auto" }}
        >
          <div className="col-md p-4" style={{ textAlign: "justify" }}>
            Our objective is to provide a highly reliable and user-friendly
            Voice Authentication System that offers a secure and convenient
            alternative to traditional authentication methods. By leveraging the
            power of voice recognition technology, our system aims to streamline
            the authentication process, eliminate the need for complex
            passwords, and enhance overall security. We strive to ensure that
            individuals can effortlessly and confidently access their accounts
            and sensitive information by simply using their unique voiceprints.
            Our goal is to deliver a seamless and trustworthy voice
            authentication solution that enhances user experience while
            maintaining the highest standards of privacy and data protection.
          </div>

          <div className="col-md text-center d-flex align-items-center justify-content-center">
            <h2 className="topic">Objective</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
