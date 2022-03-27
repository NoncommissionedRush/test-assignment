FROM node:alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the Test Assignment backend API."
LABEL maintainer = ["milosavljevic.viktor@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]