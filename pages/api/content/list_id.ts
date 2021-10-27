import LibPagenate from "../../../libs/LibPagenate"
const { PrismaClient } = require('@prisma/client');

//
export default  async function ListId (req, res){
  try{
//console.log("q=", req.query);
    const id = Number(req.query.id);
    const site_id = Number(req.query.site_id); 
    const page = req.query.page
//console.log("page=", page);
    LibPagenate.init();
    const page_info = LibPagenate.get_page_start(page);
    const limit = {skip: page_info.start , limit: page_info.limit }
//console.log(limit);
    const prisma = new PrismaClient()
    let items: any[] = [];
    if( typeof page === 'undefined'){
      limit.skip = 0;
    }
    items = await prisma.content.findMany({
      where: { siteId: site_id, columnId: id, },
      orderBy: [
        { id: 'desc',},
      ],      
      skip: limit.skip,
      take: limit.limit,      
    })    
    await prisma.$disconnect()
    const ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
