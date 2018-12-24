import fetchIntercept from "fetch-intercept";
import 'whatwg-fetch'


export default function fetchInterceptor(){
    fetchIntercept.register({
        request: function (url, config) {
            return [url, config];
        },

        requestError: function (error) {
            return Promise.reject(error);
        },

        response: function (response) {
            console.log(response)
            if(response.status === 404){
                return Promise.reject(response.statusText)
            }else {
                return response.json().then(res=>{
                    return Promise.resolve(res)
                })
                    .catch(e => console.log(e))
            }

        },

        responseError: function (error) {
            return Promise.reject(error);
        }
    });
}
