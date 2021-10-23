# headless-3-mysql (Beta)

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/10/23 

 update  :

***
### Summary

headless CMS , Next.js + mysql + prisma

***
### required
* Next.js : 11.1.2
* mysql : 5.7
* node : 14.17
* prisma ORM

***
### Setup

npm install

* migrate

npx prisma migrate dev --name init

***
### Setup , etc
* next.config.js , 

if change URL, mongodb URL, database name

```
BASE_URL: "http://localhost:3001"
MONGODB_URL: "mongodb://localhost:27017",
MONGODB_DB_NAME: "hcms",    
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3001"
```
* .env , dbname = hcm

```
DATABASE_URL="mysql://user1:password@localhost:3306/hcms"
```
***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### Blog : 

***

