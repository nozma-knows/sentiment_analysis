import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { Responder } from "./openai";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [toClassify, setToClassify] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResponse = async () => {
      if (toClassify) {
        setIsLoading(true);
        console.log("To Classify: ", toClassify);
        const res = await fetch(`/api/openai`, {
          body: toClassify,
          headers: {
            "Content-Type": "applicaiton/json",
          },
          method: "POST",
        });
        const response = await res.json();
        setResponse(response);
        setIsLoading(false);
      }
    };

    fetchResponse();
    setToClassify("");
  }, [toClassify]);

  function updateUserInput(e) {
    console.log("User Input: ", userInput);
    setUserInput(e.target.value);
  }

  // function handleButtonPress() {
  //   Responder(toClassify).then((value) =>
  //     setResponse(value.data.choices[0].text)
  //   );
  // }

  return (
    <div>
      <input
        name="userInput"
        onChange={updateUserInput}
        value={userInput}
        placeholder="Enter Text"
      />
      <button onClick={() => setToClassify(userInput)}>Enter</button>
      {isLoading ? <div>Loading ...</div> : <div>{response.text}</div>}
    </div>
  );
}
