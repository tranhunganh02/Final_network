FROM mysql:latest

COPY db.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=Tha@021103
ENV MYSQL_DATABASE=docker

EXPOSE 3306

CMD ["mysqld"]
