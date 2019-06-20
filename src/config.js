const API_URL = process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL;

export default API_URL