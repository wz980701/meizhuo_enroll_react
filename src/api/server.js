import axios from 'axios'
import envconfig from '@/env/config'

export default class Server {
    axios(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {}
            const _option = {
                method,
                url,
                baseURL: envconfig.baseURL,
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
