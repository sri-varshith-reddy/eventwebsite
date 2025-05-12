🎓 College Event Management System




🚀 Project Overview
College Event Management System is a full-stack web application built to streamline the creation and registration of campus events. It allows any logged-in user to create, edit, or delete events, as well as view and register for them. The project is developed using MVC architecture and RESTful APIs, ensuring modularity, scalability, and ease of maintenance.

✨ Features
🔐 User Authentication: Signup and login system for secure access.

🗓️ Event Management: Users can create, edit, and delete events.

📝 Registration System: Students can register for events.

📱 Responsive Design: Works seamlessly across mobile and desktop devices.

📁 MVC Architecture: Organized code structure for better maintainability.

🌐 RESTful API: Follows RESTful routes for backend communication.

🛠️ Tech Stack
Frontend:
HTML, CSS, JavaScript

Bootstrap

EJS (Embedded JavaScript Templates)

Backend:
Node.js

Express.js

MongoDB (with Mongoose)

express-session for session-based authentication

📂 Folder Structure
bash
Copy
Edit
college-event-management/

├── controllers/     # Request-handling logic

├── models/          # Mongoose schemas

├── routes/          # RESTful route handlers

├── views/           # EJS templates for UI

├── public/          # Static files (CSS, JS, Images)

├── app.js           # Main application entry point

├── .env             # Environment variables

├── package.json     # Project metadata and dependencies


⚙️ Installation
Prerequisites:
Node.js and npm installed

MongoDB running (locally or via MongoDB Atlas)

Steps:
Clone the repository:

bash
Copy
Edit
git clone <repo-link>
cd college-event-management
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:

bash
Copy
Edit
touch .env
Add the following configuration:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
Start the application:

bash
Copy
Edit
npm start
Access the app in your browser:
http://localhost:3000

👨‍💻 Author


Srivarshith
📧 Email: yellusrivarshith@gmail.com
📱 Phone: +91 9392840517

