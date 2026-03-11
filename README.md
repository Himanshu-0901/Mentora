# Mentora Backend

A backend Architecture.


## Tech Stack
- Backend: Node.js + Express.js  
- Database: MongoDB 
- Language: JavaScript  
- Architecture: Modular (routes, controllers, models)  



## Installation


###  1. Clone the repo
```bash
git clone https://github.com/Himanshu-0901/Mentora.git
cd URLShortener
```
### 2. Setup Backend
```bash
cd Backend
npm install
```
#### Create .env file in backend/:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/mentora
JWT_SECRET=your-secret-key
NODE_ENV = development
OPENAI_API_KEY = your-openai-api-key
```
### 3. Run Backend
```bash
cd backend
npm run dev
```
### 4. Test from the postman
