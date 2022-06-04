FROM node:17.7.2

LABEL version="1.0"
LABEL description="This is the base docker image for the Test Assignment backend API."
LABEL maintainer = ["milosavljevic.viktor@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
