FROM node:14.20.1-alpine
WORKDIR app
COPY . .
RUN yarn
EXPOSE 4001
CMD ["yarn","start"]