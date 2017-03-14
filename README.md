## Auth Express using JWT

Con los [JWT](https://jwt.io/) (JSON Web Tokens) podemos autenticar a nuestros usuarios sin utilizar sesiones, solo adjuntando un token en la cabecera de cada peticion 

De este token podemos sacar info como el _id_ del usuario con el que podemos autorizar (o no) segun exista el usuario (o no) en nuestra BD

Este repo implementa una demo lo mas sencilla posible con los siguientes endpoints

- `[GET]` /api/registrar usuarios → nuevos documentos en la colección `users`
- login usuarios → devuelve un json web token
- autenticar usuarios → si el JSON web token es de un usuario valido

