# todo-list-app-
This project will cover frontend, backend, database setup, and DevOps concepts.

**Day 1 setup and frontend development plan**

---

## Day 1: 🚀 Setup and Frontend Development

### Step 1: Create a New GitHub Repository 🗂️  
1. Go to **GitHub** and click on the ➕ **icon** in the top-right corner.  
2. Select **"New repository"**.  
3. Name it `todo-list-app` 📝.  
4. Check the box to **Initialize with a README**.  
5. Add a `.gitignore` file for **Node.js** 🛑.  
6. Click on **Create repository** 🎉.

---

### Step 2: Clone the Repository to Your Local Machine 💻

```bash
# Clone the repo locally
git clone https://github.com/your-username/todo-list-app.git

# Move inside the project folder
cd todo-list-app
```

---

### Step 3: Create the Frontend Using HTML, CSS, and JavaScript 🌐  

Create a new file called **`index.html`** in your project directory and **paste the code below** 👇:

---

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beautiful To-Do List ✨</title>

    <style>
        /* 🎨 Styling for the to-do list app */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 300px;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        #todo-form {
            display: flex;
            margin-bottom: 20px;
        }
        #todo-input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
        }
        #add-todo {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        #todo-list {
            list-style-type: none;
            padding: 0;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .todo-item input[type="checkbox"] {
            margin-right: 10px;
        }
        .todo-item .delete {
            margin-left: auto;
            color: #f44336;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 To-Do List</h1>
        <form id="todo-form">
            <input type="text" id="todo-input" placeholder="Add a new task..." required>
            <button type="submit" id="add-todo">Add</button>
        </form>
        <ul id="todo-list"></ul>
    </div>

    <script>
        // 🎯 Getting DOM elements
        const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const todoList = document.getElementById('todo-list');

        // 🛠️ Event listener for adding a new task
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents page refresh
            addTodo();
        });

        // ➕ Function to add a new task to the list
        function addTodo() {
            if (input.value.trim() === '') return; // Ignore empty input

            const li = document.createElement('li'); // Create list item
            li.className = 'todo-item'; // Add class for styling
            li.innerHTML = `
                <input type="checkbox">
                <span>${input.value}</span>
                <span class="delete">&times;</span>
            `;

            // Toggle task completion
            li.querySelector('input').addEventListener('change', toggleTodo);

            // 🗑️ Delete task on click
            li.querySelector('.delete').addEventListener('click', deleteTodo);

            // Add the new task to the list
            todoList.appendChild(li);
            input.value = ''; // Clear input field
        }

        // ✅ Function to mark a task as completed
        function toggleTodo(e) {
            const todoItem = e.target.closest('.todo-item');
            todoItem.classList.toggle('completed'); // Toggle 'completed' class
        }

        // 🗑️ Function to delete a task from the list
        function deleteTodo(e) {
            const todoItem = e.target.closest('.todo-item');
            todoItem.remove(); // Remove task from the list
        }
    </script>
</body>
</html>
```

---

### Step 4: Commit and Push Your Changes to GitHub 🔄  

1. Add the file to the Git staging area:

```bash
git add index.html
```

2. Commit the changes with a descriptive message 📦:

```bash
git commit -m "Add frontend for to-do list application"
```

3. Push the changes to your **GitHub repository**:

```bash
git push origin main
```

---

### 🎉 Congratulations!  
You now have a **beautiful frontend** for your **to-do list application**! 


---

# 🚀 Day 2: Backend Development and Database Setup

### **1️⃣ Initialize Node.js Project:**

```bash
npm init -y
```
> 🎯 This command creates a `package.json` file to manage your project dependencies.

---

### **2️⃣ Install Required Dependencies:**

```bash
npm install express cors mongoose dotenv
npm install --save-dev nodemon
```

- **Express**: Handles HTTP requests and routing. 🛤️  
- **CORS**: Allows cross-origin requests (from frontend to backend). 🌐  
- **Mongoose**: Connects MongoDB with Node.js via schema-based models. 🗃️  
- **dotenv**: Manages environment variables securely. 🛡️  
- **Nodemon** (dev dependency): Auto-restarts the server when files change. 🔄

---

### **3️⃣ Create `.env` File to Store Environment Variables:**  
_(In the root directory)_  

```env
MONGODB_URI=mongodb://localhost:27017/todo-list
PORT=5000
```
> 🛡️ This helps manage sensitive data like the database URI and port number.

---

### **4️⃣ Backend Code – Create `server.js`:**  

Create a **`server.js`** file in the root directory, and paste the following code:

```javascript
const express = require('express'); // 🌐 Express setup
const mongoose = require('mongoose'); // 🗃️ MongoDB connection
const cors = require('cors'); // 🌍 Allow cross-origin requests
require('dotenv').config(); // 🔒 Manage environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // 🌐 Allow frontend-backend communication
app.use(express.json()); // 📝 Parse incoming JSON requests

// 🔌 Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 📋 Define the Todo schema and model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// 🚀 API Endpoints

// 📝 GET: Fetch all todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ➕ POST: Add a new todo
app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

// ✅ PUT: Update a todo's status
app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

// ❌ DELETE: Remove a todo
app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

// 🔊 Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
```

---

### **5️⃣ Update `package.json` with Start Scripts:**  

Modify your `package.json` file to add the following scripts:  

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

- **`start`**: Starts the server using Node.js. 🚀  
- **`dev`**: Uses `nodemon` to restart the server on file changes. 🔄  

---

### **6️⃣ Install MongoDB:**  

Make sure you have **MongoDB** installed and running. If not, you can:  
- **Install MongoDB locally**: [Official MongoDB Installation](https://www.mongodb.com/docs/manual/installation/) 🛠️  
- **Use MongoDB Atlas** (Cloud solution): [Set up MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ☁️  

---

### **7️⃣ Update Frontend to Connect with Backend:**  

Make some small changes in your **`index.html`** to interact with the backend API:

```html
<script>
    const apiUrl = 'http://localhost:5000/api/todos'; // 🛠️ Backend API URL

    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newTodo = { text: input.value };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });
        const todo = await response.json();
        renderTodo(todo);
        input.value = '';
    });

    async function fetchTodos() {
        const response = await fetch(apiUrl);
        const todos = await response.json();
        todos.forEach(renderTodo);
    }

    function renderTodo(todo) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <span class="delete">&times;</span>
        `;

        li.querySelector('input').addEventListener('change', async () => {
            await fetch(`${apiUrl}/${todo._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todo.completed }),
            });
        });

        li.querySelector('.delete').addEventListener('click', async () => {
            await fetch(`${apiUrl}/${todo._id}`, { method: 'DELETE' });
            li.remove();
        });

        todoList.appendChild(li);
    }

    fetchTodos(); // 📝 Fetch existing todos on page load
</script>
```

---

### **8️⃣ Commit and Push Your Changes:**  

```bash
git add server.js package.json package-lock.json index.html .env
git commit -m "✨ Add backend API and update frontend to interact with API"
git push origin main
```

---

### **9️⃣ Verify Everything Works:**  

1. Start MongoDB locally:
   ```bash
   mongod
   ```

2. Start the backend server:
   ```bash
   npm run dev
   ```

3. Open **`index.html`** in your browser and try adding, updating, and deleting tasks. 🎯

---

### **🚀 Success!**  
You now have a **full-stack to-do list application** with a MongoDB database! 🎉

---

### 🌟 **Day 3: Dockerization and Preparation for Deployment** 🚀

Let’s make your to-do list app portable by containerizing it with Docker! 🐳

---

### 1️⃣ **Create a Dockerfile** 📄

Add the following content to your `Dockerfile` in the root directory:

```dockerfile
# To-Do List Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

---

### 2️⃣ **Create a .dockerignore File** 🚫

Prevent unnecessary files from being added to the Docker image. Create a `.dockerignore` file:

```bash
# .dockerignore
node_modules
npm-debug.log
```

---

### 3️⃣ **Create a docker-compose.yml File** 📦

Add this to the `docker-compose.yml` to orchestrate your Node.js app and MongoDB services:

```yaml
# To-Do List Docker Compose
version: '3'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/todo-list
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

### 4️⃣ **Build and Run Your Docker Containers** 🏗️

Open your terminal and run the following command to build and start your containers:

```bash
docker-compose up --build
```

This will:  
⚙️ Build the Node.js app and MongoDB containers.  
🔄 Map ports `5000` and `27017` from the containers to your host machine.

---

### 5️⃣ **Commit and Push Changes to GitHub** 📂

Keep everything organized by committing the changes:

```bash
git add Dockerfile .dockerignore docker-compose.yml
git commit -m "Add Docker configuration"
git push origin main
```

---

🎉 **Now your application is Dockerized!** Ready to run anywhere with just a few commands! 🐳 

