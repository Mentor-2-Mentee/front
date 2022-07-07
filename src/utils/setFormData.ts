// interface SetFormDataParams<T> {
//     params :
// }

export const setFormData = (params: object): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(params)) {
    formData.append(key, value);
  }

  return formData;
};
