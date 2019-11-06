import Server from './server'

class API extends Server {
    async getGradeList (params = {}) { // 获取年级列表
        return this.get('/user/gradeList', params, '获取年级列表失败')
    }
    async getDepartmentList (params = {}) { // 获取组别列表
        return this.get('/user/departmentList', params, '获取组别列表失败')
    }
    async getGroupList (params = {}) { // 获取组数列表
        return this.get('/user/groupList', params, '获取组别列表失败')
    }
    async applySubmit (params = {}) { // 招新报名提交表单
        return this.post('/user/apply', params, '招新报名失败')
    }
    async interviewLogin (params = {}) { // 面试官登录
        return this.post('/interview/login', params, '面试官登录失败')
    }
}

export default new API()
