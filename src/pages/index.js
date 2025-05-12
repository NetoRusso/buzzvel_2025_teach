import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Menu from "@/components/Menu";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import QuotoCard from "@/components/QuotoCard";
import Meeting from "@/components/Meeting";
import Count from "@/components/Count";
import SocialProof from "@/components/SocialProof";
import CallFeatures from "@/components/CallFeatures";
import Join from "@/components/Join";
import Request from "@/components/Request";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <>
      <Head>
        <title>uteach</title>
        <meta name="description" content="Teach: the ultimate online education platform connecting students and teachers worldwide. Discover innovative tools and become part of a dynamic learning community." />
        <meta name="keywords" content="online education, learning platform, e-learning, students, teachers, online courses, global learning, teach" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Neto Russo" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://teach-drab.vercel.app/" />
        <meta property="og:title" content="teach - Global Online Education Platform" />
        <meta property="og:description" content="Teach: the ultimate online education platform connecting students and teachers worldwide. Discover innovative tools and become part of a dynamic learning community." />
        <meta property="og:image" content="https://teach-drab.vercel.app/og.png" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Menu />
      </header>
      <main className={styles.main}>
        <Hero />
        <Features />
        <QuotoCard />
        <Meeting />
        <Count />
        <SocialProof />
        <CallFeatures />
        <Join />
        <Request />
      </main>
      <Footer />
    </>
  );
}
