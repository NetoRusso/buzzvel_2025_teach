'use client';

import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

import trace from "@/assets/SVG/trace.svg";
import arrow from "@/assets/SVG/arrow_right.svg";
import picture01 from "@/assets/picture_features_1.png";
import picture01b from "@/assets/picture_features_1b.png";
import picture02 from "@/assets/picture_features_2.png";
import picture03 from "@/assets/picture_features_3.png";

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

const DynamicBlob = dynamic(() => import('../Blob'), {
  ssr: false,
});

const CallFeatures = () => {
  // Hook useInView para a seção que contém o Blob
  const { ref: blobSectionRef, inView: blobSectionIsVisible } = useInView({
    triggerOnce: true,
    rootMargin: '100px 0px',// Ajuste conforme necessário
  });

  return (
    <section className={styles.container} aria-label="Call Action more Features">
      <div className={styles.content}>
        <div className={styles.texts_box}>
          <h2 className={styles.texts_title}>
            All the cool features
            <Image className={styles.texts_trace} src={trace} alt="Trace" width={205} height={12} loading="lazy" />
          </h2>
          <p className={styles.texts_paragraph}>
            Mauris consequat, cursus pharetra et, habitasse rhoncus quis odio ac. In et dolor eu donec maecenas nulla. Cum sed orci, sit pellentesque quisque feugiat cras ullamcorper. Ultrices in amet, ullamcorper non viverra a, neque orci.
          </p>
          <Link href="#" className={styles.texts_link}>
            View all the features
            <Image className={styles.texts_link_arrow} src={arrow} alt="arrow" width={14} height={13.31} loading="lazy" />
          </Link>
        </div>

        <div ref={blobSectionRef} className={styles.grid_box}>
          <div className={styles.grid_box_content}>
            <div className={styles.s_1}>
              <div className={styles.card}>
                <span className={styles.card_type}>Popular</span>
                <h3 className={styles.card_title}>
                  Design for how people think
                </h3>
                <p className={styles.card_description}>
                  Aliquam ut euismod condimentum elementum ultricies volutpat sit non.
                </p>
                <button className={styles.card_btn}>
                  Take Lesson
                </button>
              </div>
              <div className={styles.box_1}>
                <Image src={picture01b} alt="picture01b" width={80} height={80} loading="lazy" className={styles.box_1_photo_b} />
                <Image src={picture01} alt="picture01" width={186} height={158} loading="lazy" className={styles.box_1_photo} />
              </div>
            </div>
            <div className={styles.s_2}>
              <div className={styles.box_2}>
                <Image src={picture02} alt="picture02" width={305} height={179} loading="lazy" className={styles.box_2_photo} />
              </div>
              <div className={styles.box_3}>
                <Image src={picture03} alt="picture03" width={232} height={179} loading="lazy" className={styles.box_3_photo} />
              </div>
            </div>
          </div>

          {blobSectionIsVisible && (
            <DynamicBlob
              fill="#FB923C" 
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: -1, 
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
};

export default CallFeatures;