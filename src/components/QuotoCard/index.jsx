
import styles from "./styles.module.css";
import Image from "next/image";

import squares from "@/assets/SVG/squares.svg";
import chat_quotes from "@/assets/SVG/chat_quote.svg";
import arrow_left from "@/assets/SVG/arrow_left_white.svg";
import arrow_right from "@/assets/SVG/arrow_right_blue.svg";
import photo from "@/assets/picture_quote.png";


const QuotoCard = () => {

  return (
    <section className={styles.container} aria-label="Quotes slider">

      <div className={styles.content}>

        <div className={styles.main_container}>

          <div className={styles.slider}>
            <div className={styles.box_1}>
              <div className={styles.btn}>
                <Image src={arrow_left} alt="arrow left" width={18} height={31.5} loading="lazy" />
              </div>
              <div className={styles.box_1_content}>
                <p className={styles.texts_msg}>
                  Id urna, nisl, ut quam. Diam suspendisse fringilla quam arcu mattis est velit in. Nibh in purus sit convallis phasellus ut. At vel erat ultricies commodo. Neque suspendisse a habitasse commodo.
                </p>
                <div className={styles.texts_ass}>
                  <p className={styles.texts_ass_name}>
                    Marie Poirot,
                  </p>
                  <p className={styles.texts_ass_role}>
                    Bigapp
                  </p>
                </div>
                <div className={styles.dots} />
              </div>
            </div>
            <div className={styles.box_2}>
              <div className={styles.box_2_content}>
                <Image src={photo} alt="photo" width={528} height={415} className={styles.content_photo} loading="lazy" />
              </div>
              <div className={styles.btn}>
                <Image src={arrow_right} alt="arrow right" width={18} height={31.5} loading="lazy" />
              </div>
              <div className={styles.details_bg} />
              <Image src={chat_quotes} alt="chat quotes" width={48} height={48} className={styles.details_chat} loading="lazy" />
              <Image src={squares} alt="squares" width={155} height={155} className={styles.details_squares} loading="lazy" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
};

export default QuotoCard;