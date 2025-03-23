import { UseMutationOptions } from "@tanstack/react-query";
import {
  ExtractFetchParams,
  ExtractResponse,
  useMutationRequest,
} from "@/lib/openapi/hooks";

export type PostMeasurementResponse = ExtractResponse<
  "serviceMeasurements",
  "/measurement",
  "post"
>;

export type PostMeasurementFetchParams = ExtractFetchParams<
  "serviceMeasurements",
  "/measurement",
  "post"
>;

export const usePostMeasurementMutate = ({
  queryOptions,
}: {
  queryOptions?: Omit<
    UseMutationOptions<
      PostMeasurementResponse,
      unknown,
      PostMeasurementFetchParams,
      unknown
    >,
    "mutationKey" | "mutationFn"
  >;
} = {}) =>
  useMutationRequest("serviceMeasurements", "/measurement", {
    method: "post",
    queryOptions,
  });

export default usePostMeasurementMutate;
