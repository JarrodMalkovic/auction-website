FROM node:alpine
ENV CI=true
 
WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]