export type Params = Record<string, any>;
export type URL = string;

export type APIResponseData = {
  data: object;
};

export type APIResponseError = {
  status: number;
  message: string;
};

export type APIResponse = {
  data: APIResponseData | null;
  errors: APIResponseError[] | null;
};

export type ContributionInput = {
  title: string;
  description?: string;
  category?: string;
  dateOfEngagement: string;
  external?: object;
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

const error = async (response: Response) => {
  return {
    data: null,
    errors: [
      {
        status: response.status,
        message: await response.text(),
      },
    ],
  };
};

const data = async (response: Response) => {
  return {
    data: await response.json(),
    errors: null,
  };
};

export const get = async (url: URL, params?: Params) => {
  const urlWithParams = params ? `${url}?${new URLSearchParams(params)}` : url;

  const response = await fetch(urlWithParams, { headers: defaultHeaders });

  return response.ok ? data(response) : error(response);
};

export const post = async (url: URL, params?: Params) => {
  const response = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(params),
  });

  return response.ok ? data(response) : error(response);
};

export const put = async (url: URL, params?: Params) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(params),
  });

  return response.ok ? data(response) : error(response);
};
