FROM node:17.7.2

LABEL version="1.0"
LABEL description="This is the base docker image for the Test Assignment frontend react app."
LABEL maintainer = ["milosavljevic.viktor@gmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
