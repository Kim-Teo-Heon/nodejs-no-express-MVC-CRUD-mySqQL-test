var update_model=require('../models/update');
const qs=require('qs');

module.exports={
update_data:function(req,res){
  let body='';

  req.on('data',function(data){
    body += data
  })


  req.on('end', function(){
    let post = qs.parse(body);

    const input_data= {
        id : post.id,
        list : post.list,
        status : 'N'
    };

    update_model.update_data(input_data,function(){
      // res.redirect('/');
      // console.log("updated success");
    });
  })//데이터 전송이 끝나면 실행
}
}