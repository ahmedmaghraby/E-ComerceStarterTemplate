import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { productApi } from "@/_fakeApi_/product"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Card from "@/components/Card/Card";
import Pagination from "@/components/Util/Pagination";
import { productResponse } from "@/type/product";
import DownArrow from "@/public/icons/DownArrow";
import { CatProps, OrderType } from "@/type/props";



const ProductCategory: React.FC<CatProps> = ({
  items,
  page,
  numberOfProducts,
  orderby,
}) => {
  const t = useTranslations("Category");

  const router = useRouter();
  const { category } = router.query;
  const lastPage = Math.ceil(numberOfProducts / 10);
  console.log("lastPage", lastPage);
  
  const capitalizedCategory =
    category!.toString().charAt(0).toUpperCase() +
    category!.toString().slice(1);

  const firstIndex = page === 1 ? page : page * 10 - 9;
  const lastIndex = page * 10;

  return (
    <div>
      <Header title={`${capitalizedCategory} - Webook`} />

      <main id="main-content">
        <div className="flex items-center w-full h-16 bg-lightgreen">
          <div className="w-full app-x-padding app-max-width">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">{t("home")}</a>
              </Link>{" "}
              / <span className="capitalize">{t(category as string)}</span>
            </div>
          </div>
        </div>

        <div className="w-full mt-8 app-x-padding app-max-width">
          <h3 className="mb-2 text-4xl capitalize">{t(category as string)}</h3>
          <div className="flex flex-col-reverse justify-between gap-4 mt-4 sm:flex-row sm:gap-0 sm:mt-6">
            <span>
              {t("showing_from_to", {
                from: firstIndex,
                to: numberOfProducts < lastIndex ? numberOfProducts : lastIndex,
                all: numberOfProducts,
              })}
            </span>
            {category !== "new-arrivals" && <SortMenu orderby={orderby} />}
          </div>
        </div>

        <div className="mt-3 app-x-padding app-max-width mb-14">
          <div className="grid grid-cols-2 mb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          
          {category !== "new-arrivals" && (
            <Pagination
              currentPage={page}
              lastPage={lastPage}
              orderby={orderby}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query: { page = 1, orderby = "latest" },
}) => {
  const paramCategory = params!.category as string;

  const start = +page === 1 ? 0 : (+page - 1) * 10;

  let numberOfProducts = 0;

  if (paramCategory !== "new-arrivals") {
    const numberOfProductsResponse = await  productApi.getProductsCountByCategoryName(paramCategory);
    numberOfProducts = numberOfProductsResponse;
  } else {
    numberOfProducts = 10;
  }

  let order_by: string;

  if (orderby === "price") {
    order_by = "price";
  } else if (orderby === "price-desc") {
    order_by = "price.desc";
  } else {
    order_by = "createdAt.desc";
  }

  const res =  paramCategory === "new-arrivals" ? productApi.getProductsFilter() : productApi.getProductsFilter(start,10,paramCategory,order_by);

  const fetchedProducts = (await res).map((product: productResponse) => ({
    ...product,
    img1: product.image1,
    img2: product.image2,
  }));

  let items: productResponse[] = [];
  fetchedProducts.forEach((product: productResponse) => {
    items.push(product);
  });

  return {
    props: {
      messages: (await import(`@/i18n/${locale}.json`)).default,
      items,
      numberOfProducts,
      page: +page,
      orderby,
    },
  };
};

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const { category } = router.query;

  let currentOrder: string;

  if (orderby === "price") {
    currentOrder = "sort_by_price";
  } else if (orderby === "price-desc") {
    currentOrder = "sort_by_price_desc";
  } else {
    currentOrder = "sort_by_latest";
  }
  return (
    <Menu as="div" className="relative">
      <Menu.Button as="a" href="#" className="flex items-center capitalize">
        {t(currentOrder)} <DownArrow />
      </Menu.Button>
      <Menu.Items className="absolute z-10 flex flex-col items-start w-auto p-1 mt-2 text-xs bg-white border outline-none sm:text-sm sm:right-0 border-gray200">
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=latest`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_latest" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_latest")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price" && "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price")}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              type="button"
              onClick={() =>
                router.push(`/product-category/${category}?orderby=price-desc`)
              }
              className={`${
                active ? "bg-gray100 text-gray500" : "bg-white"
              } py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
                currentOrder === "sort_by_price_desc" &&
                "bg-gray500 text-gray100"
              }`}
            >
              {t("sort_by_price_desc")}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ProductCategory;
