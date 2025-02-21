FROM node:23-alpine

ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

WORKDIR /app

COPY package*.json ./
RUN touch tester
RUN echo $NEXT_PUBLIC_API_BASE_URL >> tester
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]