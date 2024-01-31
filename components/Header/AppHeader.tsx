import React from "react";
import Head from "next/head";
import {HeaderProps} from "@/type/props"


const defaultDesc =
  "webook e-commerce";
const defaultKeywords =
  "Online Shop, E-commerce, men, wommen , shirts ";

const AppHeader: React.FC<HeaderProps> = ({
  title = "Webook",
  desc = defaultDesc,
  keywords = defaultKeywords,
}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta content={desc} name="description" key="description" />
      <meta content={keywords} name="keywords" key="keywords" />
      <meta property="og:description" content={desc} key="og_description" />
      <meta property="og:title" content={title} key="og_title" />
      <meta name="twitter:title" content={title} key="twitter_title" />
      <meta
        name="twitter:description"
        content={desc}
        key="twitter_description"
      />
    </Head>
  );
};

export default AppHeader;
