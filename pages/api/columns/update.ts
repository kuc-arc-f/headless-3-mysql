const csrf = require('csrf');
const { PrismaClient } = require('@prisma/client');
//var tokens = new csrf();


//
export default async function update (req, res){
  try{
    const data = req.body
// console.log(data);
    const item = data;
    const id = Number(item.id);
    const prisma = new PrismaClient()   
    const itemOne = await prisma.column.update({
      where: { id: id},
      data: { 
        values: item.colmuns_json,
      },
    })           
    await prisma.$disconnect()
console.log(itemOne);
    const url = `/content_type/${itemOne.siteId}`
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
