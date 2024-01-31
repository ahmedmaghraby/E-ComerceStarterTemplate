import { Fragment, useState } from "react";
import { Menu as HMenu } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import MenuIcon from "@/public/icons/MenuIcon";
import AuthForm from "@/components/Auth/AuthForm";
import WhistlistIcon from "@/public/icons/WhistlistIcon";
import UserIcon from "@/public/icons/UserIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import DownArrow from "@/public/icons/DownArrow";
import InstagramLogo from "@/public/icons/InstagramLogo";
import FacebookLogo from "@/public/icons/FacebookLogo";
import { useWishlist } from "@/context/wishlist/WishlistProvider";
import { useAuth } from "@/context/AuthContext";

export default function Menu() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const { asPath, locale } = router;
  const { wishlist } = useWishlist();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  let noOfWishlist = wishlist.length;

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${searchValue}`);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          aria-label="Hamburger Menu"
          onClick={openModal}
          className="focus:outline-none"
        >
          <MenuIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen">
            <Transition.Child as={Fragment}>
              <Dialog.Overlay className="fixed inset-0 opacity-50 bg-gray500" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-600"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                style={{ height: "100vh" }}
                className="relative inline-block w-full h-screen max-w-md overflow-hidden overflow-y-auto text-left align-middle transition-all transform bg-white shadow-xl opacity-95 dur"
              >
                <div className="flex items-center justify-between p-6 pb-0">
                  <Link href="/">
                    <a>
                      <Image
                        className="justify-center"
                        src="/logo.svg"
                        alt="Picture of the author"
                        width={85}
                        height={22}
                      />
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="text-3xl outline-none focus:outline-none sm:text-2xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <div className="mb-10">
                  <div className="flex flex-col items-center justify-around w-full px-6 itemContainer">
                    <form
                      className="flex items-center justify-between w-full mt-5 mb-5 border-b-2 border-gray300"
                      onSubmit={handleSubmit}
                    >
                      <SearchIcon extraClass="text-gray300 w-6 h-6" />
                      <input
                        type="search"
                        placeholder={t("search_anything")}
                        className="w-full px-4 py-2 text-xl focus:outline-none"
                        onChange={handleChange}
                      />
                    </form>
                    <Link href="/product-category/men">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("men")}
                      </a>
                    </Link>
                    <Link href="/product-category/women">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("women")}
                      </a>
                    </Link>
                    <Link href="/product-category/bags">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("bags")}
                      </a>
                    </Link>
                    <Link href="/blogs">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("blogs")}
                      </a>
                    </Link>
                    <Link href="/about">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("about_us")}
                      </a>
                    </Link>
                    <Link href="/contact">
                      <a
                        className="w-full py-2 text-xl text-left hover:bg-gray100"
                        onClick={closeModal}
                      >
                        {t("contact_us")}
                      </a>
                    </Link>
                    <hr className="w-full mt-2 border border-gray300" />
                    <div className="flex justify-between w-full py-2 my-3 text-xl">
                      <AuthForm extraClass="flex justify-between w-full">
                        <span>{auth.user ? t("profile") : t("login")}</span>
                        <UserIcon />
                      </AuthForm>
                    </div>
                    <hr className="w-full border border-gray300" />
                    <Link href="/wishlist">
                      <a className="flex justify-between w-full py-2 my-3 text-xl">
                        <span>{t("wishlist")}</span>
                        <div className="relative">
                          <WhistlistIcon />
                          {noOfWishlist > 0 && (
                            <span
                              className={`absolute text-xs -top-0 -left-7 bg-gray500 text-gray100 py-1 px-2 rounded-full`}
                            >
                              {noOfWishlist}
                            </span>
                          )}
                        </div>
                      </a>
                    </Link>
                    <hr className="w-full border border-gray300" />

                    <HMenu
                      as="div"
                      className="relative w-full mt-4 mb-2 bg-gray100"
                    >
                      <HMenu.Button
                        as="a"
                        href="#"
                        className="flex items-center justify-center px-4 py-2 text-center"
                      >
                        {locale === "en" ? t("english") : t("arabic")}{" "}
                        <DownArrow />
                      </HMenu.Button>
                      <HMenu.Items
                        className="absolute right-0 flex flex-col w-full p-1 mt-2 bg-white border outline-none border-gray200"
                        style={{ zIndex: 9999 }}
                      >
                        <HMenu.Item>
                          <Link href={asPath} locale="en">
                            <a
                              className={`${
                                locale === "en"
                                  ? "bg-gray200 text-gray500"
                                  : "bg-white text-gray500"
                              } py-2 px-4 text-center focus:outline-none`}
                            >
                              {t("english")}
                            </a>
                          </Link>
                        </HMenu.Item>
                        <HMenu.Item>
                          <Link href={asPath} locale="ar">
                            <a
                              className={`${
                                locale === "ar"
                                  ? "bg-gray200 text-gray500"
                                  : "bg-white text-gray500"
                              } py-2 px-4 text-center focus:outline-none`}
                            >
                              {t("arabic")}
                            </a>
                          </Link>
                        </HMenu.Item>
                      </HMenu.Items>
                    </HMenu>

                    <HMenu as="div" className="relative w-full my-2 bg-gray100">
                      <HMenu.Button
                        as="a"
                        href="#"
                        className="flex items-center justify-center px-4 py-2 text-center"
                      >
                        {t("usd")} <DownArrow />
                      </HMenu.Button>
                      <HMenu.Items
                        className="absolute right-0 flex flex-col w-full p-1 mt-2 bg-white border outline-none border-gray200"
                        style={{ zIndex: 9999 }}
                      >
                        <HMenu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${
                                active
                                  ? "bg-gray100 text-gray500"
                                  : "bg-white text-gray500"
                              } py-2 px-4 text-center focus:outline-none`}
                            >
                              {t("usd")}
                            </a>
                          )}
                        </HMenu.Item>
                        <HMenu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${
                                active
                                  ? "bg-gray100 text-gray500"
                                  : "bg-white text-gray500"
                              } py-2 px-4 text-center focus:outline-none`}
                            >
                              {t("mmk")}
                            </a>
                          )}
                        </HMenu.Item>
                      </HMenu.Items>
                    </HMenu>

                    <div className="flex justify-center w-2/5 my-10 space-x-6">
                      <a
                        href="#"
                        className="flex justify-center w-10 h-10 py-1 rounded-md text-gray400 px-auto active:bg-gray300"
                        aria-label="Webook Facebook Page"
                      >
                        <FacebookLogo extraClass="h-8" />
                      </a>
                      <a
                        href="#"
                        className="flex justify-center w-10 h-10 py-1 rounded-md text-gray400 px-auto active:bg-gray300"
                        aria-label="Webook Facebook Page"
                      >
                        <InstagramLogo extraClass="h-8" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
