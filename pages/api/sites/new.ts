const csrf = require('csrf');
const tokens = new csrf();
const { PrismaClient } = require('@prisma/client')
import LibSite from "../../../libs/LibSite"

//
export default async function siteNew (req, res){
  try{
//console.log(req.body);
const data = req.body
const token =data._token
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }
    const prisma = new PrismaClient()
    const result:any = await prisma.site.create({
      data: {
        name: data.name,
        content: data.content,
        userId: 0,
      }
    });
// console.log(typeof result.id);
    if(typeof result.id === 'undefined'){
      throw new Error('Error , site.id nothing');
    }
    //Key
    const key = LibSite.get_apikey();
    const resultKey:any = await prisma.apikey.create({
      data: {
        siteId: result.id,
        key: key,
      }
    });
    await prisma.$disconnect()    
//console.log(resultKey);
    const ret ={
      item: result
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
