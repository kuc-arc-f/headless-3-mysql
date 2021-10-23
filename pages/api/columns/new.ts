
const { PrismaClient } = require('@prisma/client');
//
export default async function columunNew (req, res){
  try{
    const data = req.body
console.log(data)
    const prisma = new PrismaClient();
    const result: any = await prisma.column.create({
      data: {
        name: data.content_name,
        values: data.colmuns_json,
//        userId: "",
        siteId: Number(data.site_id),        
        content: data.content,
      }
    });
    await prisma.$disconnect()
console.log(result);
    const url = "/content_type/" + data.site_id
    if (res) {
      res.writeHead(302, { Location: url });
      res.end();
    } 
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
