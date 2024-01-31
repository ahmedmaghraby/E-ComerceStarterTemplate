import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { ForgetPasssProps } from "@/type/props";



const ForgotPassword: React.FC<ForgetPasssProps> = ({
  onLogin,
  errorMsg,
  setErrorMsg,
  setSuccessMsg,
}) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const t = useTranslations("LoginRegister");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const forgotPasswordResponse = await auth.forgotPassword!(email);
    console.log(forgotPasswordResponse);
    if (forgotPasswordResponse.success) {
      setSuccessMsg("login_successful");
    } else {
      setErrorMsg("incorrect_email_password");
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="my-8 text-3xl font-medium leading-10 text-center text-gray-900"
      >
        {t("forgot_password")}
      </Dialog.Title>
      <form onSubmit={handleSubmit} className="mt-2">
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
        {errorMsg !== "" && (
          <div className="mb-4 text-sm text-red whitespace-nowrap">
            {t(errorMsg)}
          </div>
        )}
        <Button
          type="submit"
          value={t("submit")}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          {t("go_back_to")}{" "}
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

export default ForgotPassword;
