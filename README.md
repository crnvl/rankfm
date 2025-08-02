<center>
  <h1>RankFM</h1>
  <p>A modern music ranking application built with Next.js and Tailwind CSS.</p>
</center>

## Features
- **Modern UI**: Built with Next.js and Tailwind CSS for a responsive design.
- **Drizzle ORM**: Utilizes Drizzle ORM for efficient database interactions.
- **PostgreSQL**: Uses PostgreSQL for robust data storage.
- **Docker Support**: Easily deployable with Docker.

## Docker-Compose
To run the application with Docker, create a `docker-compose.yml` file in the root directory with the following content:

```yaml
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

and run:

```bash
docker-compose up
```
