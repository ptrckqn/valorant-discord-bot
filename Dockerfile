FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt-get install ffmpeg

COPY . .

CMD ["npm", "run", "dev"]