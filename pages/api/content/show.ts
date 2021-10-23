const { PrismaClient } = require('@prisma/client');
//
export default async function contentShow (req, res){
  try{
//console.log("apiShow.query=", req.query);
    const id = req.query.id
    /*
    const where = { _id: new ObjectID(id) }
    */
    const prisma = new PrismaClient()
    const item = await prisma.content.findUnique({
      where: { id: Number(id) },
    });     
    await prisma.$disconnect();         
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
