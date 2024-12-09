# 🍴 Tium Recipes

Tium Recipes is a web application designed for food enthusiasts to discover, create, and share recipes. The project combines a user-friendly interface with a robust backend powered by GraphQL, making it seamless to manage recipe data and deliver an engaging user experience.

---

## 📚 Features

### 🌟 Core Functionality:
- **Recipe Creation**: Users can create new recipes by providing a title, images, ingredients, and directions.  
- **Recipe Browsing**: View all recipes categorized by meals like Breakfast, Lunch, Dinner, and Snacks.  
- **Search & Filter**: Search for recipes by title or filter by category and preparation time.  
- **Rating System**: Each recipe displays its average rating and the total number of ratings.  

### 🔧 Technical Highlights:
- **Frontend**: Built with Vue.js for a dynamic and responsive UI.  
- **Backend**: Powered by a GraphQL server using Apollo Server, providing a scalable and efficient API.  
- **File Uploads**: Supports image uploads for featured and additional images.  
- **State Management**: Utilizes Vue Apollo Composable for efficient GraphQL mutations and queries.  
- **Deployment**: The project is hosted on Netlify, enabling fast and reliable delivery of the application.

---

## 🚀 Tech Stack

- **Frontend**: Vue.js, TailwindCSS, Nuxt.js.  
- **Backend**: Node.js, Apollo Server, GraphQL  
- **Database**: In-memory database for testing (e.g., sample data in `server.js`)  
- **Hosting**: Netlify  

---

## 🛠️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **NPM** or **Yarn**
- **Netlify CLI** (for deployment, optional)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Tium_Recipes.git
   cd Tium_Recipes
   ```

2. **Install Dependencies**:
   Navigate to the frontend and backend directories to install dependencies:
   ```bash
   # Frontend
   cd Tium_Recipes
   npm install

   # Backend
   cd graphql-server
   npm install
   ```

3. **Run the Development Server**:
   - Start the GraphQL server:
     ```bash
     node server.js
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

