/**
 * Fetches user information from the server using the provided API client.
 * Sends a GET request to the user route with credentials.
 *
 * @returns {Promise<Object|null>} The user data if the request is successful, or null if the request fails.
 * @throws {Error} Throws an error if the request fails.
 */
const getUserInfo = async () => {
    console.log("request is going out");

    try {
        console.log(USER_ROUTE);

        const response = await apiClient.get(USER_ROUTE, { withCredentials: true });
        if (response.status === 200) return response.data;
        return null;

    } catch (e) {
        throw new Error();
    }
}

export default getUserInfo;
