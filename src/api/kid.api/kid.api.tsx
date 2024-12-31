import axios from 'axios';

const signupKids = async (data: { name: string; age: number }) => {
    return await axios.post('/api/kids/signup', data);
};

const kidApi = {
    signupKids,
};

export default kidApi; 