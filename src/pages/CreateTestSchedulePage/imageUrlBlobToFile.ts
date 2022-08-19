import axiosInstance from "../../api/axiosInstance";

export const imageUrlBlobToFile = async (blobUrl: string) => {
  const response = await axiosInstance({
    responseType: "blob",
  }).get<Blob>(blobUrl);

  const file = new File([response.data], `${blobUrl}`);
  return file;
};
