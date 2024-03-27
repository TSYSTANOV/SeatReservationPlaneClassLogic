
class API{
    BASE_URL
    constructor(url){
        this.BASE_URL = url
    }
    getData(){
        return fetch(this.BASE_URL).then(response => response.json())
    }
}

const API_component = new API('https://61f4662310f0f7001768c90f.mockapi.io/api/airplane')
export {API_component}