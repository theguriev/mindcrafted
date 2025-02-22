import { UseMutationOptions } from "@tanstack/react-query";
import {
  ExtractFetchParams,
  ExtractResponse,
  useMutationRequest,
} from "@/lib/openapi/hooks";

export type LogoutResponse = ExtractResponse<
  "telegramAuthorization",
  "/logout",
  "get"
>;

export type LogoutFetchParams = ExtractFetchParams<
  "telegramAuthorization",
  "/logout",
  "get"
>;

export const useLogoutMutate = ({
  queryOptions,
}: {
  queryOptions?: Omit<
    UseMutationOptions<LogoutResponse, unknown, LogoutFetchParams, unknown>,
    "mutationKey" | "mutationFn"
  >;
} = {}) =>
  useMutationRequest("telegramAuthorization", "/logout", {
    method: "get",
    queryOptions,
  });

export default useLogoutMutate;
