// LibApiFind

const LibApiFind = {
  convert_items: function(items){
    const ret =[]
    items.forEach(function(item){
//console.log("id=" ,item._id)
      const row ={
        id: item.id,
        _id: item.id,
        created_at: item.createdAt,
      }
      let values = JSON.parse(item.values || '[]');
      values.forEach(function(value_item){
        row[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
      })
      ret.push(row)                        
    });        
    return ret
  },
  convertItemOne: function(item){
    let ret ={}
    const row ={
      id: item.id,
      _id: item.id,
      created_at: item.createdAt,
    }
    let values = JSON.parse(item.values || '[]');
    values.forEach(function(value_item){
      row[value_item.name] = value_item.value
//            console.log(value_item.name , value_item.value)
    })
    ret = row
    return ret
  },
  get_order_items: function(items, column, asc_type){
    const ret = [];
    items.sort(function (a, b) {
//      return a.num - b.num;
      return a[column] - b[column];
    });  
    if(asc_type == "DESC"){
      items.forEach(function(item){ ret.unshift(item) });
    }else{
      items.forEach(function(item){ ret.push(item) });
    }
    return ret
  },

}
export default LibApiFind;
