import axios from 'axios'

export default async ({Vue}) => {
    const instance = axios.create({
        baseURL: 'http://192.168.1.239/api_base/public'
    });
    
    Vue.prototype.$axios = instance
}

