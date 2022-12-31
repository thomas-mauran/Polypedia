import axios from "axios";

const urlBase = process.env.VUE_APP_API_URL;

export async function fetchAll(type) {
  const url = `${urlBase}/${type}/`;
  try {
    let res = await axios({
      url: url,
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
      method: "GET",
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchAttributes(category) {
  const url = `${urlBase}/${category}/attributes`;
  try {
    let res = await axios({
      url: url,
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
      method: "GET",
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchOne(type, id) {
  const url = `${urlBase}/${type}/${id}`;
  try {
    let res = await axios({
      url: url,
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
      method: "GET",
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}



