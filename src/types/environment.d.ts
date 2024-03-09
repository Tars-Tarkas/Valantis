export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string;
      REACT_APP_LIMIT: number;
      REACT_APP_URL_PASSWORD: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
