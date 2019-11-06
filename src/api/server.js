import axios from 'axios'
import baseURL from '@/env/config.js'

export default class Server {
    axios(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {}
            let _option = params
            _option = {
                method,
                url,
                baseURL,
                timeout: 30000,
                params: null,
                data: null,
                headers: null,
                withCredentials: true,
                ...params
            }
            axios.request(_option).then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
            }, error => {
                reject(error)
            })
        })
    }
    async get (url, params = {}, errTips) { // get请求
        try {
            let result = await this.axios('get', url)
            if (result && (result.data instanceof Object) && result.code === 1) {
                return result.data
            } 
            let err = {
                tip: errTips,
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
    async post (url, params = {}, errTips) { // post请求
        try {
            let result = await this.axios('post', url, params)
            if (result && result.code === 1) {
                return result
            }
            let err = {
                tip: errTips,
                response: result,
                data: params
            }
            throw err
        } catch (err) {
            throw err
        }
    }
}
