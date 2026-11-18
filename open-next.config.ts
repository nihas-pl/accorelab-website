import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// `npm run build` runs the OpenNext build, so the inner Next.js build must
// call `next build` directly to avoid recursing into the npm script.
config.buildCommand = "npx next build";

export default config;
