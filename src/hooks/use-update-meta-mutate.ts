import { UseMutationOptions } from "@tanstack/react-query";
import {
  ExtractFetchParams,
  ExtractResponse,
  useMutationRequest,
} from "@/lib/openapi/hooks";

export type UpdateMetaResponse = ExtractResponse<
  "telegramAuthorization",
  "/update-meta",
  "put"
>;

export type UpdateMetaFetchParams = ExtractFetchParams<
  "telegramAuthorization",
  "/update-meta",
  "put"
>;

export const useUpdateMetaMutate = ({
  queryOptions,
}: {
  queryOptions?: Omit<
    UseMutationOptions<
      UpdateMetaResponse,
      unknown,
      UpdateMetaFetchParams,
      unknown
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) =>
  useMutationRequest("telegramAuthorization", "/update-meta", {
    method: "put",
    queryOptions,
  });

export default useUpdateMetaMutate;
