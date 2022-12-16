import axios from "axios";


const urlBase = process.env.VUE_APP_API_URL

export async function fetchAll(type) {

  const url = `${urlBase}/${type}/`;
  try {
    let res = await axios({
      url: url,
      method: "GET",
    });

    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    console.log(error)
    return []
  }
}