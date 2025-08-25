export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value instanceof File ? value : JSON.stringify(value));
  });
  return formData;
};
