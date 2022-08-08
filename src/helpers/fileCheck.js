const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export const fileCheck = (target) => {
    if (target.files === 0) return [];

    const files = [];

    for (const file of target.files) {
        const fileExtension = getFileExtension(file.name);

        if (fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'png' || fileExtension == 'JPG') {
            files.push(file);
        }
    }

    if (files.length === 0) return [];

    return files;
}