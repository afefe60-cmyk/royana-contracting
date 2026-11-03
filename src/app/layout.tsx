import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://royana.com.sa"),
  title: {
    default: "مؤسسة رؤيانا الحديثة للمقاولات | جدة",
    template: "%s | رؤيانا للمقاولات",
  },
  description:
    "مؤسسة مقاولات عامة رائدة في جدة متخصصة في أعمال الإنشاءات والبناء، الترميم والتشطيب، صيانة شبكات الكهرباء والمياه، والإشراف الهندسي.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
