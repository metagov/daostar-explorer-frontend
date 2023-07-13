const { API_BASE_URL = "http://localhost:4000" } = process.env;

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

export const getContributions = async (ethAddress: string) => {
  const res = await fetch(`${API_BASE_URL}/${ethAddress}`);

  return res.ok ? data(res) : error(res);
};
