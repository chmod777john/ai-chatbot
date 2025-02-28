docker run --name my_postgres  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

node lib/db/migrate.ts 

 
export OLLAMA_HOST=127.0.0.1:6006

ollama serve

ollama run deepseek-r1:32b



