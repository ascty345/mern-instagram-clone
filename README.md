# mern-instagram-clone 📷📷📷 🔆🔆🔆
I build a small version of instagram with basic features using MERN stack

In this project, I build a small version of instagram with basic features using MERN stack. This app contains several features such as 
authentication, upload pictures, follow (un-follow) users, like (un-like) posts, see posts of your following users. Users can also change their information, 
passwords as well as delete their profile entirely. In addition, I use cloudinary service to host users pictures.
The website is built from the inside out using MERN stack technology.

**Technology**: *React, Redux, NodeJs, CSS, HTML, JavaScript.*

## Quick Start 🦜
Add a .env file in root folder with the following without <> tags

      NODE_ENV = development
      PORT = 5000
      JWT_SECRET = <your-jwt-secret>
      MONGO_URI = <your_mongoDB_Atlas_uri_with_credentials>
      CLOUDINARY_CLOUD_NAME = <cloudinary_cloud_name>
      CLOUDINARY_API_KEY = <cloudinary_api_key>
      CLOUDINARY_API_SECRET = <cloudinary_api_secret>
    

### Install server dependencies
    npm install

### Install frontend dependencies
    cd frontend
    npm install
    
### Run both Express & React from root
    npm run dev

Now you can check the site on http://localhost:3000/
___

### Build for production
Running a build in the frontend

    cd frontend
    npm run build

In .env file change 

      NODE_ENV = production
      
### Test production before deploy ✈️✈️✈️
After running a build in the frontend 👆, cd into the root of the project.
And run...

Linux/Unix

    node server.js

Windows Cmd Prompt or Powershell

    node server.js
    
Check in browser on http://localhost:5000/
___
Enjoy and have a nice day 😆
___
### Screenshots
![instaClone-3](https://user-images.githubusercontent.com/71373378/165104443-3fe06156-78f0-44ae-80ce-f4d72f92b680.jpg)
![instaClone-4](https://user-images.githubusercontent.com/71373378/165104455-ef590085-e5f3-4a17-8e47-fba55b9010b5.jpg)
![instaClone-6](https://user-images.githubusercontent.com/71373378/165104458-8d13f3b9-b613-47b5-b81d-ba8e6513df99.jpg)
![instaClone-5](https://user-images.githubusercontent.com/71373378/165104459-07c743c9-3d45-47e2-a4c6-59c0a405a503.jpg)
![instaClone-2](https://user-images.githubusercontent.com/71373378/165104461-fc14b04a-fa67-4549-a123-79d636c8a47c.jpg)
![instaClone-1](https://user-images.githubusercontent.com/71373378/165104463-c88ef052-6e1e-40c3-8199-095ead322d38.jpg)
