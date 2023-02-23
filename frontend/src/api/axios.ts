import axios from 'axios';

export function setupAxios() {
  const cancels = new Map();

  const token = new URLSearchParams(window.location.search).get('token');

  axios.interceptors.request.use(
    req => {
      const { url, method } = req;

      if (!req.baseURL) {
        req.baseURL = process.env.REACT_APP_API_URL;
      }

      req.params.token = token;

      if (token) {
        req.headers.Authorization = token;
      }

      if (method?.toLowerCase() === 'get') {
        const currentCancel = cancels.get(`${method}:${url}`);

        if (currentCancel) {
          currentCancel();
        }

        req.cancelToken = new axios.CancelToken(cancel => {
          cancels.set(`${method}:${url}`, cancel);
        });
      }

      return req;
    },
    err => Promise.reject(err),
  );

  axios.interceptors.response.use(
    response => {
      const { url, method } = response.config;
      if (method?.toLowerCase() === 'get') {
        cancels.delete(`${method}:${url}`);
      }
      return response;
    },
    error => {
      if (error.response?.config) {
        const { url, method } = error.response.config;
        if (method.toLowerCase() === 'get') {
          cancels.delete(`${method}:${url}`);
        }
      }

      return Promise.reject(error);
    },
  );
}
