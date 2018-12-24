import fetchIntercept from "fetch-intercept";

export default function fetchInterceptor(){
    fetchIntercept.register({
        request: function (url, config) {
            // console.log(url);
            // window.timeOut = setTimeout(()=> self.serverIsNotAvailable(),5000)
            return [url, config];
        },

        requestError: function (error) {
            // console.log(error, "REQUEST ERROR");
            return Promise.reject(error);
        },

        response: function (response) {
            return response.json().then(res=>{
                // console.log(res, "++++++++");
                clearTimeout(window.timeOut);
                if(res.statusCode === 401){
                    //todo Refresh Token functionality
                    //  self.logOut(true)
                }
                if(res.code === "TOKEN_INVALID" || res.statusCode === 401) {
                    Promise.reject(res)
                    // IFSMarketsApi.refreshToken(localStorage.getItem("user_id"), localStorage.getItem("refresh")).
                    //     then(refresh => {
                    //         console.log(refresh, "++++++9++++++9+9+9+9+9+9+")
                    //         if(!refresh.code || !refresh.statusCode){
                    //             alert("Refresh token successed")
                    //             localStorage.clear();
                    //             localStorage.setItem("token", refresh.token)
                    //             localStorage.setItem("refresh", refresh.refresh)
                    //             localStorage.setItem("user_id", refresh.user_id);
                    //             self.getUser();
                    //             Promise.resolve(refresh)
                    //         }
                    //         else {
                    //             alert("Wrong token")
                    //             self.logOut();
                    //             self.props.history.push("/login");
                    //             Promise.reject(refresh)
                    //         }
                    //         console.log(res, "refresh token")})
                }
                // if(!Object.keys(res).length || res.code === 7000)
                // {
                //     self.logOut(true);
                //     Promise.reject(res)
                // }
                return Promise.resolve(res)
            })
        },

        responseError: function (error) {
            // console.log(error, "RESPONSE ERROR")
            return Promise.reject(error);
        }
    });
}
