import axios from 'axios';
import { CanvasClient } from '..';


const findmykidall = async() => {
    const url = `/kid/mykid/all`;
    return await CanvasClient.get(url);
}

const signupKids = async (data: { name: string; age: number }) => {
    return await axios.post('/api/kids/signup', data);
};

const kidApi = {
    signupKids,
    findmykidall,
};

export default kidApi; 