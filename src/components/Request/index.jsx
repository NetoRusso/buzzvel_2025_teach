
import styles from "./styles.module.css";

const Request = () => {

  return (
    <section className={styles.container} aria-label="Request">
      <div className={styles.content}>
        <h2 className={styles.title}>
          Ready for your next project?
        </h2>
        <p className={styles.paragraph}>
          Sit elit feugiat turpis sed integer integer accumsan turpis.
        </p>
        <form className={styles.form}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required className={styles.input} />
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea id="message" name="message" placeholder="What are you say ?" required className={styles.textarea} />
          <button type="submit" className={styles.btn}>
            Request Demo
          </button>
        </form>
      </div>
    </section>
  )

};

export default Request;
