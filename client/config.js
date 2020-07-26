import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;
export const APP_API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.APP_API_PRODUCTION
  : publicRuntimeConfig.APP_API_DEVELOPMENT;
