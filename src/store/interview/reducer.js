import * as interview from './action-type'

let defaultState = {
    department: '',
    group: ''
}

export const interviewData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case interview.SAVEINTERVIEWER:
            return {...state, ...action.value}
        default: 
            return state
    }
}
