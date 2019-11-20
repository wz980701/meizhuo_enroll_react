import * as user from './action-type'

let defaultState = {
    user_list: [],
    sum: 0
}

export const userData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case user.SAVEUSERLIST:
            return {...state, ...action.value}
        default: 
            return state
    }
}

