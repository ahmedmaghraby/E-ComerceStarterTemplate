import Link from "next/link";
import { useTranslations } from "next-intl";

import FacebookLogo from "@/public/icons/FacebookLogo";
import InstagramLogo from "@/public/icons/InstagramLogo";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import styles from "@/components/Footer/Footer.module.css";

export default function Footer() {
  const t = useTranslations("Navigation");

  return (
    <>
      <div className={styles.footerContainer}>
        <div className={`app-max-width app-x-padding ${styles.footerContents}`}>
          <div>
            <h3 className={styles.footerHead}>{t("company")}</h3>
            <div className={styles.column}>
              <Link href="/coming-soon">{t("about_us")}</Link>
              <Link href="/coming-soon">{t("contact_us")}</Link>
              <Link href="/coming-soon">{t("store_location")}</Link>
              <Link href="/coming-soon">{t("careers")}</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("help")}</h3>
            <div className={styles.column}>
              <Link href="/coming-soon">{t("order_tracking")}</Link>
              <Link href="/coming-soon">{t("faqs")}</Link>
              <Link href="/coming-soon">{t("privacy_policy")}</Link>
              <Link href="/coming-soon">{t("terms_conditions")}</Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("store")}</h3>
            <div className={styles.column}>
              <Link href={`/product-category/women`}>
                {t("women")}
              </Link>
              <Link href={`/product-category/men`}>
                {t("men")}
              </Link>
              <Link href={`/product-category/bags`}>
                {t("bags")}
              </Link>
            </div>
          </div>
          <div>
            <h3 className={styles.footerHead}>{t("keep_in_touch")}</h3>
            <div className={styles.column}>
              <span>
                {t("address.detail")}
                <br />
                {t("address.road")}
                <br />
                {t("address.city")}
              </span>
              <span>{t("phone_number")}</span>
              <span>
                {t("open_all_days")} <br />- {t("opening_hours")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className="flex justify-between w-full app-max-width app-x-padding">
          <span className="">@{new Date().getFullYear()} Webook. {t("all_rights_reserved")}</span>
          <span className="flex items-center">
            <span className="hidden sm:block">
              {t("follow_us_on_social_media")}:
            </span>{" "}
            <Link
              href="www.facebook.com"
              aria-label="Facebook Page for webook page"
            >
              <FacebookLogo />
            </Link>
            <Link
              href="www.ig.com"
              aria-label="Instagram Account for webook page"
            >
              <InstagramLogo />
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
