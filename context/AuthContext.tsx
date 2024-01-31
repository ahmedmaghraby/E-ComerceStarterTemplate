import { getCookie, removeCookies, setCookies } from "cookies-next";
import React, { useState, useEffect, useContext, createContext } from "react";
import { User, authType } from "@/type/user";
import { userApi } from "@/_fakeApi_/users"

const initialAuth: authType = {
  user: null,
};

const authContext = createContext<authType>(initialAuth);



export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initialAuth = getCookie("user");
    if (initialAuth) {
      const initUser = JSON.parse(initialAuth as string);
      setUser(initUser);
    }
  }, []);

  useEffect(() => {
    setCookies("user", user);
  }, [user]);

  const register = async (
    email: string,
    fullname: string,
    password: string,
    shippingAddress: string,
    phone: string
  ) => {
    try {
      const response = await userApi.createUsers({
        email,
        fullname,
        password,
        shippingAddress,
        phone,
      })
      const user: User = {
        id: response.id,
        email,
        fullname,
        shippingAddress,
        phone,
        token: response.token,
      };
      setUser(user);
      return {
        success: true,
        message: "register_successful",
      };
    } catch (err) {
      const errResponse = (err as any).response.data;
      let errorMessage: string;
      if (errResponse.error.type === "alreadyExists") {
        errorMessage = errResponse.error.type;
      } else {
        errorMessage = errResponse.error.detail.message;
      }
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await userApi.loginUser({
        email,
        password,
      });
      const user: User = {
        id: response.id,
        email,
        fullname: response.fullname,
        phone: response.phone,
        shippingAddress: response.shippingAddress,
        token: response.token,
      };
      setUser(user);
      return {
        success: true,
        message: "login_successful",
      };
    } catch (err) {
      return {
        success: false,
        message: "incorrect",
      };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await userApi.forgotPassword(email);
      setUser(user);
      return {
        success: true,
        message: "reset_email_sent",
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "something_went_wrong",
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeCookies("user");
  };

  return {
    user,
    register,
    login,
    forgotPassword,
    logout,
  };
}
