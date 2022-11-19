const { REACT_APP_BACKEND_HOST, REACT_APP_BACKEND_PORT } = process.env;

const BASE_URL = `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`;

export default {
  login: `${BASE_URL}/login`,
  signin: `${BASE_URL}/signin`,
};
