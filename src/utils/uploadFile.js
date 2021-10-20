const handleUploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("sheetName", "sales");
};
