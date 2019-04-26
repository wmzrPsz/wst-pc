// 创建实例时设置配置的默认值
    let instance = axios.create({
        baseURL: 'https://some-domain.com/api/',
        timeout: 15000,
        headers: {'X-Custom-Header': 'foobar'}
    });

function axGet(url, params, callback){

    instance .get('url', {
        params: params
      })
      .then(function (response) {
        console.log(response);
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });

}


function axPost(){

}






  axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });