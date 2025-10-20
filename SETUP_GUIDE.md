# Pet Adoption System - Complete Setup Guide

This guide will help you set up and run the complete Pet Adoption System with both frontend and backend.

## Prerequisites

Before starting, make sure you have the following installed:

1. **Java 17 or higher**
   - Download from: https://adoptium.net/
   - Verify installation: `java -version`

2. **Maven 3.6 or higher**
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -version`

3. **Node.js 16 or higher**
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

4. **MySQL 8.0 or higher**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Install and start MySQL service

## Database Setup

### Step 1: Create Database and User

1. Open MySQL command line or MySQL Workbench
2. Run the following commands:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS pet_adoption_db;

-- Create user (optional, you can use root)
CREATE USER 'petuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON pet_adoption_db.* TO 'petuser'@'localhost';
FLUSH PRIVILEGES;
```

### Step 2: Run Database Setup Script

1. Navigate to the backend directory
2. Run the SQL script:

```bash
cd backend
mysql -u root -p < database_setup.sql
```

Or if you created a user:
```bash
mysql -u petuser -p < database_setup.sql
```

### Step 3: Update Database Configuration (if needed)

If you're using different credentials, update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Build and Run

**Option A: Using Maven directly**
```bash
mvn clean install
mvn spring-boot:run
```

**Option B: Using the provided script (Windows)**
```bash
# From the root directory
start_backend.bat
```

**Option C: Using JAR file**
```bash
mvn clean package
java -jar target/pet-adoption-system-0.0.1-SNAPSHOT.jar
```

The backend will start on `http://localhost:3000`

## Frontend Setup

### Step 1: Navigate to Root Directory

```bash
# Make sure you're in the root directory (not in backend)
cd ..
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Frontend

**Option A: Using npm directly**
```bash
npm start
```

**Option B: Using the provided script (Windows)**
```bash
start_frontend.bat
```

The frontend will start on `http://localhost:3001`

## Running the Complete Application

### Method 1: Manual Start (Recommended for Development)

1. **Start Backend First:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Wait for "Started PetAdoptionSystemApplication" message

2. **Start Frontend (in a new terminal):**
   ```bash
   npm start
   ```

### Method 2: Using Scripts (Windows)

1. Double-click `start_backend.bat` to start the backend
2. Double-click `start_frontend.bat` to start the frontend

## Verification

1. **Backend API:** Visit `http://localhost:3000/api/pets` - you should see JSON data
2. **Frontend:** Visit `http://localhost:3001` - you should see the Pet Adoption System UI

## Troubleshooting

### Common Issues

1. **Port Already in Use:**
   - Backend (3000): Change port in `backend/src/main/resources/application.properties`
   - Frontend (3001): React will ask to use a different port

2. **Database Connection Error:**
   - Check MySQL is running
   - Verify credentials in `application.properties`
   - Ensure database exists

3. **CORS Errors:**
   - Make sure backend is running before frontend
   - Check CORS configuration in `CorsConfig.java`

4. **Maven Build Fails:**
   - Check Java version: `java -version`
   - Check Maven version: `mvn -version`
   - Try: `mvn clean install -U`

5. **npm install Fails:**
   - Check Node.js version: `node --version`
   - Try: `npm cache clean --force`
   - Delete `node_modules` and run `npm install` again

### Logs

- **Backend logs:** Check console output where you ran `mvn spring-boot:run`
- **Frontend logs:** Check browser console (F12) and terminal where you ran `npm start`

## API Endpoints

Once running, you can test these endpoints:

### Adopters
- `GET http://localhost:3000/api/adopters` - Get all adopters
- `POST http://localhost:3000/api/adopters` - Create adopter
- `PUT http://localhost:3000/api/adopters/{id}` - Update adopter
- `DELETE http://localhost:3000/api/adopters/{id}` - Delete adopter

### Pets
- `GET http://localhost:3000/api/pets` - Get all pets
- `POST http://localhost:3000/api/pets` - Create pet
- `PUT http://localhost:3000/api/pets/{id}` - Update pet
- `DELETE http://localhost:3000/api/pets/{id}` - Delete pet

## Features

- ✅ Pet management (CRUD operations)
- ✅ Adopter management (CRUD operations)
- ✅ Pet adoption workflow
- ✅ Search functionality
- ✅ Real-time data persistence
- ✅ Responsive UI
- ✅ Error handling
- ✅ Input validation

## Project Structure

```
dbms-mini-project/
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/com/petadoption/
│   │   ├── entity/         # JPA Entities
│   │   ├── repository/     # Data Repositories
│   │   ├── service/        # Business Logic
│   │   ├── controller/     # REST Controllers
│   │   └── config/         # Configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── database_setup.sql  # Database schema
│   └── pom.xml
├── src/                    # React Frontend
│   ├── components/         # React Components
│   ├── api/               # API Service
│   └── App.js
├── start_backend.bat      # Backend startup script
├── start_frontend.bat     # Frontend startup script
└── SETUP_GUIDE.md         # This file
```

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed correctly
3. Check console logs for error messages
4. Ensure both backend and frontend are running on correct ports
5. Verify database connection and data

The application should work seamlessly once all components are properly set up!
