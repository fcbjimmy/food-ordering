// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: { domains: ["res.cloudinary.com"] },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: { API_URL: "https://food-ordering-fcbjimmy.vercel.app" },
};

module.exports = nextConfig;
