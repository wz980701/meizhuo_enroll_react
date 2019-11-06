import * as interview from './action-type'

export const saveInterviewer = (value) => {
    return {
        type: interview.SAVEINTERVIEWER,
        value
    }
}

