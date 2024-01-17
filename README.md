## Dorm laundry booking system

### Addressed problems:
- Many dormitories have a limited number of washing and drying machines, and without a booking system, students often struggle to find available machines (for example in Żaczek there are around 10 washing machines)
- Now students can only book machines when they/their friends are in dorm which is inconvenient  
- It’s common that when students want to use machine it turns out that it doesn’t work and issue wasn’t reported to dormitory staff
### Features:
1. Facility Management:
 - Provide dormitory staff with an admin dashboard to manage and monitor the laundry booking system.
 - Enable staff members to manage laundry facilities.
 - View and resolve issues with machines.	
2. Booking Management:
 - Allow users to book laundry machines in advance, specifying the date and time they plan to use the machines.
 - Provide options to view and cancel bookings.
3. Notifications:
 - Send email to students to remind them of their upcoming laundry bookings.
 - Send email to dormitory staff about reported machines issues.
4. Machine Status and Alerts
 - Monitor the status of machines (e.g., in use, available, out of order).

### Project setup instructions:
The application is fully containerized using Docker.

1. Install Docker:
  - Before starting, make sure Docker is installed on your computer. You can download it from the Docker website and install it by following the instructions.
2. Navigate to the project folder using the command cd <path_to_project>.
3. Execute docker-compose up command (optionally with the -d flag if you want the command to run in the background).
  - Docker Compose will start building and running the environment described in the docker-compose.yml file.
  - Wait until the process is complete. During this process, Docker will download and configure all necessary dependencies.
4. Open the application:
  - After the process is finished, open a web browser and enter the address localhost:3000.
5. Log in or create an account in the application.

### Technologies:
  - backend - Java + Spring Boot,
  - frontend - Typescript + React
  - database - MS SQL Server
  - Docker

