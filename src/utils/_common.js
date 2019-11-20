class Common {
    validate (value, type) { // 验证表单
        switch (type) {
            case 's_name':
                return /^[\u4E00-\u9FA5]{2,4}/.test(value)
            case 's_id':
                return /^\d{10}$/.test(value)
            case 's_major':
                return /^[\u4E00-\u9FA5]+/.test(value)
            case 's_number':
                return /^\d{11}$/.test(value)
            default: return false
        }
    }
    getFormdata (data) { // 获取formdata
        let formdata = new FormData()
        const _formdata = data
        for (let key in _formdata) {
            formdata.append(key, _formdata[key])
        }
        return formdata
    }
    setSessionStore (key, value) { //设置sessionstorage
        sessionStorage.setItem(key, value)
    }
    getSessionStore (key) { //读取sessionstorage
        return sessionStorage.getItem(key)
    }
    timestampToExpectedTime (timestamp) { //转化预计到达时间
        let date = new Date(timestamp * 1000)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y + M + D + h + m + s
    }
}

export default new Common()
