import { InputProps } from "@/type/props";
import { FC} from "react";



const Input: FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  extraClass,
  required = false,
  border = "",
  label = "",
  onChange,
  value,
  readOnly = false,
}) => (
  <input
    type={type}
    readOnly={readOnly}
    className={`${
      border !== "" ? border : "border-2 border-gray500"
    } py-2 px-4 outline-none ${extraClass}`}
    name={name}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
    value={value}
    aria-label={label}
  />
);

export default Input;
