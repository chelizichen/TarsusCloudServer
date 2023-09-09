import axios from 'axios';

const http = axios.create({
    timeout: 15000 // 请求超时时间
});

http.interceptors.request.use((request)=>{
    return request;
})


http.interceptors.response.use(response => {
    return response.data
})

export default http;
