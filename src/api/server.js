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
}
