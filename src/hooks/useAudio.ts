/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const updateUrl = (newUrl: string) => {
    setAudio(new Audio(newUrl));
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.play();
  }, [audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, updateUrl };
};
