export type authType = {
  user: null | User;
  register?: (
    email: string,
    fullname: string,
    password: string,
    shippingAddress: string,
    phone: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  login?: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  forgotPassword?: (email: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  logout?: () => void;
};

export type User = {
  id: string;
  email: string;
  fullname: string;
  shippingAddress?: string;
  phone?: string;
  token: string;
  password?: string;
};

export type RegisterUser = {
  email: string;
  fullname: string;
  password: string;
  shippingAddress: string;
  phone: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type LoggedInUsers = {
  email: string;
  token: string;
};
