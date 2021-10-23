
const { PrismaClient } = require('@prisma/client');
//
export default async function postDelete (req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const apikey = req.headers.apikey
    const data = req.body
//console.log( "key=", apikey )
    if(typeof data.id =='undefined'){
      throw new Error('Invalid , id');
    }
    const id = Number(data.id);
    const prisma = new PrismaClient() ;
    const keys = await prisma.apikey.findMany({
      where: { key: apikey},
    });     
    if(typeof keys[0] =='undefined'){
      await prisma.$disconnect();
      throw new Error('DB error, apikey nothing');
    }
    const key = keys[0];  
//console.log(key)    
    const result = await prisma.content.delete({
      where: { id: id },
    });
    await prisma.$disconnect();  
    res.json({return: 1})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
