/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
          pathname: "/v0/b/**", // Allows all Firebase Storage images
        },
        {
          protocol: "https",
          hostname: "via.placeholder.com",
          pathname: "/**", // Allows all Placeholder images
        },
      ],
    },
  };
  
  export default nextConfig;
  