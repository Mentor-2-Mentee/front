import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosInstance";

const getServerHealth = async () => {
  const { data } = await axiosInstance().get("/health");
  return data;
};

export const useGetServerHealth = () => useQuery(["health"], getServerHealth);
