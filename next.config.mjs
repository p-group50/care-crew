/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,

  images : {
    remotePatterns: [
      {
        hostname:"eu-central-1-shared-euc1-02.graphassets.com",
        protocol:"https",
      },
    ]
  } 
};

export default nextConfig;
