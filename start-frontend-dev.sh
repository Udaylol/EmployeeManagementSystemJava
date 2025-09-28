#!/bin/bash
echo "Starting EMS Frontend with Nodemon..."
echo ""
echo "This will:"
echo "1. Install dependencies (if needed)"
echo "2. Start the React app with nodemon for auto-reload"
echo "3. The app will be available at http://localhost:3000"
echo ""
echo "Make sure your Spring Boot backend is running on port 8080"
echo ""
read -p "Press Enter to continue..."
cd frontend
npm install
npm run dev
