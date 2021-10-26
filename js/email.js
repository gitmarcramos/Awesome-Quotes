const emailInp = document.getElementById("emial");
const emailModel = require("models/email.model.js")

// emailInp.onblur = function () {
//     const email = this.value;
//     const reg = emailModel;
//     console.log("succese")
//     if(!emailModel) {
//         info.innerHTML = "Please enter the correct email rule!"
//         return;
//     }

//     ajax({
//         type:"get",
//         url: "http://localhost:3000/auth/create-account",
//         data: {
//             email:email
//         },
//         success:function (result){
//             console.log(result);
//         },
//         error:function(result){
//             console.log(result)
//         }
//     });

// }    


let input = document.querySelector('#email');
let p = document.querySelector('#info');

input.addEventListener('blur', () => {
    let value = input.value;
    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!reg.test(value)) {
        p.innerHTML = 'incorrect mail';
        p.className = 'bg-danger';
        return;
    }

    Ajax({
        type: 'get',
        url: 'http://localhost:3000/auth/create-account',
        data: {
            email: value
        },
        success: function(data) {
            p.innerHTML = data.message;
            p.className = 'bg-success';
        },
        error: function(data) {
            p.innerHTML = data.message;
            p.className = 'bg-danger';
        }
    })
})

function Ajax(options) {
    let defaults = {
      type: 'get',
      url: '',
      success: function () { },
      error: function () { },
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  
    Object.assign(defaults, options);
  
  
    let { type, url, success, error, data, header } = defaults;
    let params = '';
  
    var xhr = new XMLHttpRequest();
  
    for (let item in data) {
      params += item + '=' + data[item] + '&';
    }
    params = params.substr(0, params.length - 1);
  
  
    if (type == 'get') { 
      xhr.open(type, url + '?' + params);
      xhr.send();
    } else { 
      xhr.open(type, url);
      header = header['Content-Type'];
      xhr.setRequestHeader('Content-Type', header);
  
      if (header == 'application/json') {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(params);
      }
    }
  
    xhr.onload = function () {
      var contentType = xhr.getResponseHeader('Content-Type');
      var responseText = xhr.responseText;
  
      if (xhr.status == 200) {
        if (contentType.includes('application/json')) {
          responseText = JSON.parse(xhr.responseText, xhr);
        }
        success(responseText, xhr);
      } else {
        if (contentType.includes('application/json')) {
          responseText = JSON.parse(xhr.responseText, xhr);
        }
        error(responseText, xhr);
      }
    }
  }
  