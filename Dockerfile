FROM nginx

LABEL name="mahy50"
LABEL email="934037783@qq.com"

# 删除默认nginx配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加自定义nginx配置
ADD ./config/default.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/

ENV VIRTUAL_HOST=pinterest.mahaoyuan.com

EXPOSE 8080
