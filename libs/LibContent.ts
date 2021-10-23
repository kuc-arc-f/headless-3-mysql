//LibContent

const LibContent = {
  get_item : function(items, name){
    let ret = ""
    items.forEach(function(item){
//            console.log(item.id );
      if(item.name === name){
        ret = item.value
      }
    });        
    return ret
  },
  /* 重複行のチェック */
  valid_contain : function(items , id){
    let ret = true
    items.forEach(function(item){
      if(item.id.toString()  === id){
//console.log( "ng.id=",item._id.toString(), id);
        ret = false
      }
    })
    return ret
  },
  getSearchItems : function(items , key , columns){
    const ret = []
    const self = this
    items.forEach(function(item){
//console.log(item);
      let values = item.values;
      values = JSON.parse(values || '[]');
//console.log(values);
      values.map((value_item, index) =>{
        let content_value = value_item.value
        let pos = content_value.indexOf(key)
        if(pos != (-1)){
          let valid = self.valid_contain(ret, item.id.toString())
          if(valid){ ret.push(item) }
        }
      })
    });
    return ret    
  },    
  func1 :async function(){
  },
}
export default LibContent;

