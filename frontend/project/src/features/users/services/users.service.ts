import type { NewUserType } from "../types/UserType";
import { apiClient } from "../../../shared/lib/apiClient";
import type { UserDataType } from "../../../shared/types/DataType";

export const usersService = {

    register: async(newUser: NewUserType) => {

        return apiClient.post<UserDataType>("/users/api/register", newUser);

    }

}