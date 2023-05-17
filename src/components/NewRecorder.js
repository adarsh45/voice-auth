import React, { useState } from "react";
import { ReactComponent as MicIcon } from "../assets/mic-icon.svg";

const NewRecorder = ({ setAudioFile, isRecording, setIsRecording }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStartRecording = (e) => {
    e.preventDefault();
    setIsRecording(true);
    if (navigator.mediaDevices) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };
      let chunks = [];

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const rec = new MediaRecorder(stream);
          rec.start();
          console.log(rec.state);
          console.log("recorder started");
          rec.onstop = async (e) => {
            const blob = new Blob(chunks, { type: "audio/webm; codecs=opus" });
            setAudioFile(blob);
            console.log(blob);
            console.log(chunks);
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            console.log(audioURL);
            setAudioUrl(audioURL);

            // stop all tracks, so the red sign goes away
            stream.getTracks().forEach((track) => {
              track.stop();
              track.enabled = false;
            });
          };

          rec.ondataavailable = (e) => {
            console.log(e);
            chunks.push(e.data);
          };

          setMediaRecorder(rec);
        })
        .catch((err) => {
          console.error(`The following error occurred: ${err}`);
        });
    }
  };

  const handleStopRecording = (e) => {
    e.preventDefault();

    console.log(mediaRecorder);
    if (mediaRecorder && mediaRecorder.state === "recording") {
      console.log("STOP");

      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      {!isRecording ? (
        <button
          onClick={handleStartRecording}
          className="btn btn-dark record-btn m-auto d-flex align-items-center justify-center"
        >
          {!isRecording ? <MicIcon /> : <div className="dot-pulse"></div>}
        </button>
      ) : (
        <button
          onClick={handleStopRecording}
          className="btn btn-dark record-btn m-auto d-flex align-items-center justify-center"
        >
          <div className="dot-pulse"></div>
        </button>
      )}
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

export default NewRecorder;
