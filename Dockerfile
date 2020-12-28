# STEP 1

FROM node:10 as build-step

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

#Create the working directory
RUN mkdir -p /home/node/app

# Set the owner of directory (node user)
RUN chown node:node /home/node/app

# Set the working directory.
WORKDIR /home/node/app

#Install Typescript
RUN npm install -g typescript

# Copy the file from your host to your current location.
COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

#Installing app dependencies
RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY --chown=node:node . .

CMD ["yarn", "build"]

# STEP 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /home/node/app/build /usr/share/nginx/html