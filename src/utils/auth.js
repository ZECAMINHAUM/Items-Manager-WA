export const isAuth =  () => localStorage.getItem('Token') !== null;
export const getToken = () => localStorage.getItem('Token');
export const setToken = token => localStorage.setItem('Token', token);
export const deleteToken = () => localStorage.removeItem('Token');
