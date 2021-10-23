const { PrismaClient } = require('@prisma/client');

//
export default async function show (req, res){
  try{
//    console.log("id=", req.query.id);
    const id = req.query.id
    console.log("id=", id);
    const prisma = new PrismaClient()
    const item = await prisma.column.findUnique({
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
