
import styles from "./styles.module.css";
import Image from "next/image";

import countries from "@/assets/SVG/countries.svg";
import teachers from "@/assets/SVG/teachers.svg";
import students from "@/assets/SVG/students.svg";

const Count = () => {

  return (
    <section className={styles.container} aria-label="Our platform reaches 195 countries, with 1 million valued teachers and 17 million happy students.">

      <div className={styles.content}>
        <div className={styles.box}>
          <Image src={countries} alt="countries" width={64} height={64} loading="lazy" className={styles.box_img} />
          <h2 className={styles.count}>195</h2>
          <p className={styles.text}>
            user countries
          </p>
        </div>
        <div className={styles.box}>
          <Image src={teachers} alt="teachers" width={64} height={64} loading="lazy" className={styles.box_img} />
          <h2 className={styles.count}>1M</h2>
          <p className={styles.text}>
            valued teachers
          </p>
        </div>
        <div className={styles.box}>
          <Image src={students} alt="students" width={64} height={64} loading="lazy" className={styles.box_img} />
          <h2 className={styles.count}>17M</h2>
          <p className={styles.text}>
            happy students
          </p>
        </div>

      </div>

    </section>
  )
};

export default Count;