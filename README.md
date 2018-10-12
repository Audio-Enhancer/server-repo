# [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome) [**Audio Enhancher**](https://github.com/productivy/productivy) 



## API Documentation

## Overview
#### Reading app with basic REST API.
This documentation covers the [[Audio Enhancher]] Service web API.


#### Media Type support
    All server response bodies and request bodies MUST be valid JSON Media Type messages.

## URLs and Operations

>Below are the URLs and the operations associated with them.


#### User
The User is the base token for reading objects and supports the following operations:

---
## Authentication

| Route | HTTP | Description | Input | Output |
| ------ | ------ | ------ | ------ | ------ |
| ````/login```` | POST | Sign in while get an access token based on credentials | [username], [password] | access_token
| ````/register```` | POST | Sign up while get an access token based on credentials | [username], [password], [name] | user

---
###  /theaudios/

| Route | HTTP | Description | Input | Output |
| ------ | ------ | ------ | ------ | ------ |
| ````/```` | POST | Create new audio | name, media(audio-src), media(img-src), headers(access_token)  | Object
| ````/```` | GET | Get every single audio  |  none | List
| ````/uploads/audio```` | POST | Upload document to GCS, | Media,headers(access_token) | none
| ````/topshare```` | GET | Get top shared audio.  | none | List
| ````/myaudios```` | GET | Get User personal audio data | headers(access_token) | List
| ````/likes/:id```` | GET | Like single audio | id,headers(access_token) | none
| ````/unlikes/:id```` | GET | Unlike single audio | id, headers(access_token) | none
| ````/share/:id```` | GET | Share audio url to various social media platform | headers(access_token) | none
| ````/search/:keyword```` | GET | Searc for uploaded audio | string | found
| ````/delete/:id```` | DELETE | Delete User audio by id | id, headers(access_token) | none

___


## Usage
#### With only npm:
```
npm install
npm start
```

## Built With
1. express
2. Mongo DB
3. Node JS (Backend)
4.  Vue Js (FrontEnd)
5.  Google Cloud Platform
   

## Authors
1. Efrat Sadeli
2. Harles Bayu A
3. Payoga Putra
4. Fathul Q A



## Acces the website via https://apiaudioenhancer.efratsadeli.online/ 