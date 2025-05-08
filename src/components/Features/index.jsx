
import { useContext } from "react";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import classNames from "classnames";
import styles from "./styles.module.css";

import Image from "next/image";

import trace from "@/assets/SVG/trace.svg";
import check from "@/assets/SVG/check.svg";
import detail from "@/assets/SVG/points_features.svg";
import arrow from "@/assets/SVG/arrow_right.svg";
import Bloob from "../Bloob";
import desktop from "@/assets/Desktop_features.png";
import Link from "next/link";

const Features = () => {

  const { isMobile } = useContext(WindowWidthContext);

  const topics = [
    "Est et in pharetra magna adipiscing ornare aliquam.",
    "Tellus arcu sed consequat ac velit ut eu blandit.",
    "Ullamcorper ornare in et egestas dolor orci."
  ]

  const cards = [
    {
      type: "Feature",
      title: "The map of mathematics",
      description: "Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.",
      color: "purple",
    },
    {
      type: "Popular",
      title: "Design for how people think",
      description: "Aliquam ut euismod condimentum elementum ultricies volutpat sit non.",
      color: "blue",
    },
    {
      type: "New",
      title: "International & commercial law",
      description: "Molestie integer eu arcu, mauris bibendum rhoncus imperdiet dui.",
      color: "green",
    }
  ]

  return (
    <section className={styles.features} aria-label="Features">
      <div className={classNames({
        [styles.features_content]: true,
        [styles.features_content_1]: true,
      })}>
        <h2 className={styles.features_title}>
          An all-in-one app that makes it easier
          <Image className={styles.features_title_trace} src={trace} alt="Trace" width={246} height={12} />
        </h2>
        {isMobile && (
          <p className={styles.features_paragraph}>
            Sit elit feugiat turpis sed integer integer accumsan turpis. Sed suspendisse nec lorem mauris.
            Pharetra, eu imperdiet ipsum ultrices amet, dui sit suspendisse.
          </p>
        )}
        <ul className={styles.features_list}>
          {topics.map((topic, index) => (
            <li key={index} className={styles.features_list_item}>
              <Image className={styles.features_list_item_check} src={check} alt="check" width={13.32} height={9.07} />
              <p className={styles.features_list_item_text}>{topic}</p>
            </li>
          ))}
        </ul>
        <Link href="#" className={styles.features_link}>
          Find more about the app
          <Image className={styles.features_link_arrow} src={arrow} alt="arrow" width={14} height={13.31} />
        </Link>
      </div>

      <Image className={styles.features_detail} src={detail} alt="detail" width={139} height={582} />


      <div className={classNames({
        [styles.features_content]: true,
        [styles.features_content_2]: true,
      })}>
        <Bloob style={{ position: 'absolute', zIndex: -2, left: "-30%", bottom: "20%", width: '80%', height: '80%' }} />
        <Image className={styles.features_desktop} src={desktop} alt="desktop" width={600} height={391} />

        <div className={styles.features_cards} draggable="true">
          {cards.map((card, index) => (
            <div key={index} className={styles.features_card}>
              <div className={styles.features_card_type_box}>
                <span className={classNames({
                  [styles.features_card_type]: true,
                  [styles.features_card_type_purple]: card.color === "purple",
                  [styles.features_card_type_blue]: card.color === "blue",
                  [styles.features_card_type_green]: card.color === "green",
                })}>
                  {card.type}
                </span>
              </div>
              <div className={styles.features_card_content}>
                <h3 className={styles.features_card_title}>
                  {card.title}
                </h3>
                <p className={styles.features_card_description}>
                  {card.description}
                </p>
              </div>
              <button className={styles.features_card_btn}>
                Take Lesson
              </button>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
};

export default Features;
