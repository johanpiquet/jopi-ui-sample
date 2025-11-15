# Rôles d'un utilisateur

## Lister les rôles de l'utilisateur connecté

Le but de cette section est de découvrir comment obtenir la liste des rôles de l'utilisateur actuellement connecté.

---

La façon de faire change en fonction de l'endroit où nous nous trouvons:
* Dans un composant React.js (fichier `page.tsx`).
* Ou dans un fichier de type `onGET.ts`.

### Dans un fichier 'page.tsx'

> **Attention** cette méthode s'applique uniquement au cas où tu es à l'intérieur d'un composant React.js.

Dans un composant React.js, la fonction hook `useUserInfos` renvoie un objet `UiUserInfos` ou `undefined`.
Cet objet `UiUserInfos` expose une propriété `roles` de type `string[]|undefined` contenant la liste des rôles.

```typescript jsx
// file page.tsx

import {useUserInfos} from "jopi-rewrite/uikit";

export default async function() {
    const userInfos = useUserInfos();

    if (userInfos) {
        console.log("User infos:", userInfos);
    }
    
    return null;
}
```

### Dans un fichier de type 'onGET.ts'

> **Attention** cette méthode s'applique uniquement aux fichiers `onGET.ts`, `onPOST.ts`, `onPUT.ts`, ...

Les objets `JopiRequest` exposent une fonction `getUserInfos` qui est l'équivalent de ce que fait la fonction `useUserInfos`.
C'est la fonction à utiliser pour obtenir des informations sur l'utilisateur connecté et ses rôles.

```typescript
import {JopiRequest} from "jopi-rewrite";

export default async function(req: JopiRequest) {
    let userInfos = req.getUserInfos();

    if (userInfos) {
        console.log("User infos:", userInfos);
    }

    return req.jsonResponse(userInfos);
}
```

## Mettre en place un mécanisme d'authentification

Le but de cette section est de découvrir comment :
* Mettre en place un mécanisme d'authentification des utilisateurs.
* Créer une liste d'utilisateurs.

---

Pour mettre en place l'authentification des utilisateurs, trois choses sont nécessaires:
* Etape 1 - Activer le mécanisme d'authentification basé sur JWT (Json Web Token).
* Etape 2 - Définir un mécanisme permettant de gérer une liste d'utilisateur.
* Etape 3 - Relier l'ensemble à une route afin d'exposer l'API d'authentification.

### Etapes 1: activer le mécanisme d'authentification.

Cette étape est à réaliser dans le fichier `serverInit.ts` d'un module.

```typescript
// File src/mod_myModule/serverInit.ts

import {JopiEasyWebSite} from "jopi-rewrite";

export default function(webSite: JopiEasyWebSite) {
    webSite
        .enable_jwtTokenAuth()
        .step_setPrivateKey("my-private-key");
}
```

### Etape 2: gérer les utilisateurs.

Pour cela, nous allons enrichir l'exemple précédant en appelant la fonction `step_setUserStore`.

```typescript
// File src/mod_myModule/serverInit.ts

import {JopiEasyWebSite} from "jopi-rewrite";

export default function(webSite: JopiEasyWebSite) {
    webSite
        .enable_jwtTokenAuth()
        .step_setPrivateKey("my-private-key")

        .step_setUserStore()
        
        // This store will use the login and password
        // to check if the user has correct authentification info.
        .use_simpleLoginPassword()
        
        // Add all the user defined in our file 'myUsers.json'.
        .addMany(myUsers)
        
        // Allow to know that there is no more thing to do
        // for the action 'use_simpleLoginPassword'.
        .DONE_use_simpleLoginPassword()
        
        // Allow to know that there is no more thing to do
        // for the action 'step_setUserStore'.
        .DONE_setUserStore()

        // Allow to know that there is no more thing to do
        // for the action 'enable_jwtTokenAuth'.
        .DONE_enable_jwtTokenAuth();
}
```

Voici un exemple de contenu pour le fichier `myUsers.json`.
Ici l'exemple crée un tableau avec un seul utilisateur, cependant plusieurs utilisateurs peuvent être ajoutés.

```json
[
  {
    "login": "johan@mymail.com",
    "password": "mypassword",
    "userInfos": {
      "id": "johan",
      "fullName": "Johan P",
      "email": "johan@mymail.com",
      "roles": ["admin", "writer"]
    }
  }
]
```

### Etape 3

Cette étape nécessite d'exposer une API web recevant le login et le mot de passe de l'utilisateur.
Voici un exemple de route, écoutant les appels POST sur l'url `/login`.

```typescript
// File src/mod_auth/@routes/login/onPOST.ts

import {JopiRequest, type LoginPassword} from "jopi-rewrite";

export default async function(req: JopiRequest) {
    // `getBodyData` allows getting the data send by the caller.
    const data = await req.getBodyData();
    
    // `tryAuthWithJWT` check the login and password.
    const authResult = await req.tryAuthWithJWT(data as LoginPassword);

    // `authResult.isOk` is true of the login and password are matching.
    //
    if (authResult.isOk) {
        // The framwework will automatically add a cookie
        // to our response, with the JWT token.
        return req.jsonResponse({isOk: true});
    } else {
        return req.jsonResponse({isOk: false});
    }
}
```