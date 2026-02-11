import axios from "axios";

const baseUrl = import.meta.env.VITE_COUNTRY_BASE_URL;

const getAll = () => axios.get(`${baseUrl}/api/all`).then(res => res.data);

export default { getAll }