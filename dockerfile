# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# copy dependency manifests first (for caching)
COPY package.json package-lock.json ./

RUN npm install

# copy source
COPY . .

RUN npm run build


# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]