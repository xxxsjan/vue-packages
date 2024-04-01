export function createObjectURL(data, type = "application/octet-stream") {
  const blob = new Blob([data], {
    type,
  });
  return window.URL.createObjectURL(blob);
}

export function revokeObjectURL(blobURL) {
  window.URL.revokeObjectURL(blobURL);
}

export default function linkDownLoad(data, filename = "文件下载") {
  if ("msSaveOrOpenBlob" in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const blobURL = createObjectURL(data);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = filename;
    link.click();
    revokeObjectURL(blobURL);
  }
}
