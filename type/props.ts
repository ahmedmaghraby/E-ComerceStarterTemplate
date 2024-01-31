import { itemType } from "@/type/product";
import { NextComponentType, NextPageContext } from "next";
import { FormEvent } from "react";

export type CardProps = {
    item: itemType;
};

export type CartItemProps = {
    img: string;
    name: string;
    price: number;
    qty: number;
    onAdd?: () => void;
    onRemove?: () => void;
    onDelete?: () => void;
};

export type CurrentPage = "login" | "register" | "forgot-password";

export type AuthFrormProps = {
    extraClass?: string;
    children: any;
};

export type TextButtonProps = {
    value: string;
};

export type HeaderProps = {
    title?: string;
    desc?: string;
    keywords?: string;
};

export type LinkProps = {
    href: string;
    locale: "en" | "ar";
    active: boolean;
};

export type InputProps = {
    type?: string;
    name: string;
    placeholder?: string;
    extraClass?: string;
    required?: boolean;
    border?: string;
    id?: string;
    label?: string;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
    value?: string;
    readOnly?: boolean;
};

export type OverlayProps = {
    imgSrc: string;
    imgSrc2?: string;
    imgAlt?: string;
};

export type PaginationProps = {
    lastPage: number;
    currentPage: number;
    orderby: "latest" | "price" | "price-desc";
};


export type AppCustomProps = {
    Component: NextComponentType<NextPageContext, any, {}>;
    pageProps: any;
    cartState: string;
    wishlistState: string;
};

export type IndexProps = {
    products: itemType[];
};

export type searchWordProps = {
    items: itemType[];
    searchWord: string;
};

export type OrderType = "latest" | "price" | "price-desc";

export type CatProps = {
    items: itemType[];
    page: number;
    numberOfProducts: number;
    orderby: OrderType;
};

export type ProductProps = {
    product: itemType;
    products: itemType[];
};


export type ForgetPasssProps = {
    onLogin: () => void;
    errorMsg: string;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

export type LoginProps = {
    onRegister: () => void;
    onForgotPassword: () => void;
    errorMsg: string;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};


export type RegProps = {
    onLogin: () => void;
    errorMsg: string;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
    setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
};

export type buttonProps = {
    type?: "button" | "submit" | "reset";
    extraClass?: string;
    size?: "sm" | "lg" | "xl";
    value: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
