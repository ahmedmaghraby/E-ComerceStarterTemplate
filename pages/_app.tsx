import Router from "next/router";
import NProgress from "nprogress";
import { NextIntlProvider } from "next-intl";

import { ProvideCart } from "@/context/cart/CartProvider";
import { ProvideWishlist } from "@/context/wishlist/WishlistProvider";
import { ProvideAuth } from "@/context/AuthContext";

import "@/styles/globals.css";
import "animate.css";
import "nprogress/nprogress.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import { AppCustomProps } from "@/type/props";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());



const MyApp = ({ Component, pageProps }: AppCustomProps) => {
  return (
    <NextIntlProvider messages={pageProps?.messages}>
      <ProvideAuth>
        <ProvideWishlist>
          <ProvideCart>
            <Component {...pageProps} />
          </ProvideCart>
        </ProvideWishlist>
      </ProvideAuth>
    </NextIntlProvider>
  );
};

export default MyApp;
