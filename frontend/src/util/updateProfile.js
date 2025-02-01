/**
 * Updates the user's profile with the provided first and last name.
 * Validates the input before sending a PATCH request to the server.
 * Displays toast notifications based on success or failure.
 *
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @returns {Promise<Object|null>} The updated user data if the update is successful, or null if the update fails.
 * @throws {Error} Throws an error if the request fails.
 */
const updateProfile = async (firstName, lastName) => {
    if (!firstName.length || !lastName.length) {
        toast.error("First name and last name cannot be empty.");
    } else if (!profileNameValidator(firstName) || !profileNameValidator(lastName)) {
        toast.error("Special characters are not allowed.");
    } else {
        try {
            console.log(firstName, lastName);
            const response = await apiClient.patch(USER_ROUTE, { firstName, lastName }, { withCredentials: true });

            if (response.status === 202) {
                toast.success("Saved successfully.");
                console.log(response.data);
                return response.data;
            } else {
                toast.error("Unable to save changes.");
                return null;
            }

        } catch (e) {
            toast.error("Unable to save changes. Try again.");
            return null;
        }
    }
    return null;
}

export default updateProfile;
