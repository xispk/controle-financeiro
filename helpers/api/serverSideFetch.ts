import axios from 'axios';

export const serverSideFetch = async (url: string, headers = {}) => {
  let data,
    error = null;

  try {
    const res = await axios.get(url, { withCredentials: true, headers });

    data = res.data;
  } catch (error: any) {
    error = error.response.data;
  }

  return { data, error };
};
