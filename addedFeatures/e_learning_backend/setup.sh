# !/bin/bash


docker-compose -f docker-compose-pg-only.yml up -d;
npm install -g yarn;
yarn;
yarn prisma migrate dev;
yarn start:dev;