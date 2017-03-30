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

- Npm has a simple task tunner too

```bash
$ git clone https://github.com/tisztamo/js-training
$ cd js-training/
$ npm update
$ npm run build
$ npm run serve
```

---

# Client side dependency management with Npm.

```bash
$ npm install jquery --save-dev
```

```
"dependencies": {
  "whatwg-fetch": "^0.10.1",
  "jquery": "^2.2.0"
}
```

```html
<script src="/node_modules/jquery/dist/jquery.min.js"></script>
```

In a build step, copy out the needed files to a `lib` directory.

Alternative: [Bower](http://bower.io/). No copy needed, but yet another tool and has problems with the flat structure.

---

# Module loading & packaging with webpack I

```bash
npm install webpack webpack-dev-server --save-dev
```

```
<script type="text/javascript" src="bundle.js" charset="utf-8"></script>
```

package.json:

```
{
...
  "scripts": {
    "build": "webpack --devtool sourcemap",
    "watch": "webpack-dev-server --progress --colors --devtool sourcemap"
  },
  "devDependencies": {
    "webpack": "^1.12.12",
    "webpack-dev-server": "^1.14.1"
  }
}
```

---

# Module loading & packaging with webpack II

webpack.config.js:

```
module.exports = {
  entry: "./example.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  }
};
```


---

# Linting with jshint

```bash
$ npm install --save-dev jshint
```

.jshintrc:
```
{
  "browser": true,
  "devel": true,
  "esnext": true,
  "globalstrict": true,
  "undef": true,
  "unused": true,
  "predef": ["fetch",
             "remark",
             "QUnit"
             ]
}
```

```bash
$ jshint src/player.js
src/player.js: line 22, col 11, 'slideshow' is defined but never used.

1 error
```
---
class: center, middle

# Lab: Loading CommonJS modules with Webpack

