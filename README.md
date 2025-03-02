# Question Generator

## Project Overview
The Question Generator is a web application developed to automate the creation of question papers for college exams at TCET. The app generates three unique sets of question papers from an uploaded question bank, streamlining the manual process for teachers and ensuring balanced question selection.

## Key Features
- **Automated Paper Generation:** Generates 3 sets of question papers for each exam (20/60 marks).
- **Custom Algorithm:** Developed a custom algorithm for balanced and non-repetitive question selection.
- **User-Friendly Interface:** Allows teachers to upload question banks and view generated question papers.

  ![Screenshot 2024-06-13 203158](https://github.com/user-attachments/assets/8eae854b-e28b-4cba-b8b3-0d2a3f51f0d9)

## Tech Stack
- **Frontend:** React.js, HTML, CSS, Bootstrap, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Project Structure
- `/frontend`: Contains the React.js application.
- `/backend`: Node.js API for question management and paper generation.
- `/algorithm`: Custom algorithm for balanced question selection.

## How It Works
1. Teacher uploads a question bank via the web interface.
2. Backend processes the questions and runs the custom algorithm.
3. Three sets of question papers are generated and displayed.

## Installation
```bash
# Clone the repository
git clone [repository_url]

# Navigate to project directory
cd qs_generator

# Install backend dependencies
cd server
npm install

# Start backend server
npm start

# Install frontend dependencies
cd ../client
npm install

# Start frontend server
npm start
```

## Usage
- Navigate to `http://localhost:3000`.
- Upload the question bank Excel file.
- View and download the generated question papers.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.
