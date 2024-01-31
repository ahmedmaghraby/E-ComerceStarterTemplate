import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LeftArrow from "@/public/icons/LeftArrow";
import Button from "@/components/Buttons/Button";
import GhostButton from "@/components/Buttons/GhostButton";
import { useCart } from "@/context/cart/CartProvider";
import { useWishlist } from "@/context/wishlist/WishlistProvider";


const Wishlist = () => {
  const t = useTranslations("CartWishlist");
  const { addOne } = useCart();
  const { wishlist, deleteWishlistItem, clearWishlist } = useWishlist();

  let subtotal = 0;

  return (
    <div>
      <Header title={`Wishlist - Webook`} />

      <main id="main-content">
        <div className="w-full px-4 border-t-2 app-max-width sm:px-8 md:px-20 border-gray100">
          <h1 className="mt-6 mb-2 text-2xl text-center sm:text-4xl sm:text-left animatee__animated animate__bounce">
            {t("wishlist")}
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
          <div className="w-full h-full">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="hidden py-2 font-normal text-left md:table-cell sm:text-center xl:w-72">
                    {t("product_image")}
                  </th>
                  <th className="hidden py-2 font-normal text-left md:table-cell sm:text-center xl:w-72">
                    {t("product_name")}
                  </th>
                  <th className="py-2 font-normal text-left md:hidden sm:text-center xl:w-72">
                    {t("product_details")}
                  </th>
                  <th
                    className={`font-normal py-2 ${
                      wishlist.length === 0 ? "text-center" : "text-right"
                    }`}
                  >
                    {t("unit_price")}
                  </th>
                  <th className="hidden max-w-xs py-2 font-normal sm:table-cell">
                    {t("add")}
                  </th>
                  <th className="hidden w-10 py-2 font-normal text-right sm:table-cell whitespace-nowrap">
                    {t("remove")}
                  </th>
                  <th className="w-10 py-2 font-normal text-right sm:hidden">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.length === 0 ? (
                  <tr className="w-full text-center border-b-2 h-60 border-gray200">
                    <td colSpan={5}>{t("wishlist_is_empty")}</td>
                  </tr>
                ) : (
                  wishlist.map((item) => {
                    subtotal += item.price * item.qty!;
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="flex flex-col items-start justify-center my-3 sm:items-center">
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
                          <span className="text-xs md:hidden">{item.name}</span>
                        </td>
                        <td className="hidden text-center md:table-cell">
                          {item.name}
                        </td>
                        <td className="text-right text-gray400">
                          $ {item.price}
                        </td>
                        <td className="hidden max-w-xs text-center sm:table-cell text-gray400">
                          <Button
                            value={t("add_to_cart")}
                            extraClass="hidden sm:block m-auto"
                            onClick={() => addOne!(item)}
                          />
                        </td>
                        <td
                          className="pl-8 text-right"
                          style={{ minWidth: "3rem" }}
                        >
                          <Button
                            value={t("add")}
                            onClick={() => addOne!(item)}
                            extraClass="sm:hidden mb-4 whitespace-nowrap"
                          />
                          <button
                            onClick={() => deleteWishlistItem!(item)}
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
                onClick={clearWishlist}
                extraClass="w-full sm:w-48 whitespace-nowrap"
              >
                {t("clear_wishlist")}
              </GhostButton>
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
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
};

export default Wishlist;
