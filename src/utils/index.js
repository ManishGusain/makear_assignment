export const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result.split(','));
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};