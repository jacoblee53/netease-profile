import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true
});

export const uid = window.localStorage.getItem("netease_uid");

export const logout = () => {
  instance.get("/logout");
  window.localStorage.removeItem("netease_uid");
};

export const login = ({ phone, password }) => {
  instance
    .get(`/login/cellphone?phone=${phone}&password=${password}`)
    .then(res => {
      const { code } = res.data;
      if (code === 200) {
        const uid = res.data.account.id;
        window.localStorage.setItem("netease_uid", uid);
        window.location.reload();
      } else {
        throw new Error("");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const getPlaylists = () => {
  if (uid) {
    return instance
      .get(`/user/playlist?uid=${uid}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          return res.data.playlist;
        } else {
          throw new Error("");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
