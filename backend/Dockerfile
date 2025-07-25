FROM node:18

WORKDIR /app

# Copy only package.json and lock first
COPY package*.json ./

# Install node_modules *dalam Docker*
RUN npm install

# Baru copy source code (tanpa node_modules)
COPY . .

CMD ["npm", "run", "dev"]
