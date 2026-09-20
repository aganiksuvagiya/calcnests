import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicit (this is also Next's default) so URLs never resolve two ways —
  // "/calculators/tip" and "/calculators/tip/" should never both work,
  // which would otherwise read as duplicate content to search engines.
  trailingSlash: false,
};

export default nextConfig;
