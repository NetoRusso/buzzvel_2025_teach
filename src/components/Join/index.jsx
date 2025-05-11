'use client';

import { useEffect, useRef, useState, useContext } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.css';
import { WindowWidthContext } from '@/context/WindowWidthContext';


import upl01 from "./assets/upl01.png";
import upl02 from "./assets/upl02.png";
import upl03 from "./assets/upl03.png";
import upl04 from "./assets/upl04.png";
import upl05 from "./assets/upl05.png";
import upl06 from "./assets/upl06.png";
import upl07 from "./assets/upl07.png";
import upl08 from "./assets/upl08.png";
import il01 from "./assets/il01.svg";
import il02 from "./assets/il02.svg";
import il03 from "./assets/il03.svg";
import il04 from "./assets/il04.svg";
import il05 from "./assets/il05.svg";
import il06 from "./assets/il06.svg";

import upd01 from "./assets/upd01.png";
import upd02 from "./assets/upd02.png";
import upd03 from "./assets/upd03.png";
import upd04 from "./assets/upd04.png";
import upd05 from "./assets/upd05.png";
import upd06 from "./assets/upd06.png";
import id01 from "./assets/id01.svg";
import id02 from "./assets/id02.svg";
import id03 from "./assets/id03.svg";
import id04 from "./assets/id04.svg";
import id05 from "./assets/id05.svg";


const userPhotosData = [
  { id: 'upl01', src: upl01, alt: 'User', width: 60, height: 60, desktopPos: { top: '-15%', left: '26%' }, mobilePos: { top: '-60%', left: '85%' }, speedY: -35, speedXMobile: -30, panel: 'left' },
  { id: 'upl02', src: upl02, alt: 'User', width: 48, height: 48, desktopPos: { top: '5%', left: '2%' }, mobilePos: { top: '-58%', left: '5%' }, speedY: 40, speedXMobile: 35, panel: 'left' },
  { id: 'upl03', src: upl03, alt: 'User', width: 64, height: 64, desktopPos: { top: '20%', left: '13%' }, mobilePos: { top: '-59%', left: '43%' }, speedY: -30, speedXMobile: -25, panel: 'left' },
  { id: 'upl04', src: upl04, alt: 'User', width: 96, height: 96, desktopPos: { top: '50%', left: '-4%' }, mobilePos: { top: '-20%', left: '-10%' }, speedY: 32, speedXMobile: 28, panel: 'left' },
  { id: 'upl05', src: upl05, alt: 'User', width: 48, height: 48, desktopPos: { top: '50%', left: '22%' }, mobilePos: { top: '-35%', left: '65%' }, speedY: -42, speedXMobile: -32, panel: 'left' },
  { id: 'upl06', src: upl06, alt: 'User', width: 120, height: 120, desktopPos: { top: '60%', left: '12%' }, mobilePos: { top: '-30%', left: '20%' }, speedY: 45, speedXMobile: 40, panel: 'left' },
  { id: 'upl07', src: upl07, alt: 'User', width: 32, height: 32, desktopPos: { top: '130%', left: '28%' }, mobilePos: { top: '-3%', left: '87%' }, speedY: -38, speedXMobile: -20, panel: 'left' },
  { id: 'upl08', src: upl08, alt: 'User', width: 48, height: 48, desktopPos: { top: '130%', left: '0%' }, mobilePos: { top: '-35%', left: '15%' }, speedY: 30, speedXMobile: 22, panel: 'left' },

  { id: 'upd01', src: upd01, alt: 'User', width: 56, height: 56, desktopPos: { top: '-20%', right: '25%' }, mobilePos: { bottom: '-15%', left: '-3%' }, speedY: 35, speedXMobile: 30, panel: 'right' },
  { id: 'upd02', src: upd02, alt: 'User', width: 96, height: 96, desktopPos: { top: '-30%', right: '2%' }, mobilePos: { bottom: '-17%', left: '70%' }, speedY: -40, speedXMobile: -35, panel: 'right' },
  { id: 'upd03', src: upd03, alt: 'User', width: 64, height: 64, desktopPos: { top: '29%', right: '14%' }, mobilePos: { bottom: '-35%', left: '35%' }, speedY: 30, speedXMobile: 25, panel: 'right' },
  { id: 'upd04', src: upd04, alt: 'User', width: 128, height: 128, desktopPos: { top: '50%', right: '-4%' }, mobilePos: { bottom: '-60%', left: '75%' }, speedY: -32, speedXMobile: -28, panel: 'right' },
  { id: 'upd05', src: upd05, alt: 'User', width: 48, height: 48, desktopPos: { top: '95%', right: '27%' }, mobilePos: { bottom: '-65%', left: '5%' }, speedY: 38, speedXMobile: 32, panel: 'right' },
  { id: 'upd06', src: upd06, alt: 'User', width: 40, height: 40, desktopPos: { top: '110%', right: '5%' }, mobilePos: { bottom: '-70%', left: '60%' }, speedY: -45, speedXMobile: -40, panel: 'right' },
];

const iconData = [
  { id: 'il01', src: il01, alt: 'Icon', width: 56, height: 56, desktopPos: { top: '-30%', left: '0%' }, mobilePos: { top: '-68%', left: '-7%' }, panel: 'left' },
  { id: 'il02', src: il02, alt: 'Icon', width: 96, height: 96, desktopPos: { top: '-20%', left: '6%' }, mobilePos: { top: '-65%', left: '14%' }, panel: 'left' },
  { id: 'il03', src: il03, alt: 'Icon', width: 40, height: 40, desktopPos: { top: '3%', left: '20%' }, mobilePos: { top: '-57%', left: '65%' }, panel: 'left' },
  { id: 'il04', src: il04, alt: 'Icon', width: 32, height: 32, desktopPos: { top: '55%', left: '8%' }, mobilePos: { top: '-38%', left: '0%' }, panel: 'left' },
  { id: 'il05', src: il05, alt: 'Icon', width: 48, height: 48, desktopPos: { top: '90%', left: '2%' }, mobilePos: { top: '-5%', left: '65%' }, panel: 'left' },
  { id: 'il06', src: il06, alt: 'Icon', width: 60, height: 60, desktopPos: { top: '105%', left: '25%' }, mobilePos: { top: '-30%', left: '83%' }, panel: 'left' },

  { id: 'id01', src: id01, alt: 'Icon', width: 104, height: 104, desktopPos: { top: '-8%', right: '15%' }, mobilePos: { bottom: '-22%', right: '40%' }, panel: 'right' },
  { id: 'id02', src: id02, alt: 'Icon', width: 64, height: 64, desktopPos: { top: '25%', right: '22%' }, mobilePos: { bottom: '-25%', right: '63%' }, panel: 'right' },
  { id: 'id03', src: id03, alt: 'Icon', width: 48, height: 48, desktopPos: { top: '20%', right: '5%' }, mobilePos: { bottom: '-29%', right: '30%' }, panel: 'right' },
  { id: 'id04', src: id04, alt: 'Icon', width: 48, height: 48, desktopPos: { top: '65%', right: '13%' }, mobilePos: { bottom: '-57%', right: '38%' }, panel: 'right' },
  { id: 'id05', src: id05, alt: 'Icon', width: 32, height: 32, desktopPos: { top: '99%', right: '17%' }, mobilePos: { bottom: '-48%', right: '70%' }, panel: 'right' },
];


const Join = () => {
  const sectionRef = useRef(null);
  const [gsapModules, setGsapModules] = useState(null);
  const { isMobile, windowWidth } = useContext(WindowWidthContext);

  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView && !gsapModules) {
      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]).then(([gsapModule, scrollTriggerModule]) => {
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        setGsapModules({ gsap, ScrollTrigger });
      }).catch(err => console.error("Failed to load GSAP modules for Join panel", err));
    }
  }, [inView, gsapModules]);

  useEffect(() => {
    if (gsapModules && sectionRef.current && windowWidth > 0) {
      const { gsap, ScrollTrigger } = gsapModules;
      
      const triggersToKill = ScrollTrigger.getAll().filter(
        st => st.trigger === sectionRef.current || (st.trigger && sectionRef.current.contains(st.trigger))
      );
      triggersToKill.forEach(st => st.kill());
      gsap.killTweensOf(sectionRef.current.querySelectorAll(`.${styles.image_wrapper}`));
      gsap.set(sectionRef.current.querySelectorAll(`.${styles.image_wrapper}`), { clearProps: "all" });


      const animations = [];

      userPhotosData.forEach((imgData) => {
        const el = sectionRef.current.querySelector(`.${styles.visuals_container} [data-id="${imgData.id}"]`);
        if (el) {
          let targetAnimationProps;
          let initialPosProps;
          let scale = 1;

          if (isMobile) {
            initialPosProps = {
              top: imgData.panel === 'left' ? (imgData.mobilePos.top || 'auto') : 'auto', 
              bottom: imgData.panel === 'right' ? (imgData.mobilePos.bottom || 'auto') : 'auto', 
              left: imgData.mobilePos.left || 'auto',
              right: imgData.mobilePos.right || 'auto',
              ...(imgData.panel === 'left' && { bottom: 'auto' }),
              ...(imgData.panel === 'right' && { top: 'auto' }),
            };
            scale = imgData.width > 90 ? 1 : (imgData.width > 60 ? 1 : 0.95);
            targetAnimationProps = { xPercent: imgData.speedXMobile };
          } else { // Desktop
            initialPosProps = {
              top: imgData.desktopPos.top,
              left: imgData.desktopPos.left !== undefined ? imgData.desktopPos.left : 'auto',
              right: imgData.desktopPos.right !== undefined ? imgData.desktopPos.right : 'auto',
              bottom: 'auto',
            };
            targetAnimationProps = { yPercent: imgData.speedY };
          }
          
          gsap.set(el, { ...initialPosProps, scale: scale, xPercent: 0, yPercent: 0 });

          const anim = gsap.to(el, {
            ...targetAnimationProps,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5 + Math.random() * 0.5,
            }
          });
          animations.push(anim.scrollTrigger);
        }
      });

      iconData.forEach(icon => {
        const el = sectionRef.current.querySelector(`.${styles.visuals_container} [data-id="${icon.id}"]`);
        if (el) {
          let initialPosProps;
          let scale = 1;
          if (isMobile) {
            initialPosProps = {
              top: icon.panel === 'left' ? (icon.mobilePos.top || 'auto') : 'auto',
              bottom: icon.panel === 'right' ? (icon.mobilePos.bottom || 'auto') : 'auto',
              left: icon.mobilePos.left || 'auto',
              right: icon.mobilePos.right || 'auto',
              ...(icon.panel === 'left' && { bottom: 'auto' }),
              ...(icon.panel === 'right' && { top: 'auto' }),
            };
            scale = 0.8;
          } else { // Desktop
            initialPosProps = {
              top: icon.desktopPos.top,
              left: icon.desktopPos.left !== undefined ? icon.desktopPos.left : 'auto',
              right: icon.desktopPos.right !== undefined ? icon.desktopPos.right : 'auto',
              bottom: 'auto',
            };
          }
          gsap.set(el, { ...initialPosProps, scale: scale, xPercent: 0, yPercent: 0 });
        }
      });

      return () => {
        animations.forEach(st => st && st.kill());
      };
    }
  }, [gsapModules, isMobile, windowWidth]);

  const renderImageItem = (item, itemType) => (
    <div
      key={item.id}
      data-id={item.id}
      className={`${styles.image_wrapper} ${itemType === 'user' ? styles.user_photo_wrapper : styles.element_float_wrapper}`}
      style={{
        width: `${item.width}px`,
        height: `${item.height}px`,
      }}
    >
      <Image src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
    </div>
  );

  return (
    <section
      ref={node => { sectionRef.current = node; viewRef(node); }}
      className={`${styles.container} ${isMobile ? styles.mobile_layout : ''}`}
      aria-label="Join us"
    >
      <div className={styles.content}>
        <div className={styles.box}>
          <h2 className={styles.title}>Join a world of learning</h2>
          <p className={styles.description}>
            Malesuada ut aliquam at ac est nisi, interdum etiam dignissim.
            Risus elit et fringilla habitant ut facilisi.
          </p>
          <button className={styles.btn}>Sign Up Now</button>
        </div>

        {/* Container ÚNICO para todos os elementos visuais */}
        <div className={styles.visuals_container}>
          {userPhotosData.map(item => renderImageItem(item, 'user'))}
          {iconData.map(item => renderImageItem(item, 'icon'))}
        </div>
      </div>
    </section>
  );
};

export default Join;