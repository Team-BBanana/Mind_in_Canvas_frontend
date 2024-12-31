import axios from 'axios';

const signupUser = async (data: { name: string; email: string; password: string; role: string; socialProvider: string; phoneNumber: string; pin: string; }) => {
    return await axios.post('/api/user/signup', data);
};

const userApi = {
    signupUser,
    // 다른 API 메서드들...
};

export default userApi; 