// utils/convertImageToBase64.ts

export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to convert image to Base64"));
      };
      
      reader.readAsDataURL(file);
    });
  };