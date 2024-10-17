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

---

### 🌟 **Day 4: Deployment to AWS** ☁️

Let’s take your Dockerized to-do list app and deploy it on **AWS** using **ECS** and an **Application Load Balancer**! 🚀

---

### 1️⃣ **Sign Up for an AWS Account** 🆕 

If you haven't done so already, sign up for an [AWS account](https://aws.amazon.com/).

---

### 2️⃣ **Install the AWS CLI** 💻

Make sure you have the **AWS CLI** installed. Configure it with your AWS credentials:

```bash
aws configure
```

---

### 3️⃣ **Create an ECR Repository** 📦

Run the following command to create a repository for your Docker image:

```bash
aws ecr create-repository --repository-name todo-list-app
```

---

### 4️⃣ **Build and Push Your Docker Image to ECR** 📤

Authenticate Docker to your ECR registry:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.us-east-1.amazonaws.com
```

Next, build your Docker image:

```bash
docker build -t todo-list-app .
```

Tag the image for ECR:

```bash
docker tag todo-list-app:latest <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-list-app:latest
```

Finally, push the image to your ECR repository:

```bash
docker push <your-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-list-app:latest
```

---

### 5️⃣ **Create an ECS Cluster** 🌐

Create an ECS cluster to run your application:

```bash
aws ecs create-cluster --cluster-name todo-list-cluster
```

---

### 6️⃣ **Create a Task Definition** 📜

Create a `task-definition.json` file with the following content:

```json
{
  "family": "todo-list-task",
  "containerDefinitions": [
    {
      "name": "todo-list-app",
      "image": "<your-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-list-app:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "MONGODB_URI",
          "value": "mongodb://<your-mongodb-url>:27017/todo-list"
        }
      ],
      "essential": true,
      "memory": 512,
      "cpu": 256
    }
  ],
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "networkMode": "awsvpc",
  "memory": "512",
  "cpu": "256"
}
```

---

### 7️⃣ **Register the Task Definition** ✔️

Register your task definition with ECS:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

---

### 8️⃣ **Create an ECS Service** ⚙️

Create a service to run your task:

```bash
aws ecs create-service --cluster todo-list-cluster --service-name todo-list-service --task-definition todo-list-task:1 --desired-count 1 --launch-type FARGATE --network-configuration "awsvpcConfiguration={subnets=[<subnet-id>],securityGroups=[<security-group-id>],assignPublicIp=ENABLED}"
```

**🔄 Replace `<subnet-id>` and `<security-group-id>`** with your VPC configuration values.

---

### 9️⃣ **Set Up an Application Load Balancer (ALB)** ⚖️

1. Go to the **EC2 dashboard** in the AWS console.
2. Create a new **Application Load Balancer**.
3. Configure listeners and routing to your ECS service.

---

### 🔟 **Update Your ECS Service to Use the ALB** 🔄

Link your ECS service to the ALB:

```bash
aws ecs update-service --cluster todo-list-cluster --service todo-list-service --load-balancers "targetGroupArn=<target-group-arn>,containerName=todo-list-app,containerPort=5000"
```

**🔄 Replace `<target-group-arn>`** with the ARN of the target group you created for your ALB.

---

### 1️⃣1️⃣ **Update Your Frontend Configuration** ⚙️

Update the `index.html` in your frontend code to use the ALB URL instead of localhost:

```javascript
// Replace
const API_URL = 'http://localhost:5000/api'; 
// With
const API_URL = 'http://<your-alb-url>/api';
```

---

### 1️⃣2️⃣ **Commit and Push Your Changes** 📂

Keep your repository up to date by committing the changes:

```bash
git add task-definition.json index.html
git commit -m "Update configuration for AWS deployment"
git push origin main
```

---

🎉 **Congratulations! Your application is now deployed on AWS using ECS** and can be accessed through the Application Load Balancer URL! 🌐✨

### 🚀 **Day 5: Setting Up CI/CD with Jenkins** 🔧

Today, we’ll set up a **Continuous Integration/Continuous Deployment (CI/CD)** pipeline for your to-do list application using **Jenkins**. This will automate the building, pushing, and deployment of your application to **AWS**! 🌐✨

---

### 1️⃣ **Set Up a Jenkins Server** 🖥️

1. **Launch an EC2 Instance**:
   - Log in to your AWS console and launch a new EC2 instance. Choose an appropriate instance type (e.g., t2.micro for testing).

2. **Install Jenkins**:
   - SSH into your EC2 instance and run the following commands to install Jenkins:

   ```bash
   sudo apt update
   sudo apt install openjdk-11-jdk
   sudo apt install wget
   wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
   sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
   sudo apt update
   sudo apt install jenkins
   ```

3. **Start Jenkins**:
   - Start the Jenkins service:

   ```bash
   sudo systemctl start jenkins
   ```

4. **Configure Security Groups**:
   - Modify the security group of your EC2 instance to allow incoming traffic on **port 8080** (the default Jenkins port).

---

### 2️⃣ **Install Necessary Jenkins Plugins** 🔌

1. Go to the **Jenkins dashboard**.
2. Click on **Manage Jenkins** → **Manage Plugins**.
3. Install the following plugins:
   - **AWS CLI**
   - **Docker**
   - **Pipeline**
   - **GitHub Integration**

---

### 3️⃣ **Create a Jenkinsfile** 📝

In your project root, create a file named `Jenkinsfile` with the following content:

```groovy
pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        AWS_DEFAULT_REGION = 'us-east-1'
        IMAGE_REPO_NAME = 'todo-list-app'
        IMAGE_TAG = 'latest'
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            steps {
                script {
                    docker.build("${IMAGE_REPO_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push image') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REPOSITORY_URI}"
                    sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "aws ecs update-service --cluster todo-list-cluster --service todo-list-service --force-new-deployment"
                }
            }
        }
    }
}
```

---

### 4️⃣ **Create a New Pipeline Job in Jenkins** 🎢

1. Go to the **Jenkins dashboard**.
2. Click **New Item**.
3. Choose **Pipeline** and give it a name.
4. In the **Pipeline** section, choose **Pipeline script from SCM**.
5. Set **SCM** to **Git** and provide your repository URL.
6. Set the **Script Path** to `Jenkinsfile`.

---

### 5️⃣ **Configure GitHub Webhook** 🔗

1. Go to your **GitHub repository settings**.
2. Click on **Webhooks**.
3. Add a new webhook with the URL: 
   ```
   http://<your-jenkins-url>/github-webhook/
   ```
4. Choose **Send me everything** for events.

---

### 6️⃣ **Commit and Push Your Changes** 💾

Keep your repository up to date by committing the changes:

```bash
git add Jenkinsfile
git commit -m "Add Jenkinsfile for CI/CD"
git push origin main
```

---

### 🎉 **Congratulations!** 🎉

Now, every time you push changes to your **main branch**, Jenkins will automatically build, push, and deploy your updated application to AWS! 🌟

---

### 🚀 **Future Ideas for Your Project** 📈

Here are some ideas to further enhance your to-do list application:

- **Implement User Authentication** 🔒
- **Add Unit and Integration Tests** 🧪
- **Set Up Monitoring and Logging** with tools like **Prometheus** and **ELK stack** 📊
- **Explore Kubernetes** for container orchestration 🐳
- **Implement Infrastructure as Code** using **Terraform** or **CloudFormation** 📜

---

### 🔒 **Best Practices Reminder** ⚠️

Always follow best practices for security, such as:

- **Don’t commit sensitive information** like API keys or passwords to your repository.
- Use **environment variables** or **AWS Secrets Manager** for managing sensitive data.

---

Happy coding! 🎉
