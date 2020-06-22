Para iniciar o projeto backEnd é necesario um banco de dados mysql.


Segue as configurações de conexão da aplicação Java:

```
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.url=jdbc:mysql://localhost:3306/react?createDatabaseIfNotExist=true
spring.jpa.hibernate.ddl-auto=update
```


Uma opção simples é usar um imagem do docker rodar o mysql-server.
```sh
 docker run --name mysql1 -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=homedb -p 3306:3306 -d mysql/mysql-server:5.7 
```

Para o funcionamento da aplicação web é necessario inicar um aplicação java para o backEnd. 
```sh
java -jar cdcreact-1.0.0-SNAPSHOT.jar
```
