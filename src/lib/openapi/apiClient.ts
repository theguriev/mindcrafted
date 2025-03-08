import createRequest from "./createRequest";
import { Paths } from "./types";

export const api = {
  telegramAuthorization: createRequest<Paths["telegramAuthorization"]>({
    getBaseUrl: () => `${import.meta.env.VITE_API_URL}/authorization`,
  }),
  serviceMeasurements: createRequest<Paths["serviceMeasurements"]>({
    getBaseUrl: () => `${import.meta.env.VITE_API_URL}`,
  }),
};
