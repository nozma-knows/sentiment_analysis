import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
// import { Responder } from "./openai";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [toClassify, setToClassify] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const SignupForm = () => {
    return (
      <Formik
        initialValues={{ userInput: "" }}
        validationSchema={Yup.object({
          userInput: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setToClassify(values.userInput);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Sentiment Analysis"
            name="userInput"
            type="text"
            placeholder="Enter Text"
          />

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    );
  };

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
    // setToClassify("");
  }, [toClassify]);

  function updateUserInput(e) {
    console.log("User Input: ", userInput);
    setUserInput(e.target.value);
  }

  return (
    <div>
      <SignupForm />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>{`${toClassify} - ${response.text}`}</div>
      )}
    </div>
  );
}
