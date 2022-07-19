import { QueryCache, QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000,
      retry: 1,
      retryDelay: 500,
    },
  },
});

export const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
    return error;
  },
  onSuccess: (data) => {
    console.log(data);
    return data;
  },
});

export default queryClient;
