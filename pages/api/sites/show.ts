const { PrismaClient } = require('@prisma/client')
//
export default async function siteShow(req, res){
  try{
    const id = req.query.id
console.log("id=", id);
    const prisma = new PrismaClient()
    const item = await prisma.site.findUnique({
      where: { id: Number(id) },
    });     
    //key
    let itemKey = await prisma.apikey.findMany({
      where: { siteId: Number(id) },
    });     
//console.log(itemKey)  
    await prisma.$disconnect();    
    if(typeof itemKey[0] === 'undefined'){
      throw new Error('Error, apikey none');
    }
    itemKey = itemKey[0];     
    const ret ={
      item: item,
      apikey : itemKey,
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
