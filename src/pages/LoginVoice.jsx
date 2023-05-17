import { useState } from "react";
import { ReactComponent as MicIcon } from "../assets/mic-icon.svg";
import "./register.css";

const LoginVoice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleRecordStart = (e) => {
    e.preventDefault();
    if (isRecording) return;

    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
    }, 5000);
  };

  return (
    <div className="container py-4">
      <form
        className="d-flex m-auto text-center flex-column gap-4"
        style={{ width: "30%" }}
        onSubmit={handleSubmit}
      >
        <h2 className="h2">Login with your voice!</h2>
        <input className="form-control" type="text" placeholder="Username" />
        <button
          onClick={handleRecordStart}
          className="btn btn-dark record-btn m-auto d-flex align-items-center justify-center"
        >
          {!isRecording ? <MicIcon /> : <div className="dot-pulse"></div>}
        </button>
        <button type="submit" className="btn btn-dark">
          {isUploading ? (
            <div className="spinner-border text-light" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginVoice;
