const http = require('http'),
      fs = require('fs'),
      url = require('url'),
      iconv = require('iconv-lite'),
      {writeTxt,readTxt} = require('./files'),
      querystring = require('querystring');

//监听访问
let listener = (req,res) => {
  let {query,pathname} = url.parse(req.url,true);
  //console.log(pathname)
  //console.log(req)

  if(pathname === "/"){

    res.setHeader('Content-Type','text/html;charset=utf-8');
    fs.createReadStream('../FE/dist/index.html').pipe(res);

  }else if(pathname === "/getstocks"){//获取数据
    let code = '';
    if(query.code){
      code = query.code
    }

    res.writeHead(200,{
      'content-type': 'application/json'
    });

    new Promise(function (resolve, reject) {
        getstocks(resolve,code)
    }).then(
      (data) => {res.end(JSON.stringify(data));},  // 成功
      (err) => {res.end(err)} // 失败
    )
    
  }else if(pathname === '/submitTxt' && req.method == 'POST'){
    let data = '';

    //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
    req.on('data', function (chunk) {
        // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
        data += chunk;
    });
    // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
    //注册end事件，所有数据接收完成会执行一次该方法
    req.on('end', function () {   
      new Promise(function(resolve,reject){
        writeTxt(JSON.parse(data).data,'./stock.txt',resolve);
      })
      .then((data) => {
        res.end('success');
      }, (err) => {
        res.end(err)
      })
    });
  }else{
    res.statusCode = 200;
    console.log('end')
    res.end();
  }
}

//获取数据
function getstocks(func,parms){

  //url配置
  let options = {  
    hostname: 'hq.sinajs.cn',  
    port: 80,  
    path: '/list='+parms,  
    method: 'GET'  
  }; 
  
  var req = http.request(options, function (res) {  
    let chunks = [];
    //res.setEncoding('utf8');  
    res.on('data', function (chunk) { 
      chunks = chunks.concat(chunk);
    });  
    res.on('end',function(){
      var buf = Buffer.concat(chunks);
      // 转码
      var text= iconv.decode(buf,'gbk');
      func(text)
    })
  });  

  req.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
  }); 

  req.end();
}
//readTxt('./stock.txt',function(){});




let port = 7999;

let server = http.createServer(listener);

server.listen(port,function(){
  console.log(`start${port}`)
})