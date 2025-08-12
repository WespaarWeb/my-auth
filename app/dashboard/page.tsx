"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/button/Button";

import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  // نمایش لودینگ
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div>در حال بارگذاری...</div>
        </div>
      </div>
    );
  }

  // ریدایرکت اگر کاربر وجود ندارد
  if (!user) {
    return null;
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user.picture?.medium ? (
              <Image
                src={user.picture.medium}
                alt={user.name}
                width={96}
                height={96}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className={styles.userInfo}>
            <h1>خوش آمدید، {user.name}!</h1>
            <p className={styles.email}>{user.email}</p>
            {user.phone && <p className={styles.phone}>📱 {user.phone}</p>}
            {user.cell && <p className={styles.phone}>📞 {user.cell}</p>}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.welcomeMessage}>
            <h2>داشبورد کاربری</h2>
            <p>شما با موفقیت وارد حساب کاربری خود شدید.</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <h3>وضعیت حساب</h3>
              <p>فعال ✅</p>
            </div>
            <div className={styles.statItem}>
              <h3>آخرین ورود</h3>
              <p>{new Date().toLocaleDateString("fa-IR")}</p>
            </div>
            {user.gender && (
              <div className={styles.statItem}>
                <h3>جنسیت</h3>
                <p>{user.gender === "female" ? "👩 خانم" : "👨 آقا"}</p>
              </div>
            )}
            {user.dob?.age && (
              <div className={styles.statItem}>
                <h3>سن</h3>
                <p>{user.dob.age} سال</p>
              </div>
            )}
          </div>

          {user.location && (
            <div className={styles.locationInfo}>
              <h3>اطلاعات مکانی</h3>
              <div className={styles.locationDetails}>
                {user.location.city && user.location.state && (
                  <p>
                    🏙️ {user.location.city}, {user.location.state}
                  </p>
                )}
                {user.location.country && <p>🌍 {user.location.country}</p>}
                {user.location.street && (
                  <p>
                    🏠 {user.location.street.number} {user.location.street.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button variant="danger" onClick={handleLogout} size="lg">
            خروج از حساب
          </Button>
        </div>
      </div>
    </main>
  );
}
