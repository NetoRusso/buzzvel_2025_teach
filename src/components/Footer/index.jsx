
import styles from "./styles.module.css";
import Image from "next/image";

import logo from "@/assets/SVG/Logo-white.svg";
import arrow from "@/assets/SVG/arrow_right_white.svg";
import wolrd from "@/assets/SVG/world.svg";
import euro from "@/assets/SVG/euro.svg";
import accessibility from "@/assets/SVG/accessibility.svg";



const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <Image src={logo} alt="logo" width={173} height={35} className={styles.logo} loading="lazy" />
        <div className={styles.box}>
          <div className={styles.box_links}>
            <p className={styles.box_links_item}>
              Product
            </p>
            <p className={styles.box_links_item}>
              Pricing
            </p>
            <p className={styles.box_links_item}>
              Overview
            </p>
            <p className={styles.box_links_item}>
              Browse
            </p>
            <p className={styles.box_links_item}>
              Accessibility <span>BETA</span>
            </p>
          </div>

          <div className={styles.box_links}>
            <p className={styles.box_links_item}>
              Solutions
            </p>
            <p className={styles.box_links_item}>
              Brainstorming
            </p>
            <p className={styles.box_links_item}>
              Ideation
            </p>
            <p className={styles.box_links_item}>
              Wireframing
            </p>
            <p className={styles.box_links_item}>
              Research
            </p>
          </div>

          <div className={styles.box_links}>
            <p className={styles.box_links_item}>
              Resources
            </p>
            <p className={styles.box_links_item}>
              Help Center
            </p>
            <p className={styles.box_links_item}>
              Blog
            </p>
            <p className={styles.box_links_item}>
              Tutorials
            </p>
            <p className={styles.box_links_item}>
              FAQs
            </p>
          </div>

          <div className={styles.box_links}>
            <p className={styles.box_links_item}>
              Support
            </p>
            <p className={styles.box_links_item}>
              Contact Us
            </p>
            <p className={styles.box_links_item}>
              Developers
            </p>
            <p className={styles.box_links_item}>
              Documentation
            </p>
            <p className={styles.box_links_item}>
              Integrations
            </p>
          </div>

          <div className={styles.box_links}>
            <p className={styles.box_links_item}>
              Company
            </p>
            <p className={styles.box_links_item}>
              About
            </p>
            <p className={styles.box_links_item}>
              Press
            </p>
            <p className={styles.box_links_item}>
              Events
            </p>
            <p className={styles.box_links_item}>
              Request Demo <Image src={arrow} alt="arrow" width={24} height={24} loading="lazy" />
            </p>
          </div>
        </div>

      </div>
      <div className={styles.copyright}>
        <p className={styles.copyright_text}>
          uteach &copy; 2023. All rights reserved.
        </p>
        <div className={styles.links_acess}>
          <p className={styles.links_acess_item}>
            Terms
          </p>
          <p className={styles.links_acess_item}>
            Privacy
          </p>
          <p className={styles.links_acess_item}>
            Contact
          </p>
          <p className={styles.links_acess_item}>
            <Image src={wolrd} alt="world" width={24} height={24} loading="lazy" />
            EN
          </p>
          <p className={styles.links_acess_item}>
            <Image src={euro} alt="euro" width={24} height={24} loading="lazy" />
            EUR
          </p>
          <p className={styles.links_acess_item}>
            <Image src={accessibility} alt="accessibility" width={24} height={24} loading="lazy" />
          </p>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
