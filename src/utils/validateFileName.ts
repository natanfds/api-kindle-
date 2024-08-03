export const validateFileName = (fileName: string): boolean => {
  const VALID_EXTENSIONS = [
    'doc',
    'docx',
    'html',
    'htm',
    'rtf',
    'txt',
    'jpeg',
    'jpg',
    'gif',
    'png',
    'bmp',
    'pdf',
    'epub',
  ];
  const invalidCharsRegex = /^[^<>:;,?"*|/]+$/;
  if (!invalidCharsRegex.test(fileName)) return false;

  const extension = fileName.split('.').pop();
  return VALID_EXTENSIONS.includes(extension);
};
