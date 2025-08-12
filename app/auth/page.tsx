"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import { useAuth } from "../../hooks/useAuth";
import { authSchema, AuthForm } from "../../utils/validation";
import type { ApiResponse, ApiUser } from "../../types/user";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [apiError, setApiError] = useState<string>("");

  // ریدایرکت اگر کاربر قبلاً لاگین کرده
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: AuthForm) => {
    setApiError("");

    try {
      // خواندن مستقیم از فایل api.json در public
      const res = await fetch("/api.json");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json: ApiResponse = await res.json();

      if (!json.results || json.results.length === 0) {
        throw new Error("No user data received");
      }

      const apiUser: ApiUser = json.results[0];

      const user = {
        id: apiUser.login?.uuid || Math.random().toString(36),
        name: `${apiUser.name?.first || ""} ${apiUser.name?.last || ""}`.trim(),
        email: apiUser.email || `user${Date.now()}@example.com`,
        phone: data.phone, // شماره وارد شده توسط کاربر
        picture: apiUser.picture || undefined,
        // اضافه کردن اطلاعات جدید
        gender: apiUser.gender,
        location: {
          street: apiUser.location?.street,
          city: apiUser.location?.city,
          state: apiUser.location?.state,
          country: apiUser.location?.country,
          postcode: apiUser.location?.postcode,
        },
        dob: apiUser.dob,
        cell: apiUser.cell,
      };

      login(user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Auth error:", err);
      setApiError(
        err instanceof Error
          ? `خطا در بارگذاری اطلاعات: ${err.message}`
          : "خطا در دریافت اطلاعات کاربر. لطفاً دوباره تلاش کنید."
      );
    }
  };

  // نمایش لودینگ در حین بررسی وضعیت احراز هویت
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <div style={{ textAlign: "center" }}>در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.header}>
          <h1>ورود به حساب کاربری</h1>
          <p>لطفاً شماره همراه خود را وارد کنید</p>
        </div>

        <Input
          label="شماره همراه"
          placeholder="مثال: 09123456789"
          type="tel"
          {...register("phone")}
          error={errors.phone?.message}
        />

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>

        <div className={styles.footer}>
          <p>با کلیک روی دکمه ورود، شرایط استفاده را می‌پذیرید.</p>
        </div>
      </form>
    </main>
  );
}
