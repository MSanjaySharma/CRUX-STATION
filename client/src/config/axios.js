import Axios from "axios";
import { API } from "../../config";

const axios = Axios.create({
  baseURL: API,
});

export default axios;
