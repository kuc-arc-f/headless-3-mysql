const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();
const { PrismaClient } = require('@prisma/client');
//
export default async function userNew(req, res){
  try{
    const data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    const item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }
    const prisma = new PrismaClient()
    const result:any = await prisma.user.create({
      data: {
        name: data.name,
        email: data.mail,
        password: hashed_password,
      }
    });        
console.log(result);
    const ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
