const csrf = require('csrf');
const tokens = new csrf();
const { PrismaClient } = require('@prisma/client')

//
export default async function siteUpdate (req, res){
  try{
    const data = req.body
//console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    const id = data.id
    const prisma = new PrismaClient()   
    const itemOne = await prisma.site.update({
      where: { id: Number(id)},
      data: { 
        name: data.name,
        content: data.content,
      },
    })           
    await prisma.$disconnect()    
//console.log(itemOne);
    const ret ={
      item: itemOne
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
