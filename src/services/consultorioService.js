import axios from "axios";

const API_URL = "http://localhost:3000/api/consultorios";

export const getConsultorios = () => axios.get(API_URL);
export const createConsultorio = (data) => axios.post(API_URL, data);