import { Fragment, useState, FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Buttons/Button";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import {CurrentPage, AuthFrormProps} from "@/type/props"


const LoginForm: FC<AuthFrormProps> = ({ extraClass, children }) => {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState<CurrentPage>("login");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const t = useTranslations("LoginRegister");

  let modalBox: JSX.Element;
  if (auth.user) {
    modalBox = (
      <SuccessModal successMsg={successMsg} setSuccessMsg={setSuccessMsg} />
    );
  } else {
    if (currentPage === "login") {
      modalBox = (
        <Login
          onRegister={() => setCurrentPage("register")}
          onForgotPassword={() => setCurrentPage("forgot-password")}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      );
    } else if (currentPage === "register") {
      modalBox = (
        <Register
          onLogin={() => setCurrentPage("login")}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      );
    } else {
      modalBox = (
        <ForgotPassword
          onLogin={() => setCurrentPage("login")}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      );
    }
  }

  function closeModal() {
    setOpen(false);
    setErrorMsg("");
    setTimeout(() => {
      setSuccessMsg("profile");
    }, 100);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <div className={`${extraClass}`}>
        <button
          type="button"
          onClick={openModal}
          aria-label="Account"
          className={`${extraClass}`}
        >
          {children}
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <button
                  type="button"
                  className="absolute text-2xl outline-none right-5 top-2 focus:outline-none"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
                {modalBox}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const SuccessModal = ({
  successMsg,
  setSuccessMsg,
}: {
  successMsg: string;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const t = useTranslations("LoginRegister");
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout!();
    setSuccessMsg("");
  };
  return (
    <>
      <Dialog.Title
        as="h3"
        className="my-8 text-xl font-medium leading-6 text-center text-gray-900 md:text-2xl whitespace-nowrap"
      >
        {successMsg !== "" ? t(successMsg) : t("profile")}
      </Dialog.Title>
      <div className="mb-12">
        <div>
          {t("name")} - {auth.user?.fullname}
        </div>
        <div>
          {t("email_address")} - {auth.user?.email}
        </div>
        <div>
          {t("phone")} - {auth.user?.phone && auth.user?.phone}
        </div>
        <div>
          {t("shipping_address")} -{" "}
          {auth.user?.shippingAddress && auth.user?.shippingAddress}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button value={t("logout")} onClick={handleLogout} />
      </div>
    </>
  );
};

export default LoginForm;
