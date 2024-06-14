# Sistema de Anúncios

## Detalhes da aplicação

- Rotas não configuradas como públicas devem receber um bearer token(access token passado como retorno do login)

## Rotas Base

- `/app`
- `Rota pública`

**Parametros da URL**

- Nenhum

**Parametros do Body**

- Nenhum

**Retorno**

- `The Application is running`

## Rotas de Autenticação

- `Rota: /auth/login`
- `Rota pública`

**Parametros da URL**

- Nenhum

**Parametros do Body**

- `{"email": "", "password": ""}`

**Retorno**

- `{"accessToken": "", "refreshToken": ""}`
  
---

- `Rota: /auth/register`
- `Rota pública`

**Parametros da URL**

- Nenhum

**Parametros do Body**

- `{ "name": "", "phone": "", "email": "", "password": "" }`

**Retorno**

- `{ "id": "", "name": "", "phone": "", "email": "" }`

---

- `Rota: /auth/refresh/{:token}`

**Parametros da URL**

- `{ "token": string }`
- `Example: http://exampleurl/auth/refresh/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{ "accessToken": "" }`

## Rotas de Usuário

- `Rota: /user/get/`
- `Rota pública`

**Parametros da URL**

- `Nenhum`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `[{ "id": "", "email": "", "name": "", "phone": ""}, ...]`

---

- `Rota: /user/get/id/{:id}`
- `Rota pública`

**Parametros da URL**

- `{ "id": "" }`
- `Example: http://exampleurl/user/get/id/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{ "id": "", "email": "", "name": "", "phone": ""}`

---

- `Rota: /user/get/name/{:name}`
- `Rota pública`

**Parametros da URL**

- `{ "name": "" }`
- `Example: http://exampleurl/user/get/name/Lucas`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{ "id": "", "email": "", "name": "", "phone": ""}`

---

- `Rota: /user/patch/{:id}`

**Parametros da URL**

- `{ "id": "" }`
- `Example: http://exampleurl/user/patch/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `{"name": "", "email": "", "password": "", "phone": ""}`

**Retorno**

- `{ "id": "", "email": "", "name": "", "phone": ""}`

---

- `Rota: /user/remove/{:id}`

**Parametros da URL**

- `{ "id": "" }`
- `Example: http://exampleurl/user/remove/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{"message": "User deleted successfully!"}`

## Rotas de Anúncios

- `Rota: /advert/create/`

**Parametros da URL**

- `Nenhum`

**Parametros do Body**

- `{"name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "category": ""}`

**Retorno**

- `{ "id": "", "name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "categoty": "", "createdAt": Date, "updatedAt": Date, "ownerId": ""}`

---

- `Rota: /user/get/{:take?}/{:skip?}`
- `Rota pública`

**Parametros da URL**

- `{"take": 0, "skip": 0}`
- `Example: http://exampleurl/advert/get/5/0`
- `Parametros opcionais para a paginação: take, skip`

**Parametro do Body**

- `Nenhum`

**Retorno**

- `{ "id": "", "name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "categoty": "", "createdAt": Date, "updatedAt": Date, "deletedAt": Date, "ownerId": ""}`

---

- `Rota: /user/get/name/{:name}/{:take?}/{:skip?}`
- `Rota pública`

**Parametros da URL**

- `{"name": "", "take": 0, "skip": 0}`
- `Example: http://exampleurl/advert/get/name/Ana/5/0`
- `Parametros opcionais para a paginação: take, skip`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `[{ "id": "", "name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "categoty": "", "createdAt": Date, "updatedAt": Date, "deletedAt": Date, "ownerId": ""}, ...]`

---

- `Rota: /user/get/owner/{:ownerId}/{:take?}/{:skip?}`
- `Rota pública`

**Parametros da URL**

- `{"ownerId": "", "take": 0, "skip": 0}`
- `Example: http://exampleurl/advert/get/name/a86c516a-639c-4775-bff8-1ea963ddede5/5/0`
- `Parametros opcionais para a paginação: take, skip`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `[{ "id": "", "name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "categoty": "", "createdAt": Date, "updatedAt": Date, "deletedAt": Date, "ownerId": ""}, ...]`

---

- `Rota: /advert/patch/{:id}`


**Parametros da URL**

- `{"id": ""}`
- `Example: http://exampleurl/advert/patch/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `{"name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "category": ""}`

**Retorno**

- `{ "id": "", "name": "", "value": 0, "shortDescription": "", "longDescription": "", "specificPhone": "", "categoty": "", "createdAt": Date, "updatedAt": Date, "deletedAt": Date, "ownerId": ""}`

---

- `Rota: /advert/patch/remove/{:id}`


**Parametros da URL**

- `{"id": ""}`
- `Example: http://exampleurl/advert/patch/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{"message": "Advert successfully deleted"}`

---

- `Rota: /advert/delete/remove/{:id}`


**Parametros da URL**

- `{"id": ""}`
- `Example: http://exampleurl/advert/patch/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{"message": "Advert successfully deleted"}`

## Rotas de Imagens

- `Rota: /image/create/{:advertId}`

**Parametros da URL**

- `{ "advertId": string }`
- `Example: http://exampleurl/image/create/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Multipart: [file,...]`

**Retorno**

- `{ "message": "Images save successfully!" }`
  
---

- `Rota: /image/get/{:advertId}`

**Parametros da URL**

- `{ "advertId": string }`
- `Example: http://exampleurl/image/get/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `[{"id": "", "originalName": "", "mimetype": "", "buffer": {"type": "", "data": []}, "advertId": ""},...]`

---

- `Rota: /image/remove/{:id}`

**Parametros da URL**

- `{ "refreshToken": string }`
- `Example: http://exampleurl/image/remove/a86c516a-639c-4775-bff8-1ea963ddede5`

**Parametros do Body**

- `Nenhum`

**Retorno**

- `{"message": "Image removed!"}`
