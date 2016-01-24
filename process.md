class: center, middle

# Basics of Front-End tooling & process

---

# Goals

- Manage external dependencies
- Manage module loading (internal dependencies)
- Drive unit tests
- Build for production


- Preprocessing
- Linting
- IDE/CI integration
- etc.

---

# Node.js

- "Server side" JavaScript
- Built on V8
- Powers the ecosystem

https://nodejs.org/

---
# Npm: Node Package Manager I.

- To manage your build tool dependencies
- And possibly your external library dependencies
- Your app is also a package

package.json:

```
{
  "name": "js_trainging",
  "version": "0.1.0",
  "dependencies": {
    "whatwg-fetch": "^0.10.1"
  },
  "main": "player.js",
   "devDependencies": {
    "babel-cli": "^6.4.0",
    "babel-polyfill": "^6.3.14",
    "babel-preset-es2015": "^6.3.13",
    "ws": "*"
  },
  "scripts": {
    "build": "babel src -d lib --source-maps",
    "watch": "babel src -d lib --source-maps --watch",
    "serve": "ws"
  }
}
```

???

Caret allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple.

---

# Npm II.

package.json continued:
```
```


