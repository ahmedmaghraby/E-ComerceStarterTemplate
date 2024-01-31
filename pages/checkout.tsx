import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { GetStaticProps } from "next";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Button from "@/components/Buttons/Button";
import { roundDecimal } from "@/components/Util/utilFunc";
import { useCart } from "@/context/cart/CartProvider";
import Input from "@/components/Input/Input";
import { itemType } from "@/context/wishlist/wishlist-type";
import { useAuth } from "@/context/AuthContext";
import { DeliveryType, Order, PaymentType } from "@/type/order";

import { orderApi } from "@/_fakeApi_/order"

const ShoppingCart = () => {
  const t = useTranslations("CartWishlist");
  const { cart, clearCart } = useCart();
  const auth = useAuth();
  const [deli, setDeli] = useState<DeliveryType>("STORE_PICKUP");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentType>("CASH_ON_DELIVERY");

  const [name, setName] = useState(auth.user?.fullname || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [phone, setPhone] = useState(auth.user?.phone || "");
  const [password, setPassword] = useState("");
  const [diffAddr, setDiffAddr] = useState(false);
  const [address, setAddress] = useState(auth.user?.shippingAddress || "");
  const [shippingAddress, setShippingAddress] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [orderError, setOrderError] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const products = cart.map((item) => ({
    id: item.id,
    quantity: item.qty,
  }));

  useEffect(() => {
    if (!isOrdering) return;

    setErrorMsg("");

    const registerUser = async () => {
      const regResponse = await auth.register!(
        email,
        name,
        password,
        address,
        phone
      );
      if (!regResponse.success) {
        setIsOrdering(false);
        if (regResponse.message === "alreadyExists") {
          setErrorMsg("email_already_exists");
        } else {
          setErrorMsg("error_occurs");
        }
        return false;
      }
    };
    if (!auth.user) registerUser();

    const makeOrder = async () => {
      const res = await orderApi.createOrder({
        customerId: auth!.user!.id,
        shippingAddress: shippingAddress ? shippingAddress : address,
        totalPrice: parseFloat(subtotal.toString()),
        deliveryDate: new Date().setDate(new Date().getDate() + 7),
        paymentType: paymentMethod,
        deliveryType: deli,
        products,
        sendEmail,
      }) 
      if (res) {
        setCompletedOrder(res);
        clearCart!();
        setIsOrdering(false);
      } else {
        setOrderError("error_occurs");
      }
    };
    if (auth.user) makeOrder();
  }, [isOrdering, completedOrder, auth.user]);

  useEffect(() => {
    if (auth.user) {
      setName(auth.user.fullname);
      setEmail(auth.user.email);
      setAddress(auth.user.shippingAddress || "");
      setPhone(auth.user.phone || "");
    } else {
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
    }
  }, [auth.user]);

  let disableOrder = true;

  if (!auth.user) {
    disableOrder =
      name !== "" &&
      email !== "" &&
      phone !== "" &&
      address !== "" &&
      password !== ""
        ? false
        : true;
  } else {
    disableOrder =
      name !== "" && email !== "" && phone !== "" && address !== ""
        ? false
        : true;
  }

  let subtotal: number | string = 0;

  subtotal = roundDecimal(
    cart.reduce(
      (accumulator: number, currentItem: itemType) =>
        accumulator + currentItem.price * currentItem!.qty!,
      0
    )
  );

  let deliFee = 0;
  if (deli === "YANGON") {
    deliFee = 2.0;
  } else if (deli === "OTHERS") {
    deliFee = 7.0;
  }

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`Shopping Cart - Haru Fashion`} />

      <main id="main-content">
        {/* ===== Heading & Continue Shopping */}
        <div className="w-full px-4 border-t-2 app-max-width sm:px-8 md:px-20 border-gray100">
          <h1 className="mt-6 mb-2 text-2xl text-center sm:text-4xl sm:text-left animatee__animated animate__bounce">
            {t("checkout")}
          </h1>
        </div>

        {/* ===== Form Section ===== */}
        {!completedOrder ? (
          <div className="flex flex-col px-4 app-max-width sm:px-8 md:px-20 mb-14 lg:flex-row">
            <div className="w-full h-full mr-8 lg:w-7/12">
              {errorMsg !== "" && (
                <span className="text-sm font-semibold text-red">
                  - {t(errorMsg)}
                </span>
              )}
              <div className="my-4">
                <label htmlFor="name" className="text-lg">
                  {t("name")}
                </label>
                <Input
                  name="name"
                  type="text"
                  extraClass="w-full mt-1 mb-2"
                  border="border-2 border-gray400"
                  value={name}
                  onChange={(e) =>
                    setName((e.target as HTMLInputElement).value)
                  }
                  required
                />
              </div>

              <div className="my-4">
                <label htmlFor="email" className="mb-1 text-lg">
                  {t("email_address")}
                </label>
                <Input
                  name="email"
                  type="email"
                  readOnly={auth.user ? true : false}
                  extraClass={`w-full mt-1 mb-2 ${
                    auth.user ? "bg-gray100 cursor-not-allowed" : ""
                  }`}
                  border="border-2 border-gray400"
                  value={email}
                  onChange={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                  required
                />
              </div>

              {!auth.user && (
                <div className="my-4">
                  <label htmlFor="password" className="text-lg">
                    {t("password")}
                  </label>
                  <Input
                    name="password"
                    type="password"
                    extraClass="w-full mt-1 mb-2"
                    border="border-2 border-gray400"
                    value={password}
                    onChange={(e) =>
                      setPassword((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </div>
              )}

              <div className="my-4">
                <label htmlFor="phone" className="text-lg">
                  {t("phone")}
                </label>
                <Input
                  name="phone"
                  type="text"
                  extraClass="w-full mt-1 mb-2"
                  border="border-2 border-gray400"
                  value={phone}
                  onChange={(e) =>
                    setPhone((e.target as HTMLInputElement).value)
                  }
                  required
                />
              </div>

              <div className="my-4">
                <label htmlFor="address" className="text-lg">
                  {t("address")}
                </label>
                <textarea
                  aria-label="Address"
                  className="w-full p-4 mt-1 mb-2 border-2 outline-none border-gray400"
                  rows={4}
                  value={address}
                  onChange={(e) =>
                    setAddress((e.target as HTMLTextAreaElement).value)
                  }
                />
              </div>

              <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  checked={diffAddr}
                  onChange={() => setDiffAddr(!diffAddr)}
                  className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox border-gray300"
                />
                <label
                  htmlFor="toggle"
                  className="block h-6 overflow-hidden rounded-full cursor-pointer toggle-label bg-gray300"
                ></label>
              </div>
              <label htmlFor="toggle" className="text-xs text-gray-700">
                {t("different_shipping_address")}
              </label>

              {diffAddr && (
                <div className="my-4">
                  <label htmlFor="shipping_address" className="text-lg">
                    {t("shipping_address")}
                  </label>
                  <textarea
                    id="shipping_address"
                    aria-label="shipping address"
                    className="w-full p-4 mt-1 mb-2 border-2 outline-none border-gray400"
                    rows={4}
                    value={shippingAddress}
                    onChange={(e) =>
                      setShippingAddress(
                        (e.target as HTMLTextAreaElement).value
                      )
                    }
                  />
                </div>
              )}

              {!auth.user && (
                <div className="mt-8 text-sm leading-6 text-gray400">
                  {t("form_note")}
                </div>
              )}
            </div>
            <div className="w-full h-full mt-10 lg:w-5/12 lg:mt-4">
              {/* Cart Totals */}
              <div className="p-6 border divide-y-2 border-gray500 divide-gray200">
                <div className="flex justify-between">
                  <span className="mb-3 text-base uppercase">
                    {t("product")}
                  </span>
                  <span className="mb-3 text-base uppercase">
                    {t("subtotal")}
                  </span>
                </div>

                <div className="pt-2">
                  {cart.map((item) => (
                    <div className="flex justify-between mb-2" key={item.id}>
                      <span className="text-base font-medium">
                        {item.name}{" "}
                        <span className="text-gray400">x {item.qty}</span>
                      </span>
                      <span className="text-base">
                        $ {roundDecimal(item.price * item!.qty!)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between py-3">
                  <span className="uppercase">{t("subtotal")}</span>
                  <span>$ {subtotal}</span>
                </div>

                <div className="py-3">
                  <span className="uppercase">{t("delivery")}</span>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="deli"
                          value="STORE_PICKUP"
                          id="pickup"
                          checked={deli === "STORE_PICKUP"}
                          onChange={() => setDeli("STORE_PICKUP")}
                        />{" "}
                        <label htmlFor="pickup" className="cursor-pointer">
                          {t("store_pickup")}
                        </label>
                      </div>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <input
                          type="radio"
                          name="deli"
                          value="YANGON"
                          id="ygn"
                          checked={deli === "YANGON"}
                          onChange={() => setDeli("YANGON")}
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
                          value="OTHERS"
                          id="others"
                          checked={deli === "OTHERS"}
                          onChange={() => setDeli("OTHERS")}
                        />{" "}
                        <label htmlFor="others" className="cursor-pointer">
                          {t("other_cities")}
                        </label>
                      </div>
                      <span>$ 7.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between py-3">
                    <span>{t("grand_total")}</span>
                    <span>$ {roundDecimal(+subtotal + deliFee)}</span>
                  </div>

                  <div className="grid gap-4 mt-2 mb-4">
                    <label
                      htmlFor="plan-cash"
                      className="relative flex flex-col p-5 bg-white border rounded-lg shadow-md cursor-pointer border-gray300"
                    >
                      <span className="text-base font-semibold leading-tight text-gray-500 capitalize">
                        {t("cash_on_delivery")}
                      </span>
                      <input
                        type="radio"
                        name="plan"
                        id="plan-cash"
                        value="CASH_ON_DELIVERY"
                        className="absolute w-0 h-0 appearance-none"
                        onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                      />
                      <span
                        aria-hidden="true"
                        className={`${
                          paymentMethod === "CASH_ON_DELIVERY"
                            ? "block"
                            : "hidden"
                        } absolute inset-0 border-2 border-gray500 bg-opacity-10 rounded-lg`}
                      >
                        <span className="absolute inline-flex items-center justify-center w-6 h-6 rounded-full top-4 right-4 bg-gray100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-green-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </span>
                    </label>
                    <label
                      htmlFor="plan-bank"
                      className="relative flex flex-col p-5 bg-white border rounded-lg shadow-md cursor-pointer border-gray300"
                    >
                      <span className="font-semibold leading-tight text-gray-500 capitalize">
                        {t("bank_transfer")}
                      </span>
                      <span className="mt-1 text-sm text-gray400">
                        {t("bank_transfer_desc")}
                      </span>
                      <input
                        type="radio"
                        name="plan"
                        id="plan-bank"
                        value="BANK_TRANSFER"
                        className="absolute w-0 h-0 appearance-none"
                        onChange={() => setPaymentMethod("BANK_TRANSFER")}
                      />
                      <span
                        aria-hidden="true"
                        className={`${
                          paymentMethod === "BANK_TRANSFER" ? "block" : "hidden"
                        } absolute inset-0 border-2 border-gray500 bg-opacity-10 rounded-lg`}
                      >
                        <span className="absolute inline-flex items-center justify-center w-6 h-6 rounded-full top-4 right-4 bg-gray100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-green-600"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className="my-8">
                    <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none">
                      <input
                        type="checkbox"
                        name="send-email-toggle"
                        id="send-email-toggle"
                        checked={sendEmail}
                        onChange={() => setSendEmail(!sendEmail)}
                        className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox border-gray300"
                      />
                      <label
                        htmlFor="send-email-toggle"
                        className="block h-6 overflow-hidden rounded-full cursor-pointer toggle-label bg-gray300"
                      ></label>
                    </div>
                    <label
                      htmlFor="send-email-toggle"
                      className="text-xs text-gray-700"
                    >
                      {t("send_order_email")}
                    </label>
                  </div>
                </div>

                <Button
                  value={t("place_order")}
                  size="xl"
                  extraClass={`w-full`}
                  onClick={() => setIsOrdering(true)}
                  disabled={disableOrder}
                />
              </div>

              {orderError !== "" && (
                <span className="text-sm font-semibold text-red">
                  - {orderError}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="px-4 mt-6 app-max-width sm:px-8 md:px-20 mb-14">
            <div className="text-base text-gray400">{t("thank_you_note")}</div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full h-full mt-2 md:w-1/2 lg:mt-4">
                <div className="p-6 border divide-y-2 border-gray500 divide-gray200">
                  <div className="flex justify-between">
                    <span className="mb-3 text-base uppercase">
                      {t("order_id")}
                    </span>
                    <span className="mb-3 text-base uppercase">
                      {completedOrder.orderNumber}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-base">{t("email_address")}</span>
                      <span className="text-base">{auth.user?.email}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-base">{t("order_date")}</span>
                      <span className="text-base">
                        {new Date(
                          completedOrder.orderDate ?? ''
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-base">{t("delivery_date")}</span>
                      <span className="text-base">
                        {new Date(
                          completedOrder.deliveryDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="py-3">
                    <div className="flex justify-between mb-2">
                      <span className="">{t("payment_method")}</span>
                      <span>{completedOrder.paymentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">{t("delivery_method")}</span>
                      <span>{completedOrder.deliveryType}</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 mb-2">
                    <span className="text-base uppercase">{t("total")}</span>
                    <span className="text-base">
                      $ {completedOrder.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-full mt-4 md:w-1/2 md:ml-8 md:mt-2 lg:mt-4">
                <div>
                  {t("your_order_received")}
                  {completedOrder.paymentType === "BANK_TRANSFER" &&
                    t("bank_transfer_note")}
                  {completedOrder.paymentType === "CASH_ON_DELIVERY" &&
                    completedOrder.deliveryType !== "STORE_PICKUP" &&
                    t("cash_delivery_note")}
                  {completedOrder.deliveryType === "STORE_PICKUP" &&
                    t("store_pickup_note")}
                  {t("thank_you_for_purchasing")}
                </div>

                {completedOrder.paymentType === "BANK_TRANSFER" ? (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold">
                      {t("our_banking_details")}
                    </h2>
                    <span className="block my-1 uppercase">Sat Naing :</span>

                    <div className="flex justify-between w-full xl:w-1/2">
                      <span className="text-sm font-bold">AYA Bank</span>
                      <span className="text-base">20012345678</span>
                    </div>
                    <div className="flex justify-between w-full xl:w-1/2">
                      <span className="text-sm font-bold">CB Bank</span>
                      <span className="text-base">0010123456780959</span>
                    </div>
                    <div className="flex justify-between w-full xl:w-1/2">
                      <span className="text-sm font-bold">KPay</span>
                      <span className="text-base">095096051</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-56">
                    <div className="w-3/4">
                      <Image
                        className="justify-center"
                        src="/logo.svg"
                        alt="Haru Fashion"
                        width={220}
                        height={50}
                        layout="responsive"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===== Footer Section ===== */}
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
