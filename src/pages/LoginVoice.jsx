import { useState } from "react";
import axios from "axios";
import NewRecorder from "../components/NewRecorder";
import "./register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginVoice = () => {
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter your name!");
    if (!audioFile) return alert("Record your audio first!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("audio", audioFile, "recording.wav");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BACKEND_URL}/recognize`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
    };

    setIsUploading(true);

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setName("");
        setAudioFile(null);
        if (response.data.result === "Success") {
          navigate("/home/" + response.data?.name?.Recognized);
        } else {
          toast.error("Your voice authentication failed, " + name);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          toast.error("Your voice authentication failed, " + name);
        } else toast.error(error?.message);
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <div className="container py-4">
      <form
        className="d-flex m-auto text-center flex-column gap-4"
        style={{ width: "30%" }}
        onSubmit={handleSubmit}
      >
        <h2 className="h2">Login with your voice!</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          type="text"
          placeholder="Username"
        />

        {/* <MyAudioRecorder /> */}

        <NewRecorder
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioFile={setAudioFile}
        />

        <button
          disabled={isRecording || isUploading}
          type="submit"
          className="btn btn-dark"
        >
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
