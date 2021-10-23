const { PrismaClient } = require('@prisma/client');

import LibApiFind from "../../../libs/LibApiFind"

//
export default async function getFindone (req, res){
  try{
//console.log(req.query );
    const id = Number(req.query.id);
    const prisma = new PrismaClient() ;
    let item = await prisma.content.findUnique({
      where: { id: id },
    });
    item = LibApiFind.convertItemOne(item)
    await prisma.$disconnect();
//console.log(item);
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
