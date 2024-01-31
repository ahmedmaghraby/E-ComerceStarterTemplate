import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Buttons/Button";
import Slideshow from "@/components/HeroSection/Slideshow";
import OverlayContainer from "@/components/OverlayContainer/OverlayContainer";
import Card from "@/components/Card/Card";
import TestiSlider from "@/components/TestiSlider/TestiSlider";
import { itemType, productResponse } from "@/type/product";
import LinkButton from "@/components/Buttons/LinkButton";
import { productApi } from "@/_fakeApi_/product"
import { IndexProps } from "@/type/props";




const Home: React.FC<IndexProps> = ({ products }) => {
  const t = useTranslations("Index");
  const [currentItems, setCurrentItems] = useState(products);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) return;
    const fetchData = async () => {
      const res = await productApi.getProductsFilter(currentItems.length)

      const fetchedProducts = res.map((product: productResponse) => ({
        ...product,
        img1: product.image1,
        img2: product.image2,
      }));
      setCurrentItems((products) => [...products, ...fetchedProducts]);
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, currentItems.length]);

  const handleSeemore = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsFetching(true);
  };

  return (
    <>
      <Header />

      <Slideshow />

      <main id="main-content" className="-mt-20">
        <section className="w-full h-auto py-10 border border-b-2 border-gray100">
          <div className="grid h-full grid-cols-1 gap-4 app-max-width app-x-padding sm:grid-cols-2 lg:grid-cols-4">
            <div className="w-full sm:col-span-2 lg:col-span-2">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage1.jpg"
                imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
                imgAlt="New Arrivals"
              >
                <LinkButton
                  href="/product-category/new-arrivals"
                  extraClass="absolute bottom-10-per sm:right-10-per z-20"
                >
                  {t("new_arrivals")}
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage2.jpg"
                imgAlt="Women Collection"
              >
                <LinkButton
                  href="/product-category/women"
                  extraClass="absolute bottom-10-per z-20"
                >
                  {t("women_collection")}
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full">
              <OverlayContainer
                imgSrc="/bg-img/banner_minipage3.jpg"
                imgAlt="Men Collection"
              >
                <LinkButton
                  href="/product-category/men"
                  extraClass="absolute bottom-10-per z-20"
                >
                  {t("men_collection")}
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center w-full h-full mt-16 mb-20 app-max-width">
          <div className="flex justify-center">
            <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
              <h2 className="mb-4 text-3xl">{t("best_selling")}</h2>
              <span>{t("best_selling_desc")}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-10 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 app-x-padding">
            {currentItems.slice(0,4).map((item) => (
              <Card key={item.id} item={item} />
            ))}



          </div>
        </section>

        <section className="flex-col items-center hidden w-full h-full py-16 md:flex bg-lightgreen">
          <h2 className="text-3xl">{t("customerReviews")}</h2>
          <TestiSlider />
        </section>

        <section className="flex flex-col my-16 app-max-width app-x-padding">
          <div className="mb-6 text-center">
            <h2 className="text-3xl">{t("featured_products")}</h2>
          </div>
          <div className="grid grid-cols-2 mb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6">
            {currentItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              value={!isFetching ? t("see_more") : t("loading")}
              onClick={handleSeemore}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let products: itemType[] = [];
  const res = await productApi.getProductsFilter()
  console.log(res)
  const fetchedProducts = res;
  fetchedProducts.forEach((product: productResponse) => {
    products = [
      ...products,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        img1: product.image1,
        img2: product.image2,
      },
    ];
  });
  return {
    props: {
      messages: {
        ...require(`@/i18n/${locale}.json`),
      },
      products,
    },
  };
};

export default Home;
