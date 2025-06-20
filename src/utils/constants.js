export const photoURL =
  "https://i.pinimg.com/1200x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_API,
  },
};


