import { useQueryClient } from "@tanstack/react-query";
import { useGetMe, getGetMeQueryKey, useLogout } from "@workspace/api-client-react";
import { useLocation } from "wouter";

export function useAuth() {
  const { data, isLoading } = useGetMe({
    query: {
      queryKey: getGetMeQueryKey(),
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  });

  return {
    user: data?.user ?? null,
    isLoading,
    isAuthenticated: !!data?.user,
  };
}

export function useLogoutAction() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const mutation = useLogout({
    mutation: {
      onSuccess: () => {
        queryClient.clear();
        navigate("/login");
      },
    },
  });

  return () => mutation.mutate();
}
