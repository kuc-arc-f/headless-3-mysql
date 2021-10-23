const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();
const { PrismaClient } = require('@prisma/client');

//
export default async function auth_check(req, res) {
  try{
    if (req.method === "POST") {
      const retArr: any = {ret: 0, user_id: 0}
      const data = req.body
// console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      }  
      const prisma = new PrismaClient();
      let users = await prisma.user.findMany({
        where: { email: data.mail },
      });
      await prisma.$disconnect(); 
      if(typeof users[0] === 'undefined'){
        return res.json(retArr);
      }
      const item = users[0];
console.log(item)
      if (data.mail === item.email
        && bcrypt.compareSync(data.password,  item.password )){
        retArr.ret = 1
        item.password = ""
        retArr.user = item
        return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
    }
    return res.status(404).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
