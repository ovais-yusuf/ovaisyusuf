import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  prerender: [
    "/",
    "/projects/wc26-matchday",
    "/projects/mscc-chatbot",
    "/projects/drone-traffic",
  ],
} satisfies Config;
