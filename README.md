# Event Organizer "backend" repository
***
## Prerequisites
   - [Node.js (v18.18 or later)](https://nodejs.org/en)

   #### IDE (As per your interest)
   - [Visual studio code](https://code.visualstudio.com/)
      - Lightweight
      - Extensions like ... should be installed for better IDE support
   - [WebStorm](https://www.jetbrains.com/webstorm/)
      - Heavyweight  
      - No external plugins required
      - Very good IDE support
## Steps to get started
   1. Clone the repository
      - Using SSH (Recommended)
        ##### Note: You need to add the SSH keys to your GitHub account before proceeding. If you have not done it yet, refer to the [documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys)  for creating and adding SSH keys.
        ```bash
        git clone git@github.com:HSFD-WS-24-25/backend.git
        ```
      - Using HTTP
        ```bash
        git clone https://github.com/HSFD-WS-24-25/backend.git
        ```

   2.  Change the current working directory to the project's directory (backend)
   ```bash
   cd backend
   ```

   3.  Install the required dependencies 
   ```bash
   npm install
   ```

   4.  Run the project
   ```bash
   npm run dev
   ```
   This will start the project on localhost. Visit `http://localhost:<port_shown_in_terminal>/`.