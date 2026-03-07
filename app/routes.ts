import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("panduan", "routes/panduan.tsx"),
    route("panduan/install", "routes/panduan.install.tsx"),
    route("api/feedback", "routes/api.feedback.ts"),
] satisfies RouteConfig;
