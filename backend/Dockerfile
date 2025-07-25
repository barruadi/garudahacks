# Gunakan base image Node.js
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Salin file project ke dalam container
COPY . .

# Install dependencies
RUN npm install

# Jalankan aplikasi
CMD ["npm", "run", "dev"]
