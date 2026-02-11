import axios from "axios";

const token = import.meta.env.VITE_WEATHER_TOKEN
const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL

const getByCapital = (name) =>
    axios
        .get(baseUrl, {
            params: { q: name, units: 'metric', appid: token }
        })
        .then(res => res.data);

export default {getByCapital}