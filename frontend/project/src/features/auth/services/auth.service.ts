import { apiClient } from "../../../shared/lib/apiClient";
import type { AuthDataType, UserDataType } from "../../../shared/types/DataType";
import type { AuthInputType } from "../types/AuthType";

const authService = {

    login: async(loginData: AuthInputType) => {

        return apiClient.post<UserDataType>("/users/api/login", loginData);
        
    },

    authCheck: async() => {

        const res = apiClient.get<AuthDataType>("/users/api/authCheck");
        return res
    },

    logout: async() => {
        return apiClient.post<AuthDataType>("/users/api/logout", {});
    }

};

export default authService;