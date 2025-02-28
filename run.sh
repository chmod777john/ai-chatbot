docker run --name my_postgres  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

node lib/db/migrate.ts 

 
