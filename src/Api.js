import axios from "axios";

const api = axios.create({
  headers: {
    "Client-ID": "k8bnwy2tpsgi3gtv9qj0fklcoduveu",
    Authorization: "Bearer 2i1d51t4xtbiwpmlcwde8vt8s5yguo",
  },
});

/*
CLIENT_ID = 'k8bnwy2tpsgi3gtv9qj0fklcoduveu';
REDIRECT = 'http://127.0.0.1/';
LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=k8bnwy2tpsgi3gtv9qj0fklcoduveu&redirect_uri=http://127.0.0.1/&response_type=token
*/

export default api;
