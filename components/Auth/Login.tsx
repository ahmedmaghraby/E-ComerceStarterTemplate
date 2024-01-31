import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { LoginProps } from "@/type/props";



const Login: React.FC<LoginProps> = ({
  onRegister,
  onForgotPassword,
  errorMsg,
  setErrorMsg,
  setSuccessMsg,
}) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("LoginRegister");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResponse = await auth.login!(email, password);
    if (loginResponse.success) {
      setSuccessMsg("login_successful");
    } else {
      setErrorMsg("incorrect_email_password");
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="my-8 text-4xl font-medium leading-6 text-center text-gray-900"
      >
        {t("login")}
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
        {errorMsg !== "" && (
          <div className="mb-4 text-sm text-red whitespace-nowrap">
            {t(errorMsg)}
          </div>
        )}
        <div className="flex justify-between mb-4">
          <div className="flex items-center text-gray400 focus:outline-none">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="w-4 h-4 mb-0 mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              {t("remember_me")}
            </label>
          </div>
          <span
            onClick={onForgotPassword}
            className="text-sm text-gray400 hover:text-gray500 focus:outline-none focus:text-gray500"
          >
            {t("forgot_password")}
          </span>
        </div>
        <Button
          type="submit"
          value={t("login")}
          extraClass="w-full text-center text-xl mb-4"
          size="lg"
        />
        <div className="text-center text-gray400">
          {t("not_member")}{" "}
          <span
            onClick={onRegister}
            className="cursor-pointer text-gray500 focus:outline-none focus:underline"
          >
            {t("register")}
          </span>
        </div>
      </form>
    </>
  );
};

export default Login;
