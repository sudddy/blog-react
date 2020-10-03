import axios from "axios";
var instance = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL:
  //   "http://schooladministrationbackend-env.eba-pcfvpahb.ap-southeast-2.elasticbeanstalk.com",
  timeout: 30000
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.get["Content-Type"] =
  "application/json;charset=UTF-8";

instance.interceptors.request.use(config => {
  const token = "";
  if (token && token !== "undefined") {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

instance.interceptors.response.use(response => {
  const res = response.data;
  if (response.status !== 200 && response.status !== 201) {
    console.log("Error =", res);
  } else {
    return res;
  }
});

export default instance;
