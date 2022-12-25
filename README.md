# React SSR

React Typescript Mobx Server Side Rendering Application

##### Stack:
  - Typescript
  - React
  - Styled Components
  - Vite
  - Vite SSR

### Installation
```sh
$ git clone https://github.com/epifanovmd/react-ssr.git
$ cd react-ssr
$ yarn
```

### Run
```sh
$ yarn prod
```
```sh
Application listening on: http://localhost:3000
```

### Start app in docker container (with Server Side Rendering)
```sh
$ docker build -f Dockerfile -t lending_ssr:latest .
$ [[ $(docker ps -f name=lending_ssr_container -q -a) != '' ]] && docker rm --force $(docker ps -f name=lending_ssr_container -q -a)
$ docker run -u root -d --restart=always --network server-net -p 8083:3000 --name lending_ssr_container lending_ssr:latest
$ docker image prune -a --force
```

```sh
Application listening on: http://localhost:8080
```

License
----

MIT

**Free Software, Good Work!**
