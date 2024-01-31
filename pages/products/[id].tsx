import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { useTranslations } from "next-intl";

import Heart from "@/public/icons/Heart";
import DownArrow from "@/public/icons/DownArrow";
import FacebookLogo from "@/public/icons/FacebookLogo";
import InstagramLogo from "@/public/icons/InstagramLogo";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import GhostButton from "@/components/Buttons/GhostButton";
import Button from "@/components/Buttons/Button";
import Card from "@/components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import { productResponse, itemType } from "@/type/product";
import { useWishlist } from "@/context/wishlist/WishlistProvider";
import { useCart } from "@/context/cart/CartProvider";
import HeartSolid from "@/public/icons/HeartSolid";
import { productApi } from "@/_fakeApi_/product"
import { ProductProps } from "@/type/props";

SwiperCore.use([Pagination]);


const Product: React.FC<ProductProps> = ({ product, products }) => {
  const img1 = product.img1;
  const img2 = product.img2;

  const { addItem } = useCart();
  const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist();
  const [size, setSize] = useState("M");
  const [mainImg, setMainImg] = useState(img1);
  const [currentQty, setCurrentQty] = useState(1);
  const t = useTranslations("Category");

  const alreadyWishlisted =
    wishlist.filter((wItem) => wItem.id === product.id).length > 0;

  useEffect(() => {
    setMainImg(product.img1);
  }, [product]);

  const handleSize = (value: string) => {
    setSize(value);
  };

  const currentItem = {
    ...product,
    qty: currentQty,
  };

  const handleWishlist = () => {
    alreadyWishlisted
      ? deleteWishlistItem!(currentItem)
      : addToWishlist!(currentItem);
  };

  return (
    <div>
      <Header title={`${product.name} - Webook`} />

      <main id="main-content">
        <div className="flex items-center w-full h-16 border-t-2 bg-lightgreen border-gray200">
          <div className="w-full app-x-padding app-max-width">
            <div className="breadcrumb">
              <Link href="/">
                <a className="text-gray400">{t("home")}</a>
              </Link>{" "}
              /{" "}
              <Link href={`/product-category/${product.categoryName}`}>
                <a className="capitalize text-gray400">
                  {t(product.categoryName as string)}
                </a>
              </Link>{" "}
              / <span>{product.name}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col itemSection app-max-width app-x-padding md:flex-row">
          <div className="flex w-full h-full imgSection md:w-1/2">
            <div className="hidden w-full h-full my-4 space-y-4 sm:block sm:w-1/4">
              <Image
                className={`cursor-pointer ${
                  mainImg === img1
                    ? "opacity-100 border border-gray300"
                    : "opacity-50"
                }`}
                onClick={() => setMainImg(img1)}
                src={img1 as string}
                alt={product.name}
                width={1000}
                height={1282}
              />
              <Image
                className={`cursor-pointer ${
                  mainImg === img2
                    ? "opacity-100 border border-gray300"
                    : "opacity-50"
                }`}
                onClick={() => setMainImg(img2)}
                src={img2 as string}
                alt={product.name}
                width={1000}
                height={1282}
              />
            </div>
            <div className="w-full h-full m-0 sm:w-3/4 sm:m-4">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper sm:hidden"
              >
                <SwiperSlide>
                  <Image
                    className="w-full each-slide"
                    src={img1 as string}
                    width={1000}
                    height={1282}
                    alt={product.name}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    className="w-full each-slide"
                    src={img2 as string}
                    width={1000}
                    height={1282}
                    alt={product.name}
                  />
                </SwiperSlide>
              </Swiper>
              <div className="hidden h-full sm:block">
                <Image
                  className="w-full"
                  src={mainImg as string}
                  width={1000}
                  height={1282}
                  alt={product.name}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full h-auto py-8 infoSection md:w-1/2 sm:pl-4">
            <h1 className="mb-4 text-3xl">{product.name}</h1>
            <span className="mb-2 text-2xl text-gray400">
              $ {product.price}
            </span>
            <span className="mb-2 text-justify">{product.description}</span>
            <span className="mb-2">
              {t("availability")}: {t("in_stock")}
            </span>
            <span className="mb-2">
              {t("size")}: {size}
            </span>
            <div className="flex mb-4 space-x-4 text-sm sizeContainer">
              <div
                onClick={() => handleSize("S")}
                className={`w-8 h-8 flex items-center justify-center border ${
                  size === "S"
                    ? "border-gray500"
                    : "border-gray300 text-gray400"
                } cursor-pointer hover:bg-gray500 hover:text-gray100`}
              >
                S
              </div>
              <div
                onClick={() => handleSize("M")}
                className={`w-8 h-8 flex items-center justify-center border ${
                  size === "M"
                    ? "border-gray500"
                    : "border-gray300 text-gray400"
                } cursor-pointer hover:bg-gray500 hover:text-gray100`}
              >
                M
              </div>
              <div
                onClick={() => handleSize("L")}
                className={`w-8 h-8 flex items-center justify-center border ${
                  size === "L"
                    ? "border-gray500"
                    : "border-gray300 text-gray400"
                } cursor-pointer hover:bg-gray500 hover:text-gray100`}
              >
                L
              </div>
            </div>
            <div className="flex flex-col mb-4 space-y-4 addToCart sm:flex-row md:flex-col lg:flex-row sm:space-y-0">
              <div className="flex justify-center h-12 mb-4 mr-0 border divide-x-2 plusOrMinus border-gray300 divide-gray300 sm:mr-4 md:mr-0 lg:mr-4">
                <div
                  onClick={() => setCurrentQty((prevState) => prevState - 1)}
                  className={`${
                    currentQty === 1 && "pointer-events-none"
                  } h-full w-full sm:w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100`}
                >
                  -
                </div>
                <div className="flex items-center justify-center h-full pointer-events-none w-28 sm:w-12">
                  {currentQty}
                </div>
                <div
                  onClick={() => setCurrentQty((prevState) => prevState + 1)}
                  className="flex items-center justify-center w-full h-full cursor-pointer sm:w-12 hover:bg-gray500 hover:text-gray100"
                >
                  +
                </div>
              </div>
              <div className="flex w-full h-12 space-x-4">
                <Button
                  value={t("add_to_cart")}
                  size="lg"
                  extraClass={`flex-grow text-center whitespace-nowrap`}
                  onClick={() => addItem!(currentItem)}
                />
                <GhostButton onClick={handleWishlist}>
                  {alreadyWishlisted ? (
                    <HeartSolid extraClass="inline" />
                  ) : (
                    <Heart extraClass="inline" />
                  )}
                </GhostButton>
              </div>
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between py-2 mb-4 text-left border-b-2 focus:outline-none border-gray200">
                    <span>{t("details")}</span>
                    <DownArrow
                      extraClass={`${
                        open ? "" : "transform rotate-180"
                      } w-5 h-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`text-gray400 animate__animated animate__bounceIn`}
                  >
                    {product.detail}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <div className="flex items-center mt-4 space-x-4">
              <span>{t("share")}</span>
              <FacebookLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
              <InstagramLogo extraClass="h-4 cursor-pointer text-gray400 hover:text-gray500" />
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray200"></div>

        <div className="my-8 recSection app-max-width app-x-padding">
          <h2 className="mb-6 text-3xl">{t("you_may_also_like")}</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            loop={true}
            grabCursor={true}
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            className="mySwiper card-swiper sm:hidden"
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="mb-6">
                  <Card key={item.id} item={item} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hidden grid-cols-2 mb-10 sm:grid sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6">
            {products.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const paramId = params!.id as string;
  const res = await  productApi.getProductById(paramId);

  const fetchedProduct: productResponse = res;

  let product: itemType = {
    id: fetchedProduct.id,
    name: fetchedProduct.name,
    price: fetchedProduct.price,
    detail: fetchedProduct.detail,
    img1: fetchedProduct.image1,
    img2: fetchedProduct.image2,
    categoryName: fetchedProduct!.category!.name,
  };

  const randomProductRes = await  productApi.getProductsByCategoryName(product.categoryName ?? "");

  const fetchedProducts: productResponse[] = randomProductRes;

  const shuffled = fetchedProducts.sort(() => 0.5 - Math.random());

  let randomFetchedProducts = shuffled.slice(0, 5);

  let products: itemType[] = [];
  randomFetchedProducts.forEach((randomProduct: productResponse) => {
    products.push({
      id: randomProduct.id,
      name: randomProduct.name,
      price: randomProduct.price,
      img1: randomProduct.image1,
      img2: randomProduct.image2,
    });
  });

  return {
    props: {
      product,
      products,
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
};

export default Product;
