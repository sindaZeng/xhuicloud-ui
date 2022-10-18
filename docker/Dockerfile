FROM nginx 

COPY ./dist /data 

RUN rm /etc/nginx/conf.d/default.conf

ADD xhuicloud-ui.conf /etc/nginx/conf.d/default.conf 

RUN ["echo","xhuicloud-ui run success ..."]