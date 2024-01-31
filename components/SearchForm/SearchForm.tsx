import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import SearchIcon from "@/public/icons/SearchIcon";
import { productResponse } from "@/type/product";
import { itemType } from "@/context/wishlist/wishlist-type";
import Card from "@/components/Card/Card";
import Loading from "@/public/icons/Loading";
import GhostButton from "@/components/Buttons/GhostButton";
import { useRouter } from "next/router";
import { productApi } from "@/_fakeApi_/product"

export default function SearchForm() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState<itemType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [moreThanFour, setMoreThanFour] = useState(false);

  function closeModal() {
    setOpen(false);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
  }

  function openModal() {
    setOpen(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    const fetchData = async () => {
      const res = await  productApi.searchProductBytName(searchValue);
      const fetchedProducts: productResponse[] = res.map(
        (product: productResponse) => ({
          ...product,
          img1: product.image1,
          img2: product.image2,
        })
      );
      if (fetchedProducts.length < 1) setNoResult(true);
      fetchedProducts.map((product, index) => {
        if (index < 4) {
          setSearchItems((prevProduct) => [...prevProduct, product]);
        } else {
          setMoreThanFour(true);
        }
      });
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, searchValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchItems([]);
    setIsFetching(true);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
    setSearchItems([]);
    setNoResult(false);
    setMoreThanFour(false);
  };

  return (
    <>
      <div className="">
        <button type="button" aria-label="Search" onClick={openModal}>
          <SearchIcon />
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-50 bg-gray500" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-400"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="ease-linear duration-300"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <div className="relative inline-block w-full pt-6 pb-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl translate-y">
                <div className="app-max-width app-x-padding">
                  <div className="w-3/5 m-auto">
                    <div className="flex justify-end mb-8">
                      <button
                        type="button"
                        className="text-2xl outline-none focus:outline-none"
                        onClick={closeModal}
                      >
                        &#10005;
                      </button>
                    </div>
                    <form
                      className="flex items-center mt-2"
                      onSubmit={handleSubmit}
                    >
                      {isFetching ? (
                        <Loading />
                      ) : (
                        <SearchIcon extraClass="text-gray300 w-8 h-8" />
                      )}
                      <input
                        type="search"
                        placeholder={t("search_anything")}
                        className="w-full px-4 py-2 text-2xl focus:outline-none"
                        onChange={handleChange}
                      />
                    </form>
                    <div className="border-t-2 border-gray300"></div>
                  </div>
                  {noResult ? (
                    <div className="flex justify-center mt-8">
                      <span>{t("no_result")}</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        className="grid justify-center my-8 gap-x-4"
                        style={{
                          gridTemplateColumns:
                            "repeat( auto-fit, minmax(120px, 170px) )",
                        }}
                      >
                        {searchItems.map((item) => (
                          <Card key={item.id} item={item} />
                        ))}
                      </div>
                      {moreThanFour && (
                        <GhostButton
                          onClick={() =>
                            router.push(`/search?q=${searchValue}`)
                          }
                        >
                          {t("view_all")}
                        </GhostButton>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
