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
}

export default new Common()
