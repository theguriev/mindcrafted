import Cookies from "js-cookie";

const getAccessToken = () => Cookies.get("accessToken");

export default getAccessToken;
