'use client'

import { useContext, useRef, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { WindowWidthContext } from "@/context/WindowWidthContext";

import prev from "@/assets/SVG/prev_btn.svg";
import next from "@/assets/SVG/next_btn.svg";

import user01 from "@/assets/user_01.png";
import user02 from "@/assets/user_02.png";
import user03 from "@/assets/user_03.png";
import user04 from "@/assets/user_04.png";
import user05 from "@/assets/user_05.png";

const SocialProof = () => {
  const { isMobile } = useContext(WindowWidthContext);
  const cardsContainerRef = useRef(null);

  const userCard = [
    {
      text: "Lacus vestibulum ultricies mi risus, duis non, volutpat nullam non. Magna congue nisi maecenas elit aliquet eu sed consectetur.",
      img: user01,
      name: "Hellen Jummy",
      role: "Financial Counselor"
    },
    {
      text: "Odio rhoncus ornare ut quam. Molestie vel duis quis scelerisque ut id. In tortor turpis viverra sagittis ultrices nisi.",
      img: user02,
      name: "Ralph Edwards",
      role: "Math Teacher"
    },
    {
      text: "Sagittis nunc egestas leo et malesuada urna risus. Morbi proin et cras aliquam. Diam tellus, amet, hac imperdiet.",
      img: user03,
      name: "Hellena John",
      role: "Psychology Student"
    },
    {
      text: "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod.",
      img: user04,
      name: "David Oshodi",
      role: "Manager"
    },
    {
      text: "Sapien, sollicitudin et vitae id et laoreet sapien consectetur. Felis egestas egestas amet aliquam sit euismod.",
      img: user05,
      name: "John Doe",
      role: "Engineer"
    }
  ];

  const handleScroll = (direction) => {
    if (cardsContainerRef.current) {
      const scrollAmount = 300;
      const container = cardsContainerRef.current;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!cardsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - cardsContainerRef.current.offsetLeft);
    setScrollLeft(cardsContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !cardsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    cardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className={styles.container} aria-label="Social proof">
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.header_title}>What everyone says</h2>
          {!isMobile && (
            <div className={styles.header_btns}>
              <Image
                src={prev}
                alt="prev"
                width={48}
                height={48}
                loading="lazy"
                className={styles.header_btn}
                onClick={() => handleScroll("left")}
              />
              <Image
                src={next}
                alt="next"
                width={48}
                height={48}
                loading="lazy"
                className={styles.header_btn}
                onClick={() => handleScroll("right")}
              />
            </div>
          )}
        </div>

        <div
          className={styles.cards_box}
          ref={cardsContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {userCard.map((user, index) => (
            <div className={styles.card} key={index}>
              <p className={styles.card_text}>{user.text}</p>
              <div className={styles.card_ass}>
                <Image
                  src={user.img}
                  alt={`imagem de ${user.name}`}
                  width={64}
                  height={64}
                  loading="lazy"
                  className={styles.card_img}
                />
                <div className={styles.card_info}>
                  <p className={styles.card_name}>{user.name}</p>
                  <p className={styles.card_role}>{user.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
