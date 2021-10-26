const { PrismaClient } = require('@prisma/client');
import LibApiFind from "../../../libs/LibApiFind"
import LibPagenate from "../../../libs/LibPagenate"
//
export default async function getFind (req, res){
  try{
//console.log(req.query );
    const content_name = req.query.content;
    const site_id = req.query.site_id
// console.log(content_name ,site_id );
    const apikey = req.query.apikey;
    if(typeof req.query.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    let items = []
    const where ={site_id: site_id,
      name: content_name
    }
    const prisma = new PrismaClient() ;
    const keys = await prisma.apikey.findMany({
      where: { key: apikey},
    });
    if(typeof keys[0] =='undefined'){
      await prisma.$disconnect();
      throw new Error('DB error, apikey nothing');
    }
    const key = keys[0]; 
//console.log(key);      
    // order
    if(typeof req.query.order !='undefined'){
      /*
      const order = req.query.order;
      const orderArr = order.split(':');
      if(orderArr.length < 2){ throw new Error('error, orderArr.length'); }
      const order_col = orderArr[0]
      const order_asc = orderArr[1]
      items = await LibMongo.get_arrayWhere("contents" , where)
      items = LibApiFind.convert_items(items) 
      items = LibApiFind.get_order_items(items, order_col, order_asc)
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.limit !='undefined')){
        const skip = req.query.skip
        const limit = req.query.limit
        items = LibPagenate.get_items(items, skip, limit)
      }
      */
    }else{
      if(( typeof req.query.skip !='undefined') &&
      ( typeof req.query.take !='undefined')){
        const limit = {skip: Number(req.query.skip) , take: Number(req.query.take) }
//console.log(limit);
        items = await prisma.content.findMany({
          where: { siteId: key.siteId, name: content_name},
          orderBy: [
            { id: 'desc', },
          ],
          skip: Number(req.query.skip),
          take: Number(req.query.take),
        });
      }else{
        items = await prisma.content.findMany({
          where: { siteId: key.siteId, name: content_name},
          orderBy: [
            { id: 'desc', },
          ],
        });
      }
      items = LibApiFind.convert_items(items) 
    }
//console.log(items.length);
    await prisma.$disconnect();
    res.json(items);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
