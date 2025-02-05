import { api } from "@/lib/openapi/apiClient";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const queryKey = ["me"];
const queryFn = async () => {
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
  return undefined;
};

const useMeQuery = () => useQuery({ queryKey, queryFn });
export const useMeSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      if (!response) {
        throw new Error("Unauthorized");
      }
      return response;
    },
  });

export default useMeQuery;
