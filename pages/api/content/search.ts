const csrf = require('csrf');
const { PrismaClient } = require('@prisma/client');
import LibContent from "../../../libs/LibContent"
//
export default async function contentSearch(req, res){
  try{
    const data = req.body
//console.log( data )
    const column_id = Number(data.column_id); 
    const site_id = Number(data.site_id); 
    const search_key = data.search_key 
    const where = {site_id:  site_id,
      column_id: column_id,
    }
    const limit = {skip: 0 , limit: 1000 }
    const prisma = new PrismaClient()
    let items = await prisma.content.findMany({
      where: { siteId: site_id, columnId: column_id, }
    })
    await prisma.$disconnect();
    items = LibContent.getSearchItems(items, search_key ,[] )
// console.log( items )    
    const ret ={
      items: items
    }    
//console.log( ret )
    res.json(ret)
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}

