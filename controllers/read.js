const read_model=require('../models/read');


module.exports={
 read_data:function(req,res,callback){
    
    read_model.read_data(function(data){
    
    return callback(data);
    });
  }
}


