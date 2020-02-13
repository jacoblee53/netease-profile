import axios from "axios";
import { isEmail } from "../utils"

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true
});

axios.defaults.withCredentials = true;

export const uid = window.localStorage.getItem("netease_uid");

export const logout = () => {
  instance.get("/logout");
  window.localStorage.removeItem("netease_uid");
  window.location.reload();
};

export const login = ({ phone, password }) => {
  let pathBefore = isEmail(phone) ? '/login?email' : '/login/cellphone?phone';
  instance
    .get(`${pathBefore}=${phone}&password=${password}`)
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

export const getRecentlyPlayed = (type) => {
  if (uid) {
    return instance
      .get(`/user/record?uid=${uid}&type=${type}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data);
          return type === 1 ? res.data.weekData :  res.data.allData;
        } else {
          throw new Error("");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getLikeArtists = () => {
  if (uid) {
    return instance
      .get('/artist/sublist?limit=100')
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data);
          return res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getUserInfo = () => {
  if (uid) {
    return instance
      .get(`/user/detail?uid=${uid}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data);
          return res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const getPlaylist = () => {

}

