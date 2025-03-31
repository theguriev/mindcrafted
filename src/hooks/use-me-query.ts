import { api } from "@/lib/openapi/apiClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export type UseMeQueryData = ReturnType<typeof useMeQuery>["data"];

const useMeQuery = () =>
  useSuspenseQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const request = await api.telegramAuthorization("/", "get", {
        headers: { "Content-type": "application/json" },
        raw: true,
      });

      if (request.status === 200) {
        return request.json();
      }
      const refreshTokenRequest = await api.telegramAuthorization(
        "/refresh",
        "get",
        {
          headers: { "Content-type": "application/json" },
        }
      );

      if (refreshTokenRequest.status === 200) {
        return refreshTokenRequest.json();
      }
      throw new Error("Unauthorized");
    },
  });

export default useMeQuery;
