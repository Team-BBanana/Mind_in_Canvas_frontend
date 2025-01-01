import { CanvasClient } from "..";

interface KidsData {
    name: string;
    age: number;
}

export async function signupKids(data: KidsData) {
    const url = `/kids/signup`;

    const requestData = {
        name: data.name,
        age: data.age,
    };

    return await CanvasClient.post(url, JSON.stringify(requestData), {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 요청임을 명시
        },
        withCredentials: true,
    });
};

const kidApi = {
    signupKids,
};

export default kidApi; 