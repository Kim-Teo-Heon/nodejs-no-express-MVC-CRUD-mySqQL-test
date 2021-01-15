var db=require('../database');


module.exports={ 
  update_data: function(input_data,callback){
    let sql = 'UPDATE lists SET list=?, status=? WHERE id=?';
    let list= input_data.list;
    let status= input_data.status;
    let id = input_data.id;

    console.log(list);

    db.query(sql, [list,status,id],function (err, data) {
    if(err) {
      throw err;
    }
      // return callback(data);
    });
  }
}