const { PrismaClient } = require('@prisma/client');
//
export default async function contentNew(req, res){
  try{
    const data = req.body
//console.log( data )
    const cole_name = data.content_name
//    const values = JSON.parse(data.colmuns_json || '[]')
    const prisma = new PrismaClient()
    const result:any = await prisma.content.create({
      data: {
        name: cole_name,
        columnId: Number(data.column_id),
        siteId: Number(data.site_id),
        values: data.colmuns_json,
        userId: 0,
      }
    }); 
    await prisma.$disconnect();   
//console.log( item )
    const url = `/content/list?site_id=${result.siteId}&column=${result.columnId}`
//    console.log( "url=",url  )
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }   
}
