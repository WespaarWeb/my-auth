import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // خروجی استاتیک برای GitHub Pages
  images: {
    unoptimized: true, // چون GitHub Pages قابلیت Image Optimization نداره
  },
  basePath: "/my-auth", // نام ریپازیتوری
  assetPrefix: "/my-auth/",
};

export default nextConfig;
