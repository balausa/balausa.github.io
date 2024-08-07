import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api';

export const getUsers = async (page: number = 1, results: number = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/?page=${page}&results=${results}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (uuid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/?uuid=${uuid}`);
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
