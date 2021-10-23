
# API Write sample

***
### create

create , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/create/posts -d "title=t1023a" -d "content=c1023a" -H "apikey:z0IStFXrZOcrpTm0WlmVgRWC"

```
URL : /api/post/create/content_name

* content_name

Site > ContentType > content name

* apikey

Site > open > apikey

***
### delete

delete , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/delete/posts -d "id=8" -H "apikey:z0IStFXrZOcrpTm0WlmVgRWC"
```

URL : /api/post/delete/content_name

* content_name

Site > ContentType > content name

* id

content.id

* apikey

Site > open > apikey


***
### update

update , content

* curl sample

```
curl  -X POST http://localhost:3001/api/post/update/posts -d "id=6" -d "title=t1024a" -d "content=c1024a" -H "apikey:z0IStFXrZOcrpTm0WlmVgRWC"
```
URL : /api/post/create/content_name

* content_name

Site > ContentType > content name

* id

content.id

* apikey

Site > open > apikey

