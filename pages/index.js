import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Responder } from "./openai";

export default function Home() {
  const [toClassify, setToClassify] = useState("");
  const [response, setResponse] = useState("");

  function updateToClassify(e) {
    setToClassify(e.target.value);
  }

  function handleButtonPress() {
    Responder(toClassify).then((value) =>
      setResponse(value.data.choices[0].text)
    );
  }

  return (
    <div>
      <input
        name="toClassify"
        onChange={updateToClassify}
        value={toClassify}
        placeholder="Enter Text"
      />
      <button onClick={() => handleButtonPress()}>Enter</button>
      {response}
    </div>
  );
}
