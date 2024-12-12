import Axios from "axios";

const baseUrl = "https://otakudesu.cloud/";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.3";

const MoeFecher = Axios.create({
  baseURL: baseUrl,
  headers: {
    "User-Agent": userAgent,
  },
});

export default MoeFecher;