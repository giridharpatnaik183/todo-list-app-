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
