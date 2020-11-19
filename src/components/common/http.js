import axios from 'axios'
import Vue from 'vue'


export default{
    install(Vue, options){
        Vue.prototype.PRequest = function(url, data, success_func){
            data = {
                sss: 'xxx'
            }
            url = 'http://127.0.0.1:8011/' + url
            data = JSON.stringify(data)
            console.log("aaaaaaaaaaaaaaa", url);
            axios.post(url, data).then(function(response){
                console.log("wwwwwwwwwwwwww", response);
            })

        }
    }
}