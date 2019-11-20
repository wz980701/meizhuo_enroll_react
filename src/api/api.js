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
    async interviewLogout (params = {}) { // 面试官登出
        return this.get('/interview/logout', params, '面试官登出失败')
    }
    async getNextUser (params = {}) { // 获取下一个面试者
        return this.get('/interview/call', params, '获取面试者失败')
    }
    async authLogin (params = {}) { // HR登录
        return this.post('/auth/login', params, '登录失败')
    }
    async getUserList (params = {}) { // 获取面试者列表
        return this.get('/user/list', params, '获取失败')
    }
    async getUserDetail (params = {}) { // 获取学生详情
        return this.get('/user/detail', params, '获取用户详情失败')
    }
    async getInterviewList (params = {}) { // 获取面试官列表
        return this.get('/interview/list', params, '获取面试官列表失败')
    }
}

export default new API()
