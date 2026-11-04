import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: encodeURI("/الطبالي-الخشبية"),
        destination: "/ar/other-sectors/wooden-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/الطبالي-الخشبية/"),
        destination: "/ar/other-sectors/wooden-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/الطبالي-المعدنية"),
        destination: "/ar/other-sectors/metal-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/الطبالي-المعدنية/"),
        destination: "/ar/other-sectors/metal-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/الطبالي-البلاستيكية"),
        destination: "/ar/other-sectors/plastic-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/الطبالي-البلاستيكية/"),
        destination: "/ar/other-sectors/plastic-pallets",
        permanent: true,
      },
      {
        source: "/hello-world",
        destination: "/ar/other-sectors/plastic-pallets",
        permanent: true,
      },
      {
        source: "/hello-world/",
        destination: "/ar/other-sectors/plastic-pallets",
        permanent: true,
      },
      {
        source: encodeURI("/خدماتنا"),
        destination: "/ar/services",
        permanent: true,
      },
      {
        source: encodeURI("/خدماتنا/"),
        destination: "/ar/services",
        permanent: true,
      },
      {
        source: encodeURI("/تواصل-معنا"),
        destination: "/ar/contact",
        permanent: true,
      },
      {
        source: encodeURI("/تواصل-معنا/"),
        destination: "/ar/contact",
        permanent: true,
      },
      {
        source: "/",
        destination: "/ar",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
