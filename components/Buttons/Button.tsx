import { buttonProps } from "@/type/props";
import { FC } from "react";


const Button: FC<buttonProps> = ({
  size = "sm",
  value,
  extraClass,
  onClick,
  children,
  type = "button",
  disabled = false,
}) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 sm:py-1 px-5";
  } else if (size === "lg") {
    btnSize = "py-3 sm:py-2 px-6";
  } else {
    btnSize = "py-4 sm:py-3 px-7 text-xl";
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-xl sm:text-base ${btnSize} border border-gray500 ${
        disabled
          ? "bg-gray400 text-gray300 cursor-not-allowed"
          : "bg-gray500 text-gray100 hover:text-gray300"
      } ${extraClass}`}
    >
      {value} <span className="ml-1">{children}</span>
    </button>
  );
};

export default Button;
