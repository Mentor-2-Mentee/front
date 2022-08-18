export const urlChecker = (url: string): boolean => {
  const urlChecker =
    /(http[s]?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}/;
  const isUrl = Boolean(urlChecker.exec(url));
  return isUrl;
};
