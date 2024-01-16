import React from 'react';
import styles from '../../styles/home.module.css';
import Lottie from 'react-lottie';
import codingAnimation from '../lotties/codinglottie.json';
import resume from '../docs/Ahmed Adel Mohamed.pdf';

function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: codingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
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
            A proactive and accomplished Back-end developer having expertise in
            various web development technologies including Nodejs, Express.js,
            NestJS, Docker, and AWS Cloud Providers as a certified AWS Cloud
            Practitioner.
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
