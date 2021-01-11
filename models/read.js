var db=require('../database');


module.exports={
  read_data:function(callback){
    var sql='SELECT * FROM lists';
    db.query(sql, function (err, data) {
    if(err) {
      throw err;
    } 
    console.log(data);
    return callback(data);
    });  
  }
 
}