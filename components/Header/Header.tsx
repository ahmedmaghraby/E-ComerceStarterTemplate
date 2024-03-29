import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import TopNav from "@/components/Header/TopNav";
import WhistlistIcon from "@/public/icons/WhistlistIcon";
import UserIcon from "@/public/icons/UserIcon";
import AuthForm from "@/components/Auth/AuthForm";
import SearchForm from "@/components/SearchForm/SearchForm";
import CartItem from "@/components/CartItem/CartItem";
import Menu from "@/components/Menu/Menu";
import AppHeader from "@/components/Header/AppHeader";
import { useWishlist } from "@/context/wishlist/WishlistProvider";

import styles from "@/components/Header/Header.module.css";

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
  const t = useTranslations("Navigation");
  const { wishlist } = useWishlist();
  const [animate, setAnimate] = useState("");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [didMount, setDidMount] = useState<boolean>(false); 

  let noOfWishlist = wishlist.length;

  const handleAnimate = useCallback(() => {
    if (noOfWishlist === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfWishlist, setAnimate]);

  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    setDidMount(true);
    window.addEventListener("scroll", handleScroll);
    return () => setDidMount(false);
  }, [handleScroll]);

  if (!didMount) {
    return null;
  }
  return (
    <>
      <AppHeader title={title} />

      <a
        href="#main-content"
        className="absolute z-50 px-4 py-3 transition-all duration-300 transform -translate-y-40 bg-white rounded-md whitespace-nowrap left-4 opacity-90 focus:translate-y-0"
      >
        {t("skip_to_main_content")}
      </a>

      <TopNav />

      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50 h-20 relative`}
      >
        <div className="w-full app-max-width">
          <div
            className={`flex justify-between align-baseline app-x-padding ${styles.mainMenu}`}
          >
            <div className="flex-1 lg:flex-0 lg:hidden">
              <Menu />
            </div>

            <ul className={`flex-0 lg:flex-1 flex ${styles.leftMenu} ltr:mr-4 rtl:ml-4`}>
              <li>
                <Link href={`/product-category/men`}>
                  <a>{t("men")}</a>
                </Link>
              </li>
              <li>
                <Link href={`/product-category/women`}>
                  <a>{t("women")}</a>
                </Link>
              </li>
              <li>
                <Link href="/coming-soon">
                  <a>{t("blogs")}</a>
                </Link>
              </li>
            </ul>

            <div className="flex items-center justify-center flex-1 cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <a>
                    <Image
                      className="justify-center"
                      src="/logo.svg"
                      alt="Logo"
                      width={220}
                      height={50}
                      layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </div>

            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li>
                <SearchForm />
              </li>
              <li>
                <AuthForm>
                  <UserIcon />
                </AuthForm>
              </li>
              <li>
                <Link href="/wishlist" passHref>
                  <button
                    type="button"
                    className="relative"
                    aria-label="Wishlist"
                  >
                    <WhistlistIcon />
                    {noOfWishlist > 0 && (
                      <span
                        className={`${animate} absolute text-xs -top-3 -right-3 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
                      >
                        {noOfWishlist}
                      </span>
                    )}
                  </button>
                </Link>
              </li>
              <li>
                <CartItem />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
