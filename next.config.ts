/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // تنظیمات برای GitHub Pages
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/my-auth-app" : "", // نام ریپازیتوری رو بنویس
  assetPrefix: isProd ? "/my-auth-app/" : "", // همون نام ریپازیتوری

  // تنظیمات تصاویر
  images: {
    unoptimized: true,
    domains: ["randomuser.me"],
  },

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
