FROM node:16.0.0 as builder
ENV BASEDIR=/usr/src/app
WORKDIR $BASEDIR/

COPY . .
#RUN rm -rf build
RUN mv .env.production .env
RUN npm install
RUN npm run build

FROM nginx:latest
ENV BASEDIR=/usr/src/app
WORKDIR $BASEDIR/
COPY --from=builder $BASEDIR/build $BASEDIR
COPY --from=builder $BASEDIR/default.conf /etc/nginx/conf.d/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

