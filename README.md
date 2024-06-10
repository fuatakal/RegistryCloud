# Registry Cloud

## Overview

This project is a front-end application built with modern web technologies to provide a smooth and efficient user experience. It is designed to work with an API that you need to clone and run separately.

## How to Run the App

1. **Clone and Run API**:
   - First, clone and run the API from this repository: [API Repository Link](https://github.com/blurlander/RegistryCloud_api).
   
2. **Install Dependencies**:
   - Navigate to the project directory and install the necessary packages:
     ```bash
     npm install
     ```

3. **Run in Development Mode**:
   - To start the application in development mode, use:
     ```bash
     npm run dev
     ```

4. **Performance Tips**:
   - In development mode, the app might run slowly when first launched. To ensure smoother operation during development, navigate through the pages and refresh them to fully load all client-side components.


## Notes for the Incoming Development Process



1. **Dev Mode**:
   - This version of the project runs in development mode. When the project is fully complete, make the necessary route changes and then build the final product for deployment:
     ```bash
     npm run build
     ```

2. **Client-Side and Server-Side Rendering**:
   - Due to ongoing testing and development, most pages and components run on the client side. For optimal performance, some components may run on the server side.


3. **Code Organization**:
   - Maintain a consistent folder structure for cleaner code:
     - Hooks in the `hooks` folder
     - Atoms in the `atoms` folder
     - Components in the `components` folder etc.

## Contributing

  You can inspect our past commits and branchs for contrubuting style. Also can be seen in husky folder:

  - valid_branch_regex="^(feat|fix|style|refactor|test|docs|chore)\/[a-z0-9-]+$" => feat/add-some-feat , fix/fix-home-page

  - valid_commit_regex="^(RC)-[0-9]+(,[0-9]+)*: [A-Z][-a-z0-9 \.-_]+$" => RC-1: Add your message


