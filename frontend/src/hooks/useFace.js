import React, { useEffect, useState, useRef } from "react";
import * as faceapi from "face-api.js";
import { useRecoilState } from "recoil";
import showExpressionsAtom from "@/stores/showExpressionsAtom";

const useFace = () => {
  const [expression, setExpression] = useState("");
  const [showExpressions, setShowExpressions] =
    useRecoilState(showExpressionsAtom);
  const intervalId = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!showExpressions) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current = null;
      }

      return;
    }

    const detectExpressions = async (stream) => {
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      videoRef.current = video;

      video.addEventListener("loadeddata", async () => {
        intervalId.current = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (detections.length > 0) {
            const { expressions } = detections[0];
            const topExpression = Object.entries(expressions).reduce(
              (prev, current) => (prev[1] > current[1] ? prev : current)
            );
            setExpression(topExpression[0]);
          }
        }, 1000);
      });
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        detectExpressions(stream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    const loadModels = async () => {
      const MODEL_URL = "/models";
      // const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      startVideo();
    };

    loadModels();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current = null;
      }
    };
  }, [showExpressions]);

  return expression;
};

export default useFace;
