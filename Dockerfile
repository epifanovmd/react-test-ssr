ARG NODE_VERSION=16.14.2

FROM node:${NODE_VERSION}

WORKDIR .
COPY . ./react-ssr

WORKDIR ./react-ssr

RUN yarn
RUN yarn build

EXPOSE 3000
CMD ["npm", "run", "prod"]
