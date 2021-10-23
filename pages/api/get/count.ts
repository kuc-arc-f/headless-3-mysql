const { PrismaClient } = require('@prisma/client');
//
export default async function getCount (req, res){
  try{
//console.log(req.query );
    const content_name = req.query.content;
    const site_id = req.query.site_id
    const where ={site_id: site_id,
      name: content_name
    }
    const apikey = req.query.apikey;
    if(typeof req.query.apikey =='undefined'){
      throw new Error('Invalid header , APIKEY');
    }
    const prisma = new PrismaClient() ;
    const keys = await prisma.apikey.findMany({
      where: { key: apikey},
    });     
    if(typeof keys[0] =='undefined'){
      await prisma.$disconnect();
      throw new Error('DB error, apikey nothing');
    }
//console.log(keys);
    const key = keys[0];
    const count = await prisma.content.count({
      where: { siteId: key.siteId, name: content_name},
    });
//console.log(count);
    await prisma.$disconnect();
    res.json({count : count });
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}

