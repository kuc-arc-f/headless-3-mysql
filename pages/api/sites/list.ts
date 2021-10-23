const { PrismaClient } = require('@prisma/client')
//
export default async function siteList (req, res){
  try{
    const prisma = new PrismaClient()
    const items = await prisma.site.findMany()
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
