export const saveValuesToCookie = (values: object) => {
  for (const [_, [key, value]] of Object.entries(Object.entries(values))) {
    document.cookie = `${key}=${value};`;
  }
};

type CookieKey = "accessToken" | "refreshToken";

export const getCookieValue = (key: CookieKey) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + key.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteAuthToken(key: string, value: string) {
  document.cookie = `${key}=${value}; max-age=-1;`;
}

interface DeleteCookieValueParams {
  deleteCookieKeys: CookieKey[];
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
