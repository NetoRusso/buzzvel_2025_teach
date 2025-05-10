import { useContext, useRef, useEffect } from "react"; // Removi useState se não for usado para outra coisa
import { WindowWidthContext } from "@/context/WindowWidthContext";
import classNames from "classnames";
import styles from "./styles.module.css";

import Image from "next/image";
import Link from "next/link";

// Imports de SVG e Imagens
import trace from "@/assets/SVG/trace.svg";
import check from "@/assets/SVG/check.svg";
import detail from "@/assets/SVG/points_features.svg";
import arrow from "@/assets/SVG/arrow_right.svg";
import desktop from "@/assets/Desktop_features.png";

// Importações dinâmicas
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer'; // Renomeado para clareza se necessário, mas pode manter se não houver conflito de nome

// Carregue o Blob dinamicamente
const DynamicBlob = dynamic(() => import('../Blob'), {
  ssr: false, 
});

const Features = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const cardsRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false);

  const topics = [
    "Est et in pharetra magna adipiscing ornare aliquam.",
    "Tellus arcu sed consequat ac velit ut eu blandit.",
    "Ullamcorper ornare in et egestas dolor orci."
  ];

  const cards = [
    { type: "Feature", title: "The map of mathematics", description: "Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.", color: "purple" },
    { type: "Popular", title: "Design for how people think", description: "Aliquam ut euismod condimentum elementum ultricies volutpat sit non.", color: "blue" },
    { type: "New", title: "International & commercial law", description: "Molestie integer eu arcu, mauris bibendum rhoncus imperdiet dui.", color: "green" }
  ];

  const { ref: blobSectionRef, inView: blobSectionIsVisible } = useInView({
    triggerOnce: true,
    rootMargin: '100px 0px',
  });

  const handleMouseDown = (e) => {
    if (cardsRef.current) {
      isDragging.current = true;
      startX.current = e.pageX - cardsRef.current.offsetLeft;
      scrollLeft.current = cardsRef.current.scrollLeft;
      cardsRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !cardsRef.current) return;
    // e.preventDefault();
    const x = e.pageX - cardsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; 
    cardsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (cardsRef.current) {
      cardsRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (cardsRef.current) {
      cardsRef.current.style.cursor = 'grab';
    }
  };

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);


      return () => {
        cardsContainer.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <section className={styles.features} aria-label="Features">
      <div className={classNames({
        [styles.features_content]: true,
        [styles.features_content_1]: true,
      })}>
        <h2 className={styles.features_title}>
          An all-in-one app that makes it easier
          <Image className={styles.features_title_trace} src={trace} alt="Trace" width={246} height={12} loading="lazy" />
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
              <Image className={styles.features_list_item_check} src={check} alt="check" width={13.32} height={9.07} loading="lazy" />
              <p className={styles.features_list_item_text}>{topic}</p>
            </li>
          ))}
        </ul>
        <Link href="#" className={styles.features_link}>
          Find more about the app
          <Image className={styles.features_link_arrow} src={arrow} alt="arrow" width={14} height={13.31} loading="lazy" />
        </Link>
      </div>

      <Image className={styles.features_detail} src={detail} alt="detail" width={139} height={582} loading="lazy" />

      <div
        ref={blobSectionRef}
        className={classNames({
          [styles.features_content]: true,
          [styles.features_content_2]: true,
        })}
      >
        {blobSectionIsVisible && (
          <DynamicBlob
            style={{
              position: 'absolute',
              zIndex: -2,
              left: "25%",
              top: "65%",
              width: '100vw',
              height: 'auto',
              maxWidth: '506px',
              minWidth: "397px",
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
        <Image className={styles.features_desktop} src={desktop} alt="desktop" width={600} height={391} loading="lazy" />
        <div
          ref={cardsRef}
          className={styles.features_cards}
          style={{ cursor: 'grab' }}
        >
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
  );
};

export default Features;