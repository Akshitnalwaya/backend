Nodemon is a utility tool for Node.js development that:

- Monitors your project files for any changes  
- Automatically restarts your Node.js application when changes are detected  
- Eliminates the need to manually restart the server after code modifications  
- Improves development workflow efficiency  

---

## Installation

```bash
# local project installation
npm install nodemon --save-dev

# global installation
npm install -g nodemon
Usage
bash
Copy
Edit
# instead of:
node index.js

# use:
nodemon index.js

# Key Concepts for Connecting to a Database

Connecting to a database is a critical part of application development. To ensure reliability, scalability, and maintainability, several key concepts and best practices must be followed.

---

## 1. Proper Error Handling
- **Always** wrap database connection logic inside a `try...catch` block.
- This ensures that any runtime errors are gracefully caught and logged without crashing the application.

## 2. Asynchronous Connection Handling
- Database operations are **asynchronous** by nature.
- Always use the `async` and `await` keywords to handle connection promises properly.
- This prevents race conditions and ensures smooth flow of execution.

## 3. Retry Strategy
- Sometimes connections fail due to transient network issues.
- Implement a retry mechanism that attempts to reconnect a few times before giving up.

## 4. Timeout Management
- Always set connection timeouts.
- This avoids the application hanging indefinitely in case the database server is unreachable.

## 5. Separation of Concerns
- Keep your database connection logic **in a separate file** (e.g., `db.js` or `database.js`).
- This improves code modularity, readability, and makes testing easier.

---

# Example: Robust MongoDB Connection (Node.js + Mongoose)

```javascript
// db.js
const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 5000) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    if (retries > 0) {
      console.log(`🔄 Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      console.error('🚨 All retries exhausted. Exiting process.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
