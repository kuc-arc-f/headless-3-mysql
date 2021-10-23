const { PrismaClient } = require('@prisma/client');
//
export default async function contentDelete (req, res){
  try{
    const data = req.body
    const id = Number(data.id);
    const prisma = new PrismaClient();
    const result = await prisma.content.delete({
      where: { id: id },
    })  
    await prisma.$disconnect();
//console.log(data);
    const ret ={
      id: id
    } 
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
