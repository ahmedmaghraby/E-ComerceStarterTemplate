import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LeftArrow from "@/public/icons/LeftArrow";
import Button from "@/components/Buttons/Button";
import GhostButton from "@/components/Buttons/GhostButton";
import { GetStaticProps } from "next";
import { roundDecimal } from "@/components/Util/utilFunc";
import { useCart } from "@/context/cart/CartProvider";
import { useRouter } from "next/router";


const ShoppingCart = () => {
  const t = useTranslations("CartWishlist");
  const router = useRouter();
  const [deli, setDeli] = useState("Pickup");
  const { cart, addOne, removeItem, deleteItem, clearCart } = useCart();

  let subtotal = 0;

  let deliFee = 0;
  if (deli === "Yangon") {
    deliFee = 2.0;
  } else if (deli === "Others") {
    deliFee = 7.0;
  }

  return (
    <div>
      <Header title={`Shopping Cart - Webook`} />

      <main id="main-content">
        <div className="w-full px-4 border-t-2 app-max-width sm:px-8 md:px-20 border-gray100">
          <h1 className="mt-6 mb-2 text-2xl text-center sm:text-4xl sm:text-left animatee__animated animate__bounce">
            {t("shopping_cart")}
          </h1>
          <div className="mt-6 mb-3">
            <Link href="/">
              <a className="inline-block">
                <LeftArrow size="sm" extraClass="inline-block" />{" "}
                {t("continue_shopping")}
              </a>
            </Link>
          </div>
        </div>

        <div className="flex flex-col px-4 app-max-width sm:px-8 md:px-20 mb-14 lg:flex-row">
          <div className="w-full h-full mr-4 lg:w-4/6">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="py-2 font-normal text-left sm:text-center xl:w-72">
                    {t("product_details")}
                  </th>
                  <th
                    className={`font-normal py-2 hidden sm:block ${
                      cart.length === 0 ? "text-center" : "text-right"
                    }`}
                  >
                    {t("unit_price")}
                  </th>
                  <th className="py-2 font-normal">{t("quantity")}</th>
                  <th className="py-2 font-normal text-right">{t("amount")}</th>
                  <th
                    className="py-2 font-normal text-right"
                    style={{ minWidth: "3rem" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr className="w-full text-center border-b-2 h-60 border-gray200">
                    <td colSpan={5}>{t("cart_is_empty")}</td>
                  </tr>
                ) : (
                  cart.map((item) => {
                    subtotal += item.price * item.qty!;
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="flex flex-col items-start my-3 text-center xl:flex-row sm:items-center xl:space-x-2 xl:text-left">
                          <Link
                            href={`/products/${encodeURIComponent(item.id)}`}
                          >
                            <a>
                              <Image
                                src={item.img1 as string}
                                alt={item.name}
                                width={95}
                                height={128}
                                className="h-32 xl:mr-4"
                              />
                            </a>
                          </Link>
                          <span>{item.name}</span>
                        </td>
                        <td className="hidden text-right text-gray400 sm:table-cell">
                          $ {roundDecimal(item.price)}
                        </td>
                        <td>
                          <div className="flex flex-col-reverse w-12 h-32 mx-auto border sm:h-auto sm:w-3/4 md:w-2/6 sm:flex-row border-gray300 sm:divide-x-2 divide-gray300">
                            <div
                              onClick={() => removeItem!(item)}
                              className="flex items-center justify-center w-12 h-full cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              -
                            </div>
                            <div className="flex items-center justify-center w-12 h-full pointer-events-none">
                              {item.qty}
                            </div>
                            <div
                              onClick={() => addOne!(item)}
                              className="flex items-center justify-center w-12 h-full cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td className="text-right text-gray400">
                          $ {roundDecimal(item.price * item.qty!)}
                          <br />
                          <span className="text-xs">
                            ($ {roundDecimal(item.price)})
                          </span>
                        </td>
                        <td className="text-right" style={{ minWidth: "3rem" }}>
                          <button
                            onClick={() => deleteItem!(item)}
                            type="button"
                            className="text-4xl outline-none text-gray300 hover:text-gray500 focus:outline-none sm:text-2xl"
                          >
                            &#10005;
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div>
              <GhostButton
                onClick={clearCart}
                extraClass="hidden sm:inline-block"
              >
                {t("clear_cart")}
              </GhostButton>
            </div>
          </div>
          <div className="w-full h-full mt-10 lg:w-4/12 lg:mt-0">
            <div className="p-6 border divide-y-2 border-gray500 divide-gray200">
              <h2 className="mb-3 text-xl">{t("cart_totals")}</h2>
              <div className="flex justify-between py-2">
                <span className="uppercase">{t("subtotal")}</span>
                <span>$ {roundDecimal(subtotal)}</span>
              </div>
              <div className="py-3">
                <span className="uppercase">{t("delivery")}</span>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="radio"
                        name="deli"
                        value="Pickup"
                        id="pickup"
                        checked={deli === "Pickup"}
                        onChange={() => setDeli("Pickup")}
                      />{" "}
                      <label htmlFor="pickup" className="cursor-pointer">
                        {t("store_pickup")}
                      </label>
                    </div>
                    <span>{t("free")}</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="radio"
                        name="deli"
                        value="Yangon"
                        id="ygn"
                        checked={deli === "Yangon"}
                        onChange={() => setDeli("Yangon")}
                      />{" "}
                      <label htmlFor="ygn" className="cursor-pointer">
                        {t("within_yangon")}
                      </label>
                    </div>
                    <span>$ 2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <input
                        type="radio"
                        name="deli"
                        value="Others"
                        id="others"
                        checked={deli === "Others"}
                        onChange={() => setDeli("Others")}
                      />{" "}
                      <label htmlFor="others" className="cursor-pointer">
                        {t("other_cities")}
                      </label>
                    </div>
                    <span>$ 7.00</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-3">
                <span>{t("grand_total")}</span>
                <span>$ {roundDecimal(subtotal + deliFee)}</span>
              </div>
              <Button
                value={t("proceed_to_checkout")}
                size="xl"
                extraClass="w-full"
                onClick={() => router.push(`/checkout`)}
                disabled={cart.length < 1 ? true : false}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
    },
  };
};

export default ShoppingCart;
