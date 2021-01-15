var create_model=require('../models/create');
const qs=require('qs');

module.exports={
create_data:function(req,res){
  let body='';

  req.on('data',function(data){
    body += data;
  })


  req.on('end', function(){
    post = qs.parse(body);

    input_data= {
      list:     post.list,
      status :      'N'
    };
    
    create_model.create_data(input_data,function(){
      // res.redirect('/');
      console.log("created succes");
    });
  })//데이터 전송이 끝나면 실행
}
}