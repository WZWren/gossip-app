// local type for the translated JSON object for user.
// this file will NOT contain the password data in the object.

type User = {
    user_id:        number;
    user_name:      string;
}

export const empty_user: User = {
    user_id: 0,
    user_name: "",
}

// since we supply a null, we need a way to validate the null.
export function is_empty_user(user: User): boolean {
    return (user == empty_user);
}

export default User;