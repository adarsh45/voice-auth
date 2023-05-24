import React, { useEffect, useState } from "react";
import { ReactComponent as MicIcon } from "../assets/mic-icon.svg";

const NewRecorder = ({ setAudioFile, isRecording, setIsRecording }) => {
  const [audioUrl, setAudioUrl] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timerCounter, setTimerCounter] = useState(5);

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

            // set timer to 5 again
            setTimerCounter(5);
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
    if (e) e.preventDefault();

    console.log(mediaRecorder);
    if (mediaRecorder && mediaRecorder.state === "recording") {
      console.log("STOP");
      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    let intervalId;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      setTimeout(() => {
        handleStopRecording();
      }, 6000);

      let timer = timerCounter;
      intervalId = setInterval(() => {
        if (timer > 0) {
          timer--;
          setTimerCounter(timer);
        } else clearInterval(intervalId);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [mediaRecorder]);

  return (
    <div>
      <p className="bg-warning p-2 rounded">
        Please say something after clicking on mic for 5 seconds!
      </p>
      {!isRecording ? (
        <button
          onClick={handleStartRecording}
          className="btn btn-dark record-btn m-auto d-flex align-items-center justify-content-center"
        >
          <MicIcon />
        </button>
      ) : (
        <button
          onClick={(e) => e.preventDefault()}
          className="btn btn-dark record-btn m-auto d-flex align-items-center justify-content-center"
        >
          <div>{timerCounter}</div>
        </button>
      )}
      {audioUrl && (
        <audio style={{ marginTop: "16px" }} controls src={audioUrl} />
      )}
    </div>
  );
};

export default NewRecorder;
