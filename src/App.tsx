import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Grid
} from "@giphy/react-components";
import React, { useState, useEffect } from "react";
import Confetti from 'react-confetti';
import ReactPlayer from 'react-player';
import ResizeObserver from "react-resize-observer";
import styled, { keyframes } from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import './App.css';


const giphyFetch = new GiphyFetch("4bw2PKsNGPKk281WZnGHKLnJpQejW5bP");

const GridDemo = ({ onGifClick }) => {
  const fetchGifs = (offset: number) =>
    giphyFetch.search("birthday", { offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <>
      <Grid
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </>
  );
}

const App = () => {
  const [modalGif, setModalGif] = useState();
  const [play, setPlay] = useState(false)
  useEffect(() => {
    if (document) {
      var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      if (!isChrome) {
        const elem = document.getElementById('iframeAudo')
        if (elem) {
          elem.remove()
        }
      }
      else {
        const elem = document.getElementById('playAudio')
        if (elem) {
          elem.remove()
        }
      }
    }

  }, [])

  const playAudo = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement
    if (play) {
      audio.pause();
      setPlay(false)
    } else {
      setPlay(true)
      audio.play();

    }
  }


  return (
    <div className="App">

      <Confetti style={{ position: 'fixed' }} />
      <GridDemo
        onGifClick={(gif, e) => {
          console.log("gif", gif);
          e.preventDefault();
          setModalGif(gif);
        }}
      />
      <Div>
        <ReactPlayer url="/video.mov" />
        <PlayButton onClick={playAudo}><FontAwesomeIcon icon={faPlay} color="black" size="8x" style={{ opacity: play ? 0 : 0.4 }} /></PlayButton>
        <ReactAudioPlayer
          id="audio"
          src="/song.mp3#t=00:01:13"
          autoPlay
          controls
          style={{
            display: 'none'
          }}
        />
      </Div>
    </div>
  );
}

export default App;

const pulse = keyframes`
  0% { scale: 1 }
 30% { scale:1.1 }
 40% { scale:1.2 }
 100% { scale:1 }

`

const PlayButton = styled.button`
  border: none;
  padding: 24;
  cursor: pointer;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: transparent;

`;

const Div = styled.div`
  position: fixed;
  padding: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  animation-name: ${pulse};
  animation-duration: 8s;
  animation-iteration-count: infinite;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    width: 80% !important;
    height: 80% !important;
    min-width: 200px;
    min-height: 200px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow:rgb(0 0 0 / 34%) 5px 10px 18px;

  }
`;