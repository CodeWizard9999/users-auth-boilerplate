FROM node:20.12.1
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start:dev"]