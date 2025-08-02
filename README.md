# Docker
```yml
services:
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: rankfm
      POSTGRES_PASSWORD: rankfm
      POSTGRES_DB: rankfm
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

  rankfm:
    image: ghcr.io/crnvl/rankfm:latest
    environment:
      DATABASE_URL: postgres://rankfm:rankfm@db:5432/rankfm
      LASTFM_API_KEY: 
    depends_on:
      - db
    ports:
      - "3000:3000"

volumes:
  db_data:
```