
import classNames from "classnames";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { WindowWidthContext } from "@/context/WindowWidthContext";
import { useContext } from "react";

import trace from "@/assets/SVG/trace.svg";
import play from "@/assets/SVG/play_symbol.svg";
import image_hero from "@/assets/Group_hero.png";

import companies01 from "@/assets/SVG/companies01.svg";
import companies02 from "@/assets/SVG/companies02.svg";
import companies03 from "@/assets/SVG/companies03.svg";
import companies04 from "@/assets/SVG/companies04.svg";
import companies05 from "@/assets/SVG/companies05.svg";



const Hero = () => {

  const { isMobile } = useContext(WindowWidthContext);

  return (
    <section className={styles.hero} aria-label="Overview of Teach: Education for students worldwide, sign-up and demo options, plus our leading partners.">
      <div className={classNames({
        [styles.hero_content]: true,
        [styles.hero_content_1]: true,
      })}>
        <h1 className={styles.hero_title}>
          Teach students worldwide
          <Image className={styles.hero_title_trace} src={trace} alt="Trace" width={191} height={13} loading="lazy" />
        </h1>
        <p className={styles.hero_paragraph}>
          Amet nunc diam orci duis ut sit diam arcu, nec. Eleifend proin massa tincidunt viverra lectus pulvinar. Nunc ipsum est pellentesque turpis ultricies.
        </p>
        <div className={styles.hero_btns}>
          <button className={styles.hero_btn}>
            Sign Up Now
          </button>
          <Link href="#" className={styles.hero_demo}>
            <Image className={styles.hero_demo_play} src={play} alt="Play" width={24} height={24} loading="lazy"/>
            View Demo
          </Link>
        </div>
        <div className={styles.hero_companies}>
          {isMobile ? (<p className={styles.hero_companies_text}>Trusted by leading companies</p>):(<p className={styles.hero_companies_text}>Trusted by<br />leading companies</p>)}
          <div className={styles.hero_companies_logos}>
            <Image className={styles.companies_logo_img} src={companies01} alt="companies01" width={32} height={32} loading="lazy"/>
            <Image className={styles.companies_logo_img} src={companies02} alt="companies02" width={32} height={32} loading="lazy"/>
            <Image className={styles.companies_logo_img} src={companies03} alt="companies03" width={32} height={32} loading="lazy"/>
            <Image className={styles.companies_logo_img} src={companies04} alt="companies04" width={32} height={32} loading="lazy"/>
            <Image className={styles.companies_logo_img} src={companies05} alt="companies05" width={32} height={32} loading="lazy"/>
          </div>
        </div>
      </div>

      <div className={classNames({
        [styles.hero_content]: true,
        [styles.hero_content_2]: true,
      })}>
        <Image className={styles.hero_image} src={image_hero} alt="image_hero" width={625} height={545} loading="lazy" />
      </div>
    </section>
  )
};

export default Hero;