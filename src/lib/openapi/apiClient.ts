import { defu } from "defu";

import replacePathParameters from "./replacePathParameters";
import { telegramAuthorization } from "./schemas/";
import type {
  Parameters as EndpointParameters,
  ExtractContentJson,
  ExtractResponses,
} from "./types";
import omit from "../omit";
import stringifyOrUndefinedBody from "./stringifyOrUndefinedBody";
import objectifyOrUndefinedCookie from "./objectifyOrUndefinedCookie";
import getAccessToken from "./getAccessToken";

const createRequest = <Paths>({ getBaseUrl }: { getBaseUrl: () => string }) => {
  return async <
    Path extends keyof Paths,
    Method extends keyof Paths[Path],
    Responses extends ExtractResponses<Paths[Path][Method]>,
    FancyResponse = Omit<Response, "json" | "status"> &
      {
        [K in keyof Responses]: {
          status: K;
          json: () => Promise<ExtractContentJson<Responses[K]>>;
        };
      }[keyof Responses]
  >(
    path: Path,
    method: Method = "get" as Method,
    parameters: EndpointParameters<Paths[Path][Method]> &
      Omit<RequestInit, "body"> & {
        authorization?: boolean;
      } = {} as EndpointParameters<Paths[Path][Method]> &
      Omit<RequestInit, "body"> & {
        authorization?: boolean;
      }
  ): Promise<FancyResponse> => {
    const body = "body" in parameters ? parameters.body : undefined;
    const cookie = "cookie" in parameters ? parameters.cookie : undefined;
    const query =
      "query" in parameters
        ? (parameters.query as Record<string, string>)
        : undefined;
    const cookieWithAuthorization = parameters.authorization
      ? { accessToken: getAccessToken(), ...(cookie as Record<string, string>) }
      : cookie;
    const pathParams =
      "path" in parameters ? (parameters.path as Record<string, string>) : {};

    const fetchParameters = defu(
      {
        method,
        body: stringifyOrUndefinedBody(body as BodyInit),
        headers: {
          ...objectifyOrUndefinedCookie(
            cookieWithAuthorization as Record<string, string>
          ),
        },
      },
      omit(parameters as Record<string, string>, [
        "body",
        "cookie",
        "authorization",
        "path",
      ])
    ) as unknown as RequestInit;

    return (await fetch(
      `${getBaseUrl()}${replacePathParameters(
        path.toString(),
        pathParams
      )}?${new URLSearchParams(query)}`,
      fetchParameters
    )) as unknown as Promise<FancyResponse>;
  };
};

export const api = {
  authorization: createRequest<telegramAuthorization.paths>({
    getBaseUrl: () => `${import.meta.env.VITE_API_URL}`,
  }),
};
