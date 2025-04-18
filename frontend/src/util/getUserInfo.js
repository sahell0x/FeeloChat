import apiClient from "@/lib/api-client";
import { USER_ROUTE } from "@/util/constants";

const getUserInfo = async () => {
  try {
    const response = await apiClient.get(USER_ROUTE, { withCredentials: true });
    if (response.status === 200) return response.data;
    return null;
  } catch (e) {
    throw new Error();
  }
};

export default getUserInfo;
