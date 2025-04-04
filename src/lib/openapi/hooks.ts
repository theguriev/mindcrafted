import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { api } from "./api-client";
import {
  ExtractResponses,
  ExtractSchema,
  ExtractSuccessfulHTTPResponse,
  Parameters,
  Paths,
} from "./types";

export type ExtractResponse<
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path]
> = ExtractSchema<
  ExtractSuccessfulHTTPResponse<ExtractResponses<Paths[Key][Path][Method]>>
>;

export type ExtractQueryOptions<Response, Transformed = Response> = Omit<
  UseQueryOptions<Response, Error, Transformed>,
  "queryKey" | "queryFn"
>;

export type ExtractFetchParams<
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path]
> = Parameters<Paths[Key][Path][Method]>;

export const useRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>,
  Transformed = Response
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    fetchParams?: FetchParams;
    queryOptions?: ExtractQueryOptions<Response, Transformed>;
  },
  hashFn: (props: {
    path: Path;
    fetchParams?: FetchParams;
    method: Method;
  }) => QueryKey = ({ method, path, fetchParams }) => [
    path,
    method,
    fetchParams,
  ]
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  return useQuery({
    queryKey: hashFn({
      path,
      fetchParams: props.fetchParams,
      method: props.method,
    }),
    queryFn: () => fetchFn(path, props.method, props.fetchParams),
    ...props.queryOptions,
  });
};

export const useSuspenseRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>,
  Transformed = Response
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    fetchParams?: FetchParams;
    queryOptions?: ExtractQueryOptions<Response, Transformed>;
  },
  hashFn: (props: {
    path: Path;
    fetchParams?: FetchParams;
    method: Method;
  }) => QueryKey = ({ method, path, fetchParams }) => [
    path,
    method,
    fetchParams,
  ]
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  return useSuspenseQuery({
    queryKey: hashFn({
      path,
      fetchParams: props.fetchParams,
      method: props.method,
    }),
    queryFn: () => fetchFn(path, props.method, props.fetchParams),
    ...props.queryOptions,
  });
};

export const useMutationRequest = <
  Key extends keyof typeof api,
  Path extends keyof Paths[Key],
  Method extends keyof Paths[Key][Path],
  FetchParams extends ExtractFetchParams<Key, Path, Method>,
  Response extends ExtractResponse<Key, Path, Method>
>(
  paths: Key,
  path: Path,
  props: {
    method: Method;
    queryOptions?: Omit<
      UseMutationOptions<Response, unknown, FetchParams, unknown>,
      "mutationKey" | "mutationFn"
    >;
  }
) => {
  const fetchFn = api[paths] as unknown as (
    path: Path,
    method: Method,
    parameters?: FetchParams
  ) => Promise<Response>;
  return useMutation({
    mutationFn: (params: FetchParams) => fetchFn(path, props.method, params),
    ...props.queryOptions,
  });
};
