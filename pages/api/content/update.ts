
const { PrismaClient } = require('@prisma/client');
//
export default async function contentUpdate (req, res){
  try{
    const data = req.body
    const item = data
    const id = Number(item.id);
//console.log(itemOne);
    const prisma = new PrismaClient()   
    const itemOne = await prisma.content.update({
      where: { id: id},
      data: { 
        values: item.colmuns_json,
      },
    })           
    await prisma.$disconnect();
    const url = `/content/list?site_id=${item.site_id}&column=${itemOne.columnId}`
//console.log( "url=",url  )   
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
