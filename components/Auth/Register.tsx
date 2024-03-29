import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";

import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { useAuth } from "@/context/AuthContext";
import { RegProps } from "@/type/props";



const Register: React.FC<RegProps> = ({
  onLogin,
  errorMsg,
  setErrorMsg,
  setSuccessMsg,
}) => {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const t = useTranslations("LoginRegister");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regResponse = await auth.register!(
      email,
      name,
      password,
      address,
      phone
    );
    if (regResponse.success) {
      setSuccessMsg("register_successful");
    } else {
      if (regResponse.message === "alreadyExists") {
        setErrorMsg("email_already_exists");
      } else {
        setErrorMsg("error_occurs");
      }
    }
  };

  auth.user ? console.log(auth.user) : console.log("No User");

  return (
    <>
      <Dialog.Title
        as="h3"
        className="my-8 text-4xl font-medium leading-6 text-center text-gray-900"
      >
        {t("register")}
      </Dialog.Title>
      <form onSubmit={handleSubmit} className="mt-2">
        <Input
          type="name"
          placeholder={`${t("name")} *`}
          name="name"
          required
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          value={name}
        />
        <Input
          type="email"
          placeholder={`${t("email_address")} *`}
          name="email"
          required
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          value={email}
        />
        <Input
          type="password"
          placeholder={`${t("password")} *`}
          name="password"
          required
          extraClass="w-full focus:border-gray500 mb-4"
          border="border-2 border-gray300"
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          value={password}
        />
        <Input
          type="text"
          placeholder={`${t("shipping_address")}`}
          name="shipping_address"
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setAddress((e.target as HTMLInputElement).value)}
          value={address}
        />
        <Input
          type="text"
          placeholder={`${t("phone")}`}
          name="phone"
          extraClass="w-full focus:border-gray500"
          border="border-2 border-gray300 mb-4"
          onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
          value={phone}
        />
        {errorMsg !== "" && (
          <div className="mb-2 text-sm text-red whitespace-nowrap">
            {t(errorMsg)}
          </div>
        )}
        <div className="flex justify-between mb-4">
          <p className="text-xs text-gray400">{t("register_desc")}</p>
        </div>
        <Button
          type="submit"
          value={t("register")}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          {t("already_member")}{" "}
          <span
            onClick={onLogin}
            className="cursor-pointer text-gray500 focus:outline-none focus:underline"
          >
            {t("login")}
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
