
# API sample

***
### find

get, content List

* curl sample

```
curl "http://localhost:3001/api/get/find?content=posts&apikey=z0IStFXrZOcrpTm0WlmVgRWC"
```

* content

content name : Site > ContentType > content name

* apikey

apikey : Site > open > API KEY 

***
* option (page)

```
curl "http://localhost:3001/api/get/find?content=posts&apikey=z0IStFXrZOcrpTm0WlmVgRWC&skip=0&take=10"
```
* skip : start position (ex: 0)

* take: record  (ex: 10)

***
### findone

get 1 record

* curl sample

```
curl "http://localhost:3001/api/get/findone?content=posts&id=5"
```

* content

content name : Site > ContentType > content name

* id

 content.id

***
### count

リストの件数

* curl sample

```
curl "http://localhost:3001/api/get/count?content=posts&apikey=z0IStFXrZOcrpTm0WlmVgRWC"
```

* content

content name : Site > ContentType > content name

* apikey

apikey : Site > open > API KEY 

***

