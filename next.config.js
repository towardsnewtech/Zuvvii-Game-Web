/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["www.dropbox.com", "zuvvii-prod.us-east-1.linodeobjects.com", "clips-media-assets2.twitch.tv"],
  },
  compiler: {
    styledComponents: true,
  }
};

module.exports = nextConfig;
