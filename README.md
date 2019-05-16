# Potential-Enigma

## Development with Docker

Install & start docker container(s) :

```Shell Session
make install
```

Need help with `make` ?

```Shell Session
make help
```

### Database table creation

Starting containers will automatically create tables.

## JS Project

```Shell Session
# install dependencies
yarn

# development server
yarn start

# build for production
yarn build
```

### Using Eslint & Prettier

With VSCode, put this config in `.vscode/settings.json`

```json
{
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
  "editor.formatOnSave": true
}
```
