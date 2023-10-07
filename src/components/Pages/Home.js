import React from "react";
import styles from "../../styles/home.module.css";
import Lottie from "react-lottie";
import codingAnimation from "../lotties/codinglottie.json";
import resume from "../docs/CV.pdf";

function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: codingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.text}>Hi I'm Ahmed Adel</div>
        </div>
        <div className={styles.intro2}>
          <div className={styles.text}>
            I'm passionate Full Stack web developer having an experience of web
            applications with Nodejs, Express.js, Nest.js, React.js, and AWS
            Cloud Services as a certified AWS Cloud Practitioner.
          </div>
        </div>
        <div className={styles.button}>
          <a target="blank" href={resume}>
            Resume
          </a>
        </div>
      </div>
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default Home;
