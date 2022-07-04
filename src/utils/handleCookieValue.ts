export const saveValuesToCookie = (values: object) => {
  for (const [index, [key, value]] of Object.entries(Object.entries(values))) {
    document.cookie = `${key}=${value};`;
  }
};
export const getCookieValue = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteAuthToken(name: string, value: string) {
  document.cookie = `${name}=${value}; max-age=-1;`;
}

interface DeleteCookieValueParams {
  deleteCookieKeys: string[];
}
export const deleteCookieValues = ({
  deleteCookieKeys,
}: DeleteCookieValueParams) => {
  deleteCookieKeys.map((targetCookieKey) => {
    try {
      document.cookie = `${targetCookieKey}=${getCookieValue(
        targetCookieKey
      )}; max-age=-1`;
    } catch (error) {
      console.log(`쿠키값 삭제실패: ${error}`);
    }
  });
};
