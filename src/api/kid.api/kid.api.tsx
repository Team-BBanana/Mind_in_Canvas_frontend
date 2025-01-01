import { CanvasClient } from '..';


const findmykidall = async() => {
    const url = `/kids/mykids`;
    return await CanvasClient.get(url);
}

const tokenGenerate = async(data : {kidId: string}) => {
    const url = `/kids/generateKidToken`;
    return await CanvasClient.post(url,JSON.stringify(data),{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 요청임을 명시
        },
        withCredentials: true,
    });
}

const signupKids = async (data: { name: string; age: number }) => {
    return await CanvasClient.post('/kids/signup', JSON.stringify(data),{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 요청임을 명시
        },
        withCredentials: true,
    });
};

const kidApi = {
    signupKids,
    findmykidall,
    tokenGenerate,
};

export default kidApi; 