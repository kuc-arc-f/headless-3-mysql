const { PrismaClient } = require('@prisma/client');
import LibApiCreate from "../../../../libs/LibApiCreate"
//
export default async function Page(req, res){
  try{
    if(typeof req.headers.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const content_name = req.query.id
    const apikey = req.headers.apikey
    const data = req.body
    const prisma = new PrismaClient() ;
    const keys = await prisma.apikey.findMany({
      where: { key: apikey},
    });     
    if(typeof keys[0] =='undefined'){
      await prisma.$disconnect();
      throw new Error('DB error, apikey nothing');
    }
    const key = keys[0];    
//console.log(key);
    const columns = await prisma.column.findMany({
      where: { siteId: key.siteId, name: content_name },
    }); 
    const column = columns[0];
    const coluValues = JSON.parse(column.values || '[]');
//console.log(coluValues);
    const newData = LibApiCreate.valid_post(data, coluValues);
//console.log(newData);
    const result:any = await prisma.content.create({
      data: {
        name: content_name,
        columnId: column.id,
        siteId: key.siteId,
        values: JSON.stringify(newData),
        userId: 0,
      }
    });     
//console.log(result);
    await prisma.$disconnect();
    res.json({return: 1 })
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
