const app_id = '58d58203';
const app_key = '8f928d75ca44669262329f5d95c9687d';

const checkWord = (word) => {
    // $.ajax({
    //     type: 'GET',
    //     url: `https:od-api.oxforddictionaries.com/api/v1/entries/en/${word}`,
    //     headers: {
    //         "Accept": "application/json",
    //         'mode': 'no-cors',
    //         'app_id': '58d58203',
    //         'app_key': '4fc77e99bd1fff9e2bdb6b82c2e5e378',
    //         'Access-Control-Allow-Origin': 'http://localhost:3000'
    //     },
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    fetch(`https://od-api.oxforddictionaries.com/api/v1/entries/en/${word}`, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'app_id': '58d58203',
            'app_key': '4fc77e99bd1fff9e2bdb6b82c2e5e378',
        },


    })
        .then(res => res.json())
        .then(data => console.log(data))
}

export default checkWord;