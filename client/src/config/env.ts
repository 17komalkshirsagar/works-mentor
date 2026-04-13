
export const NODE_ENV = import.meta.env.VITE_NODE_ENV as string || "development"
export const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL as string || "http://localhost:5000"
export const LIVE_BACKEND_URL = import.meta.env.VITE_LIVE_BACKEND_URL as string || "http://localhost:5000"
export const APP_URL = NODE_ENV === "production" ? LIVE_BACKEND_URL : LOCAL_BACKEND_URL 