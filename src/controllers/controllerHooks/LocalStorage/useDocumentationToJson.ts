function base64ToFile(base64: string, filename: string, type: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || type;
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);

  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

export default function convertBase64FieldsToFile(
  obj: any,
  prefix = "file",
  filetypeFallback = "application/octet-stream"
): any {
  let fileCounter = 0;

  function traverseAndConvert(current: any): any {
    if (Array.isArray(current)) {
      return current.map(traverseAndConvert);
    }

    if (typeof current === "object" && current !== null) {
      const newObj: any = {};
      for (const key in current) {
        const value = current[key];

        // Detecta si es base64 válido de imagen/documento
        if (
          typeof value === "string" &&
          value.startsWith("data:") &&
          value.includes("base64")
        ) {
          const extension = value.substring(
            value.indexOf("/") + 1,
            value.indexOf(";")
          );
          const filename = `${prefix}_${fileCounter++}.${extension}`;
          newObj[key] = base64ToFile(value, filename, filetypeFallback);
        } else {
          newObj[key] = traverseAndConvert(value);
        }
      }
      return newObj;
    }

    return current;
  }

  return traverseAndConvert(obj);
}
