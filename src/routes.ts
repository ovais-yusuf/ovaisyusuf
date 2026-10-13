import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/page-layout.jsx", [
    index("./App.jsx"),
    route("projects/wc26-matchday", "./pages/WC26MatchdayPage.jsx"),
    route("projects/mscc-chatbot", "./pages/MSCCCaseStudyPage.jsx"),
    route("projects/drone-traffic", "./pages/DroneTrafficPage.jsx"),
  ]),
  route("*", "./routes/not-found.jsx"),
] satisfies RouteConfig;
