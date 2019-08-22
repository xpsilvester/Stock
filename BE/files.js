const fs = require('fs');

//读取txt文件
let readTxt = function(name,func){
    let data = '';
    //创建可读流
    let readerStream = fs.createReadStream(name);
    //设置编码为utf8
    readerStream.setEncoding('UTF8');
  
    //处理流事件 --> data,end,and error
    readerStream.on('data',function(chunk){
      data += chunk
    })
    readerStream.on('end',function(){
      func(data)
      console.log(data)
    })
  
    readerStream.on('error',function(err){
      console.log(err.stack)
    })
  }
  
  //写txt文件
  let writeTxt = function (data,name,func){
    // 创建一个可以写入的流，写入到文件中
    let writerStream = fs.createWriteStream(name);
  
    //使用utf8编码写入数据
    writerStream.write(data,'UTF8');
  
    //标记文件末尾
    writerStream.end();
  
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
      func('success')
      console.log("写入完成。");
    });
  
    writerStream.on('error', function(err){
    console.log(err.stack);
    });
  }

  module.exports = {readTxt,writeTxt};