var delete_model=require('../models/delete');
const qs=require('qs');

module.exports={
delete_data:function(req,res){
  let body='';

  req.on('data',function(data){
    body += data
  })


  req.on('end', function(){
    post = qs.parse(body);

    console.log(post.id);

    const input_data= {
        id: post.id,
    };

    delete_model.delete_data(input_data,function(){
      // res.redirect('/');
      // console.log("delete succes");
    });
  })//데이터 전송이 끝나면 실행
}
}