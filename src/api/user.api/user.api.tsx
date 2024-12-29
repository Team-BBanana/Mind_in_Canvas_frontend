import { CanvasClient } from ".."

// 타입 정의
interface UserData {
    name: string;
    email: string;
    password: string;
    role: string;
    socialProvider: string;
    phoneNumber: string;
}

export async function getUserInfo(): Promise<any> {
    const url = `/user/auth/`;
    return await CanvasClient.get(url);
}

// 로그인
export async function loginUser(data: UserData): Promise<any> {
    const url = `/user/auth/`;
    return await CanvasClient.post(url, data);
}

// 로그아웃
export async function logoutUser(data: UserData): Promise<any> {
    const url = `/user/auth/`;
    return await CanvasClient.delete(url, { data });
}

// 토큰 갱신
export async function refreshToken(data: UserData): Promise<any> {
    const url = `/user/auth/refresh/`;
    return await CanvasClient.post(url, data);
}

// 비밀번호 변경
export async function changePassword(data: UserData): Promise<any> {
    const url = `/user/changePassword/`;
    return await CanvasClient.post(url, data);
}

// 계정 복구
export async function restoreAccount(data: UserData): Promise<any> {
    const url = `/user/restore-account/`;
    return await CanvasClient.post(url, data);
}

// 회원 가입
export async function signupUser(data: UserData): Promise<any> {
    const url = `/users/register`;

    const requestData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role:  data.role,
        socialProvider: data.socialProvider,
        phoneNumber: data.phoneNumber,
    };

    return await CanvasClient.post(url, JSON.stringify(requestData), {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 요청임을 명시
        },
        withCredentials: true,
    });
}

// 회원 정보 변경
export async function updateUser(data: UserData): Promise<any> {
    const url = `/user/updateUser/`;
    return await CanvasClient.patch(url, data);
}

// 회원 탈퇴
export async function withdrawUser(data: UserData): Promise<any> {
    const url = `/user/withdrawal/`;
    return await CanvasClient.delete(url, { data });
}

const userAPI = {
    getUserInfo,
    loginUser,
    logoutUser,
    refreshToken,
    changePassword,
    restoreAccount,
    signupUser,
    updateUser,
    withdrawUser,
};

export default userAPI;