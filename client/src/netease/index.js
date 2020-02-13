import axios from "axios";
import { isEmail } from "../utils";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3001/"
      : "https://netease-profile-api.herokuapp.com/",
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
  let pathBefore = isEmail(phone) ? "/login?email" : "/login/cellphone?phone";
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
          console.log(res.data.playlist);
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

export const getRecentlyPlayed = type => {
  if (uid) {
    return instance
      .get(`/user/record?uid=${uid}&type=${type}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data);
          return type === 1 ? res.data.weekData : res.data.allData;
        } else {
          throw new Error("");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getLikeArtists = () => {
  if (uid) {
    return instance
      .get("/artist/sublist?limit=100")
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
};

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
};

export const getPlaylist = playlistId => {
  if (uid) {
    return instance
      .get(`/playlist/detail?id=${playlistId}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data.playlist);
          return res.data.playlist;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getTracks = async playlistId => {
  const playlist = await getPlaylist(playlistId);
  const tracks = playlist && playlist.tracks ? playlist.tracks : [];
  return tracks;
};

export const getRecommendationsForPlaylist = playlistId => {
  if (uid) {
    return instance
      .get(`/related/playlist?id=${playlistId}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          const { playlists } = res.data;
          console.log(playlists);
          return Promise.all(playlists.map(i => getTracks(i.id))).then(
            values => {
              if (values) {
                return [].concat(...values);
              } else {
                throw new Error("");
              }
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getTrackInfo = trackId => {
  if (uid) {
    return instance
      .get(`/song/detail?ids=${trackId}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          console.log(res.data.songs);
          return res.data.songs;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const getComments = trackId => {
  if (uid) {
    return instance
      .get(`/comment/music?id=${trackId}`)
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          const { hotComments, comments } = res.data;
          console.log([...hotComments, ...comments]);
          return [...hotComments, ...comments];
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
