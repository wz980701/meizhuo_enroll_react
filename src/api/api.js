import Server from './server'

class API extends Server {
    async getGradeList (params = {}) { // 获取年级列表
        try {
            let result = await this.axios('get', '/user/gradeList')
            if (result && (result.data instanceof Object) && result.code === 1) {
                return result.data
            } 
            let err = {
                tip: '获取年级列表失败',
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
    async getDepartmentList (params = {}) { // 获取组别列表
        try {
            let result = await this.axios('get', '/user/departmentList')
            if (result && (result.data instanceof Object) && result.code === 1) {
                return result.data
            } 
            let err = {
                tip: '获取组别列表失败',
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
    async getGroupList (params = {}) { // 获取组数列表
        try {
            let result = await this.axios('get', '/user/groupList')
            if (result && (result.data instanceof Object) && result.code === 1) {
                return result.data
            } 
            let err = {
                tip: '获取组别列表失败',
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
    async applySubmit (params = {}) { // 招新报名提交表单
        try {
            let result = await this.axios('post', '/user/apply', params)
            if (result && result.code === 1) {
                return result
            }
            let err = {
                tip: '招新报名失败',
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
}

export default new API()
