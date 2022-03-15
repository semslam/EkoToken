import Axios from "axios";
export const sdk = Axios.create({
    baseURL: process.env.FELA_ENDPOINT,
    headers: {
        Authorization: "Bearer " + process.env.FELA_TOKEN
    }
});