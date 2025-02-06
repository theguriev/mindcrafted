import { api } from "@/lib/openapi/apiClient";
import { useMutation } from "@tanstack/react-query";
import { Parameters as EndpointParameters } from "@/lib/openapi/types";
import { telegramAuthorization } from "@/lib/openapi/schemas";

const useUpdateMetaMutate = () =>
  useMutation({
    mutationFn: async (
      body: EndpointParameters<
        telegramAuthorization.paths["/update-meta"]["put"]
      >["body"]
    ) =>
      api.authorization("/update-meta", "put", {
        headers: { "Content-type": "application/json" },
        body,
      }),
  });

export default useUpdateMetaMutate;
