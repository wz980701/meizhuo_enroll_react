import * as user from './action-type'

export const saveUserList = (value) => {
    return {
        type: user.SAVEUSERLIST,
        value
    }
}
