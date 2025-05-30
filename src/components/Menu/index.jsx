'use client'
import styles from "./styles.module.css";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

import Logo from "@/assets/SVG/Logo-colored.svg";
import arrow from "@/assets/SVG/arrow_down.svg";
import arrowLeft from "@/assets/SVG/arrow_left.svg";
import { WindowWidthContext } from "@/context/WindowWidthContext";


const Menu = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { windowWidth, isMobile } = useContext(WindowWidthContext);

  useEffect(() => {
    setIsDropdownVisible(false);
    setModal(false);
    setMenuOpen(false);
  }, [windowWidth]);

  const handleClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClose = () => {
    setModal(false);
    setIsDropdownVisible(false);
    setTimeout(() => {
      setMenuOpen(false);
    }, 500);
  }

  return (
    <div className={styles.container}>
      <div className={classNames({
        [styles.content]: true,
        [styles.content_mobile]: isMobile,
      })}>
        <Image
          src={Logo}
          alt="Logo"
          width={103}
          height={35}
          className={styles.menu_logo}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        {!isMobile ? (
          <div className={styles.menu_desktop}>
            <nav className={styles.menu_desktop_nav}>
              <ul className={styles.menu_desktop_nav_list}>
                <li className={styles.menu_desktop_nav_list_item}>
                  <Link href="#" className={styles.menu_desktop_nav_list_item_link}>Products</Link>
                </li>
                <li className={styles.menu_desktop_nav_list_item}>
                  <Link href="#" className={styles.menu_desktop_nav_list_item_link}>Solutions</Link>
                </li>
                <li className={styles.menu_desktop_nav_list_item}>
                  <Link href="#" className={styles.menu_desktop_nav_list_item_link}>Pricing</Link>
                </li>
                <li
                  className={classNames({
                    [styles.menu_desktop_nav_list_item]: true,
                    [styles.menu_desktop_nav_list_item_dropdown]: true,
                  })}
                  onClick={handleClick}
                  data-testid="desktop-resources-trigger"
                >
                  <p
                    className={classNames({
                      [styles.menu_desktop_nav_list_item_link]: true,
                      [styles.menu_desktop_nav_list_item_link_open_dropdown]: true,
                    })}
                  >
                    Resources
                    <Image src={arrow} alt="arrow" width={13.34} height={7.67} />
                  </p>
                  <div
                    ref={dropdownRef}
                    className={classNames({
                      [styles.menu_desktop_nav_list_item_link_dropdown]: true,
                      [styles.active]: isDropdownVisible,
                    })}
                    data-testid="desktop-resources-dropdown"
                  >
                    <ul className={styles.menu_desktop_nav_list_item_link_dropdown_list}>
                      <li className={styles.menu_desktop_nav_dropdown_list_item}>
                        <Link href="#" className={styles.menu_desktop_nav_dropdown_list_item_link}>
                          Help Center
                        </Link>
                      </li>
                      <li className={styles.menu_desktop_nav_dropdown_list_item}>
                        <Link href="#" className={styles.menu_desktop_nav_dropdown_list_item_link}>
                          Blog
                        </Link>
                      </li>
                      <li className={styles.menu_desktop_nav_dropdown_list_item}>
                        <Link href="#" className={styles.menu_desktop_nav_dropdown_list_item_link}>
                          Tutorials
                        </Link>
                      </li>
                      <li className={styles.menu_desktop_nav_dropdown_list_item}>
                        <Link href="#" className={styles.menu_desktop_nav_dropdown_list_item_link}>
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>

            <div className={styles.menu_desktop_acess}>
              <Link href="#" className={styles.menu_desktop_nav_list_item_link}>
                Log In
              </Link>
              <button className={styles.menu_desktop_acess_button}>
                Sing Up Now
              </button>
            </div>
          </div>
        ) : (
          <>
            {modal && (<div
              className={styles.modal}
              onClick={() => handleClose()}
              data-testid="mobile-menu-modal-backdrop"
            />)}
            <div
              className={styles.menu_mobile_btn}
              onClick={() => {
                setModal(true);
                setMenuOpen(true);
              }}
              data-testid="mobile-menu-trigger"
              role="button"
              aria-label="Open mobile menu"
            >
              <span />
              <span />
              <span />
            </div>
            {menuOpen && (
              <div className={classNames({
                [styles.menu_mobile_box]: true,
                [styles.menu_mobile_box_closing]: !modal,
              })}
              data-testid="mobile-menu-box"
              >
                <span
                  className={styles.menu_mobile_close_btn}
                  onClick={() => handleClose()}
                  data-testid="mobile-menu-close-button"
                  role="button"
                  aria-label="Close mobile menu"
                >
                    ×
                </span>
                <div className={styles.menu_mobile_box_content}>
                  <div className={styles.menu_mobile_nav}>
                    <ul className={styles.menu_mobile_nav_list}>
                      <li className={styles.menu_mobile_nav_list_item}>
                        <Link href="#" className={styles.menu_mobile_nav_list_item_link}>Products</Link>
                      </li>
                      <li className={styles.menu_mobile_nav_list_item}>
                        <Link href="#" className={styles.menu_mobile_nav_list_item_link}>Solutions</Link>
                      </li>
                      <li className={styles.menu_mobile_nav_list_item}>
                        <Link href="#" className={styles.menu_mobile_nav_list_item_link}>Pricing</Link>
                      </li>
                      <li className={styles.menu_mobile_nav_list_item}>
                        <p
                          className={styles.menu_mobile_nav_list_item_link}
                          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                          data-testid="mobile-resources-trigger"
                          role="button"
                        >
                          <Image src={arrowLeft} alt="seta para esquerda" width={7.67} height={13.34} />
                          Resources
                        </p>
                        {isDropdownVisible && (
                          <div className={styles.menu_mobile_dropdown} data-testid="mobile-resources-dropdown">
                            <span
                              className={styles.menu_mobile_dropdown_close_btn}
                              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                              data-testid="mobile-resources-dropdown-close-button"
                              role="button"
                              aria-label="Close resources dropdown"
                            >
                                ×
                            </span>
                            <div className={styles.menu_mobile_dropdow_content}>
                              <ul className={styles.menu_mobile_dropdown_list}>
                                <li className={styles.menu_mobile_dropdown_list_item}>
                                  <Link href="#" className={styles.menu_mobile_dropdown_list_item_link}>Help Center</Link>
                                </li>
                                <li className={styles.menu_mobile_dropdown_list_item}>
                                  <Link href="#" className={styles.menu_mobile_dropdown_list_item_link}>Blog</Link>
                                </li>
                                <li className={styles.menu_mobile_dropdown_list_item}>
                                  <Link href="#" className={styles.menu_mobile_dropdown_list_item_link}>Tutorials</Link>
                                </li>
                                <li className={styles.menu_mobile_dropdown_list_item}>
                                  <Link href="#" className={styles.menu_mobile_dropdown_list_item_link}>FAQs</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </li>
                      <li className={classNames({
                        [styles.menu_mobile_nav_list_item]: true,
                        [styles.menu_mobile_nav_list_item_login]: true,
                      })}>
                        <Link href="#" className={styles.menu_mobile_nav_list_item_link} >
                          Log In
                        </Link>
                        <button className={styles.menu_desktop_acess_button}>
                          Sing Up Now
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;