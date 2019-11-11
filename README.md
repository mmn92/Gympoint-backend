# GymPoint

This is a back-end application made to manage a gym registration system.

## Routes

### Admin-only routes (needs authentication):

- `POST` `/sessions` : Creates a new session after authenticating the admin via jwt

- `GET` `/users` : Lists all the admins registered

- `GET` `/students/:id` : Shows the information of the student registered with the id in the parameters

- `GET` `/plans` : Lists all the plans offered by the gym

- `GET` `/registrations` : Lists all the registrations made by students

- `GET` `/help-orders` : Lists all the unanswered help orders opened by students

- `POST` `/users` : Registers a new admin

- `POST` `/students` : Registers a new student

- `POST` `/plans` : Registers a new plan

- `POST` `/registrations` : Registers a student with a plan

- `POST` `/help-orders/:id/answer` : Answers a help order opened by a student

- `PUT` `/students/:id` : Updates the information of specified student

- `PUT` `/plans/:id` : Updates information of specified plan

- `PUT` `/registrations/:id` : Updates the registration of a student

- `DELETE` `/plans/:id` : Deletes a plan

- `DELETE` `/registrations/:id` : Cancels an active registration

### Students routes:

- `GET` `/students/:id/checkins` : Lists all checkins of a specific student

- `GET` `/students/:id/help-orders` : Lists all help orders (answered and unanswered) opened by a specific student

- `POST` `/students/:id/checkins` : Registers a new checkin of the student

- `POST` `/students/:id/help-orders` : Opens a new help order for the student

### Tools used:

- Node.js
- Express
- Mongoose
- MongoDB
- Sequelize
- Postgres
- Nodemailer
- Handlebars
- Sucrase
- Nodemon
- ESLint
- Prettier
- JWT
- Yup

This application is part of a bigger project involving front-end and mobile
