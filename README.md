🔧 Loggon Backend
A robust backend application built with NestJS, utilizing TypeORM for database interactions with MySQL. It provides RESTful APIs to support the Loggon frontend.

🚀 Features
NestJS framework for scalable and maintainable server-side applications.

TypeORM for object-relational mapping with MySQL.

RESTful API design for CRUD operations.

Authentication and Authorization mechanisms.

Data Validation using class-validator and class-transformer.

Modular architecture for easy scalability.


📦 Installation
Ensure you have Node.js and MySQL installed.

# Clone the repository
git clone https://github.com/yourusername/loggon-backend.git
cd loggon-backend

# Install dependencies
npm install

# Update/Create .env with your database credentials
Open .env and update it with your local development settings:
Example. 
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_DATABASE=loggon_dev
PORT=3000

# Start the development server
npm run start:dev


# Technologies Used🛠️ 
NestJS

TypeORM

MySQL

TypeScript

class-validator

class-transformer
