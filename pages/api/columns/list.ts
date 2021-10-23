const { PrismaClient } = require('@prisma/client');
//
export default async function List (req, res){
  try{
//console.log( "site_id=", req.query.site_id )
    const site_id = Number(req.query.site_id); 
    const prisma = new PrismaClient()
    const items = await prisma.column.findMany({
      where: { siteId: site_id }
    })
    await prisma.$disconnect()
// console.log(items)
    const ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
