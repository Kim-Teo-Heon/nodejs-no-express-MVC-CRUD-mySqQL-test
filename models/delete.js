var db=require('../database');


module.exports={ 
  delete_data: function(input_data,callback){
    let sql = 'DELETE FROM lists WHERE id=?';
    let id = input_data.id;

    db.query(sql, [id], function (err, data) {
    if(err) {
      throw err;
    }
      return callback();
    });
  }
}