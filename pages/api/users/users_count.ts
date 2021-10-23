const csrf = require('csrf');

const { PrismaClient } = require('@prisma/client')
//
export default async function users_count (req, res) {
  try{
    const prisma = new PrismaClient() ;
    const count = await prisma.user.count({});
    await prisma.$disconnect();
//console.log(count)
    res.json({count: count})
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
