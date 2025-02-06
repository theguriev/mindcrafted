import createRequest from "./createRequest";
import { telegramAuthorization } from "./schemas/";

export const api = {
  authorization: createRequest<telegramAuthorization.paths>({
    getBaseUrl: () => `${import.meta.env.VITE_API_URL}`,
  }),
};
