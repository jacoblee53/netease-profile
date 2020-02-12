import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true
});

export const logout = () => {
  instance.get('/logout');
};

export const login = ({ phone, password }) => {
  instance.get(`/login/cellphone?phone=${phone}&password=${password}`)
    .then(res => {
      console.log(res);
    })
};
