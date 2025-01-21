import Http from "../services/Http";

function handleCallSelectApi(path) {
  Http.get(path)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default handleCallSelectApi;
