import { GetServerSideProps } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Card from "@/components/Card/Card";
import { productResponse, itemType } from "@/type/product";
import { productApi } from "@/_fakeApi_/product"

type Props = {
  items: itemType[];
  searchWord: string;
};

const Search: React.FC<Props> = ({ items, searchWord }) => {
  const t = useTranslations("Search");

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`Haru Fashion`} />

      <main id="main-content">
        {/* ===== Breadcrumb Section ===== */}
        <div className="flex items-center w-full h-16 bg-lightgreen">
          <div className="w-full app-x-padding app-max-width">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">{t("home")}</a>
              </Link>{" "}
              / <span>{t("search_results")}</span>
            </div>
          </div>
        </div>

        {/* ===== Heading & Filter Section ===== */}
        <div className="w-full mt-8 app-x-padding app-max-width">
          <h1 className="mb-2 text-3xl">
            {t("search_results")}: &quot;{searchWord}&quot;
          </h1>
          {items.length > 0 && (
            <div className="flex justify-between mt-6">
              <span>
                {t("showing_results", {
                  products: items.length,
                })}
              </span>
            </div>
          )}
        </div>

        {/* ===== Main Content Section ===== */}
        <div className="mt-3 app-x-padding app-max-width mb-14">
          {items.length < 1 ? (
            <div className="flex items-center justify-center h-72">
              {t("no_result")}
            </div>
          ) : (
            <div className="grid grid-cols-2 mb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6">
              {items.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ===== Footer Section ===== */}
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query: { q = "" },
}) => {
  const res = await  productApi.searchProductBytName(q as string);
  const fetchedProducts: productResponse[] = res.map(
    (product: productResponse) => ({
      ...product,
      img1: product.image1,
      img2: product.image2,
    })
  );

  let items: productResponse[] = [];
  fetchedProducts.forEach((product: productResponse) => {
    items.push(product);
  });

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      items,
      searchWord: q,
    },
  };
};

export default Search;
