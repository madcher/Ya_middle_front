const METHODS = {
    GET:'GET',
    POST:'POST',
    PUT:'PUT',
    PATCH:'PATCH',
    DELETE:'DELETE',
};

/**
	* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
	* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
	* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/


function queryStringify(data) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (!data) {
    return '';
  }
  let result = '?';
  
  Object.keys(data).forEach(key => {
    result += `${key}=${data[key]}&`;
  });
  return result.slice(0, -1); ;
}

class HTTPTransport {
		get = (url, options = {}) => {
				 
				return this.request(url, {...options, method: METHODS.GET}, options.timeout);
		};

		// PUT, POST, DELETE
        
        put = (url, options = {}) => {
			return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
		};
        post = (url, options = {}) => {
			return this.request(url, {...options, method: METHODS.POST}, options.timeout);
		};
        delete = (url, options = {}) => {
			return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
		};
		// options:
		// headers — obj
		// data — obj
		request = (url, options, timeout = 5000) => {
			const {method, data} = options;

            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              
              url = method === METHODS.GET ? url + queryStringify(data) : url;
              setTimeout(() => {
                reject('timeout');
              }, timeout);
              xhr.open(method, url);

              xhr.onload = function() {
                resolve(xhr);
              };
              
              xhr.onabort = reject;
              xhr.onerror = reject;
              xhr.ontimeout = reject;

              if (method === METHODS.GET || !data) {
                xhr.send();
              } else {
                xhr.send(data);
              }
            });	
		};
}

function fetch(url, options) {
  return new HTTPTransport().request(url, options, options.timeout);
};

async function fetchWithRetry(url, options) {
		// код
        console.log(options);
        if (!options.retries) {
          throw new Error('maximum retries exceeded');
        }
        
        try {
          let result = await fetch(url, options);
          return result;
        } catch (e) {
          let result = await fetchWithRetry(url, {...options, retries: options.retries - 1});
          return result;
        }
}

