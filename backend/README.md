# Pet Adoption System - Backend

This is the backend API for the Pet Adoption System built with Spring Boot and MySQL.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup Instructions

### 1. Database Setup

1. Install MySQL and start the service
2. Create a database user (optional, you can use root):
   ```sql
   CREATE USER 'petuser'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON pet_adoption_db.* TO 'petuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. Run the database setup script:
   ```bash
   mysql -u root -p < database_setup.sql
   ```

### 2. Configuration

Update the database credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Run the Application

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run

# Or build and run
mvn clean package
java -jar target/pet-adoption-system-0.0.1-SNAPSHOT.jar
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Adopters
- `GET /api/adopters` - Get all adopters
- `GET /api/adopters/{id}` - Get adopter by ID
- `POST /api/adopters` - Create new adopter
- `PUT /api/adopters/{id}` - Update adopter
- `DELETE /api/adopters/{id}` - Delete adopter
- `GET /api/adopters/search?name={name}` - Search adopters by name
- `GET /api/adopters/search?contact={contact}` - Search adopters by contact

### Pets
- `GET /api/pets` - Get all pets
- `GET /api/pets/{id}` - Get pet by ID
- `POST /api/pets` - Create new pet
- `PUT /api/pets/{id}` - Update pet
- `DELETE /api/pets/{id}` - Delete pet
- `GET /api/pets/adopted/{adopted}` - Get pets by adoption status
- `GET /api/pets/type/{type}` - Get pets by type
- `GET /api/pets/search?name={name}` - Search pets by name
- `GET /api/pets/search?breed={breed}` - Search pets by breed
- `GET /api/pets/search?type={type}` - Search pets by type
- `GET /api/pets/search?adopted={adopted}` - Search pets by adoption status
- `POST /api/pets/{petId}/adopt/{adopterId}` - Adopt a pet
- `POST /api/pets/{petId}/unadopt` - Unadopt a pet

## Database Schema

### Adopters Table
- `id` - Primary key (BIGINT, AUTO_INCREMENT)
- `name` - Adopter name (VARCHAR(100), NOT NULL)
- `contact` - Contact information (VARCHAR(50), NOT NULL)
- `address` - Address (VARCHAR(255), NOT NULL)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Pets Table
- `id` - Primary key (BIGINT, AUTO_INCREMENT)
- `name` - Pet name (VARCHAR(100), NOT NULL)
- `type` - Pet type (VARCHAR(50), NOT NULL)
- `breed` - Pet breed (VARCHAR(100), NOT NULL)
- `adopted` - Adoption status (BOOLEAN, DEFAULT FALSE)
- `breedable` - Breeding capability (BOOLEAN, DEFAULT FALSE)
- `diseases` - Health information (VARCHAR(255))
- `adopter_id` - Foreign key to adopters table
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Features

- RESTful API with proper HTTP status codes
- Input validation using Bean Validation
- CORS configuration for frontend integration
- JPA/Hibernate for database operations
- Transaction management
- Error handling
- Search functionality
- Pet adoption/unadoption workflow
