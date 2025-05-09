'use client'

import styles from "./styles.module.css";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';

import photo_1 from "@/assets/picture_meeting_1.png";
import photo_2 from "@/assets/picture_meeting_2.png";
import photo_3 from "@/assets/picture_meeting_3.png";
import photo_4 from "@/assets/picture_meeting_4.png";
import photo_5 from "@/assets/picture_meeting_5.png";
import photo_6 from "@/assets/picture_meeting_6.png";
import photo_7 from "@/assets/picture_meeting_7.png";
import photo_8 from "@/assets/picture_meeting_8.png";
import photo_9 from "@/assets/picture_meeting_9.png";
import photo_10 from "@/assets/picture_meeting_10.png";

import plane from "@/assets/SVG/plane-departure.svg";
import arrow from "@/assets/SVG/arrow_right.svg";

const Meeting = () => {
  const [focusedPhoto, setFocusedPhoto] = useState(null);
  const intervalId = useRef(null);

  useEffect(() => {
    const changeFocus = () => {
      const randomIndex = Math.floor(Math.random() * 10) + 1;
      setFocusedPhoto(`content_photo_${randomIndex}`);
    };

    intervalId.current = setInterval(changeFocus, 1500);

    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <section className={styles.container} aria-label="Meeting with teachers">
      <div className={styles.content}>
        <div className={styles.grid_pics}>
          <Image
            src={photo_1}
            alt="photo_1"
            style={{
              transform: focusedPhoto === 'content_photo_1' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_1' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_1' ? 1 : 0,
            }}
            width={128}
            height={192}
            className={classNames(styles.content_photo, styles.content_photo_1)}
            loading="lazy"
          />
          <Image
            src={photo_2}
            alt="photo_2"
            style={{
              transform: focusedPhoto === 'content_photo_2' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_2' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_2' ? 1 : 0,
            }}
            width={172}
            height={258}
            className={classNames(styles.content_photo, styles.content_photo_2)}
            loading="lazy"
          />
          <Image
            src={photo_3}
            alt="photo_3"
            style={{
              transform: focusedPhoto === 'content_photo_3' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_3' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_3' ? 1 : 0,
            }}
            width={128}
            height={212}
            className={classNames(styles.content_photo, styles.content_photo_3)}
            loading="lazy"
          />
          <Image
            src={photo_4}
            alt="photo_4"
            style={{
              transform: focusedPhoto === 'content_photo_4' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_4' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_4' ? 1 : 0,
            }}
            width={128}
            height={215}
            className={classNames(styles.content_photo, styles.content_photo_4)}
            loading="lazy"
          />
          <Image
            src={photo_5}
            alt="photo_5"
            style={{
              transform: focusedPhoto === 'content_photo_5' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_5' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_5' ? 1 : 0,
            }}
            width={128}
            height={160}
            className={classNames(styles.content_photo, styles.content_photo_5)}
            loading="lazy"
          />
          <Image
            src={photo_6}
            alt="photo_6"
            style={{
              transform: focusedPhoto === 'content_photo_6' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_6' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_6' ? 1 : 0,
            }}
            width={128}
            height={171}
            className={classNames(styles.content_photo, styles.content_photo_6)}
            loading="lazy"
          />
          <Image
            src={photo_7}
            alt="photo_7"
            style={{
              transform: focusedPhoto === 'content_photo_7' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_7' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_7' ? 1 : 0,
            }}
            width={128}
            height={172}
            className={classNames(styles.content_photo, styles.content_photo_7)}
            loading="lazy"
          />
          <Image
            src={photo_8}
            alt="photo_8"
            style={{
              transform: focusedPhoto === 'content_photo_8' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_8' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_8' ? 1 : 0,
            }}
            width={128}
            height={192}
            className={classNames(styles.content_photo, styles.content_photo_8)}
            loading="lazy"
          />
          <Image
            src={photo_9}
            alt="photo_9"
            style={{
              transform: focusedPhoto === 'content_photo_9' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_9' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_9' ? 1 : 0,
            }}
            width={160}
            height={255}
            className={classNames(styles.content_photo, styles.content_photo_9)}
            loading="lazy"
          />
          <Image
            src={photo_10}
            alt="photo_10"
            style={{
              transform: focusedPhoto === 'content_photo_10' ? 'scale(1.05)' : 'scale(0.95)',
              opacity: focusedPhoto === 'content_photo_10' ? 1 : 0.8,
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              zIndex: focusedPhoto === 'content_photo_10' ? 1 : 0,
            }}
            width={128}
            height={165}
            className={classNames(styles.content_photo, styles.content_photo_10)}
            loading="lazy"
          />
        </div>
        <div className={styles.content_text}>
          <h2 className={styles.content_text_title}>
            <Image src={plane} alt="plane" width={64} height={64} loading="lazy" className={styles.plane} />
            Meet international students & teachers
          </h2>
          <p className={styles.content_text_paragraph}>
            Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.
          </p>
          <Link href="#" className={styles.content_link}>
            Explore teachers and students
            <Image src={arrow} alt="arrow" width={14} height={13.31} loading="lazy" className={styles.arrow} />
          </Link>
        </div>
      </div>
    </section>
  )
};

export default Meeting;