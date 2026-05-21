FROM node:20.19.0-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies. Using `npm install` here (instead of `npm ci`)
# makes the build tolerant to a package-lock mismatch introduced during
# development (e.g. adding `express` after the lock was created).
# If you prefer strict reproducible builds, run `npm install` locally and
# commit the updated `package-lock.json`, then switch back to `npm ci`.
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]