/**
 * Validates an email address using Zod's email schema.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} `true` if the email is valid, `false` otherwise.
 */
export const emailValidator = (email) => {
    const emailSchema = z.string().email();
    const { success } = emailSchema.safeParse(email);

    return success;
};

/**
 * Validates a password using a regex pattern for standard password strength.
 * 
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The confirmation password (not used in validation here).
 * @returns {boolean} `true` if the password is valid, `false` otherwise.
 */
export const passwordValidator = (password, confirmPassword) => {
    const passwordValidation = new RegExp(  // regex for standard password
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );

    const passwordSchema = z.string().regex(passwordValidation);
    const { success } = passwordSchema.safeParse(password);

    return success;
};

/**
 * Checks if the password and confirmation password match.
 * 
 * @param {string} password - The password to check.
 * @param {string} confirmPassword - The password to compare against.
 * @returns {boolean} `true` if the passwords match, `false` otherwise.
 */
export const confirmPasswordChecker = (password, confirmPassword) => {
    return password === confirmPassword;
};

/**
 * Validates a profile name to only allow alphabetic characters.
 * 
 * @param {string} input - The input string to validate.
 * @returns {boolean} `true` if the input contains only alphabetic characters, `false` otherwise.
 */
export const profileNameValidator = (input) => {
    const letterOnlySchema = z.string().regex(/^[a-zA-Z]+$/);
    const { success } = letterOnlySchema.safeParse(input);

    return success;
};
