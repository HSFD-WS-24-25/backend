# Event Organizer "backend" repository
***
## Prerequisites
   - [Node.js (v18.18 or later, LTS Version only)](https://nodejs.org/en)
   - DB-Server: [Postgresql](https://www.postgresql.org/download/)
   - GUI-Tool (Optional, but useful): [pgAdmin](https://www.pgadmin.org/) OR [TablePlus](https://tableplus.com/) (or something similar)

   #### IDE (As per your interest)
   - [Visual studio code](https://code.visualstudio.com/)
      - Lightweight
      - Extensions like ... should be installed for better IDE support
   - [WebStorm](https://www.jetbrains.com/webstorm/)
      - Heavyweight  
      - No external plugins required
      - Very good IDE support
## Steps to get started
   1. Run the postgresql server

   2. Create a database in the postgresql server (Use GUI-Tool or refer to [documentation](https://www.postgresql.org/docs/))

   3. Update the database connection details in the `.env` file (see `.env.example` for reference) 

   4. Clone the repository
      - Using SSH (Recommended)
        ##### Note: You need to add the SSH keys to your GitHub account before proceeding. If you have not done it yet, refer to the [documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)  for creating and adding SSH keys.
        ```bash
        git clone git@github.com:HSFD-WS-24-25/backend.git
        ```
      - Using HTTP
        ```bash
        git clone https://github.com/HSFD-WS-24-25/backend.git
        ```

   5.  Change the current working directory to the project's directory (backend)
   ```bash
   cd backend
   ```

   6.  Install the required dependencies 
   ```bash
   npm install
   ```

   7.  Run the database migrations 
   ```bash
   npx prisma migrate dev
   ```

   8.  Seed roles and permissions 
   ```bash
   npm run role
   ```

   9.  Run the project
   ```bash
   npm run dev
   ```
   This will start the project on localhost. Visit `http://localhost:<port_shown_in_terminal>/`.
