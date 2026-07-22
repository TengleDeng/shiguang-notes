import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "拾光笔记 · 个人灵感工作台",
  description: "一款温暖、轻盈的个人笔记工作台。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
