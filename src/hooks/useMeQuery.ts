import { api } from "@/lib/openapi/apiClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useMeQuery = () =>
  useSuspenseQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const request = await api.authorization("/", "get", {
        headers: { "Content-type": "application/json" },
      });

      if (request.status === 200) {
        return request.json();
      }
      const refreshTokenRequest = await api.authorization("/refresh", "get", {
        headers: { "Content-type": "application/json" },
      });

      if (refreshTokenRequest.status === 200) {
        return refreshTokenRequest.json();
      }
      throw new Error("Unauthorized");
    },
  });

export default useMeQuery;
