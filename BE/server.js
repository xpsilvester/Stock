const http = require('http'),
      fs = require('fs'),
      url = require('url'),
      qs = require('querystring'),
      iconv = require('iconv-lite');

//监听访问
let listener = (req,res) => {
  let {query,pathname} = url.parse(req.url,true);
  console.log(pathname)
  if(pathname === "/"){

    res.setHeader('Content-Type','text/html;charset=utf-8');
    fs.createReadStream('../FE/dist/index.html').pipe(res);

  }else if(pathname === "/getstocks"){
    res.writeHead(200,{
      'content-type': 'application/json'
    });

    new Promise(function (resolve, reject) {
        getstocks(resolve,['sh601003','sh601001'])
    }).then(
      (data) => {res.end(JSON.stringify(data));},  // 成功
      (err) => {res.end(err)} // 失败
    )
    
  }else{
    res.statusCode = 200;
    res.end();
  }
}

//获取数据
function getstocks(func,...args){
  
  let parms = args.join(',');

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

let port = 7999;

let server = http.createServer(listener);

server.listen(port,function(){
  console.log(`start${port}`)
})