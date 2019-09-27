function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function getToken(code) {
    const url = 'https://oauth.mail.ru/token'

    const body = 'grant_type=authorization_code'
    + `&code=${code}`
    + '&redirect_uri=http://127.0.0.1:8000'
    + '&client_id=d107a66dd260467fa71c9b863b196e7c'
    + '&client_secret=a4ce3dacd5a041e3b37cbdd56c23cdad'
    console.log(body);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body,
        mode: 'no-cors'
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then((response) => {
            if (!response.access_token){
                console.log(`Error ${response.error}: ${response.error_description}`);
                context.setState({error: response.error_description});
                window.open(context.linkToGetCode, '_self');
            } else {
                context.setState({response});
            }
        })
}

export default class Lib {
    constructor() {
        this.code = ''
    }


    fetchAccessCode() {
        const url = 
            'https://oauth.mail.ru/login'
            + '?client_id=d107a66dd260467fa71c9b863b196e7c'
            + '&response_type=code'
            + '&scope=userinfo'
            + '&redirect_uri=http://127.0.0.1:8000'
            + '&state=some_state';
        window.open(url)
    }

    getAccesCodeFromUrl() {
        let url = new URL('http://127.0.0.1:8000/' + window.location.search);
        this.code = url.searchParams.get("code");
        console.log('CODE', this.code);
        getToken(this.code);
    }
}