import {
  ExtractResponse,
  ExtractFetchParams,
  useSuspenseRequest,
} from "@/lib/openapi/hooks";
import { UseQueryOptions } from "@tanstack/react-query";

export type UseMeasurementResponse = ExtractResponse<
  "serviceMeasurements",
  "/measurement",
  "get"
>;

export const useMeasurementQuery = <
  Response extends UseMeasurementResponse,
  Transformed = Response
>({
  queryOptions,
  fetchParams,
}: {
  queryOptions?: Omit<
    UseQueryOptions<Response, Error, Transformed>,
    "queryKey" | "queryFn"
  >;
  fetchParams?: ExtractFetchParams<
    "serviceMeasurements",
    "/measurement",
    "get"
  >;
}) =>
  useSuspenseRequest("serviceMeasurements", "/measurement", {
    method: "get",
    queryOptions,
    fetchParams,
  });
