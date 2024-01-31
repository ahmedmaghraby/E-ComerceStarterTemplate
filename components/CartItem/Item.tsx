import Image from "next/image";
import React, { FC, useContext } from "react";
import { roundDecimal } from "@/components/Util/utilFunc";
import {CartItemProps} from "@/type/props"



const Item: FC<CartItemProps> = ({
  img,
  name,
  price,
  qty,
  onAdd,
  onRemove,
  onDelete,
}) => {
  return (
    <div className="flex pb-4 my-4 bg-white border-b-2 item border-gray200">
      <Image className="w-2/12" src={img} alt={name} width={70} height={104} />
      <div className="flex-grow mx-4 midPart">
        <span>{name}</span>
        <div className="flex w-2/6 mt-4 border divide-x-2 plusOrMinus border-gray300 divide-gray300">
          <div
            onClick={onRemove}
            className="flex items-center justify-center w-12 h-full cursor-pointer hover:bg-gray500 hover:text-gray100"
          >
            -
          </div>
          <div className="flex items-center justify-center w-12 h-full pointer-events-none">
            {qty}
          </div>
          <div
            onClick={onAdd}
            className="flex items-center justify-center w-12 h-full cursor-pointer hover:bg-gray500 hover:text-gray100"
          >
            +
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end lastPart">
        <button
          onClick={onDelete}
          type="button"
          className="mb-3 text-xl outline-none text-gray300 hover:text-gray500 focus:outline-none"
        >
          &#10005;
        </button>
        <span>$ {roundDecimal(price)}</span>
      </div>
    </div>
  );
};

export default Item;
