FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite expects build output in 'dist' folder, not 'build'
RUN npm run build

# Use 'serve' to serve static files
RUN npm install -g serve

# Serve the Vite dist folder on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
