import axios from "axios";

export function createCommons(newCommons){
    return axios.post('/api/commons/new',newCommons);
}