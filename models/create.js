var db=require('../database');


module.exports={ 
  create_data: function(input_data,callback){
    let sql = 'INSERT INTO lists(list,status) VALUES(?,?)';
    let list= input_data.list;
    let status= input_data.status;

    console.log(list);

    db.query(sql, [list,status],function (err, data) {
    if(err) {
      throw err;
    }
      return callback();
    });
  }
}