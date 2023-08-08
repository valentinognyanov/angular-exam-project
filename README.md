# News Web App
## Description
This project was generated with Angular CLI version 16.1.4.

This is very simple web application that provides users and guests to browse through sports news and read them.

Only registered user can upvote or downvote news, they can also upload their own sport news and after that they can update or delete it.
The users can visit their own profile to see all the news that they upvoted or downvoted for and all the news that they uploaded.

Guests can only browse through the news and can see the full news.

The user stayes logged in by storing data in Local Storage.

Protected routes are used to ensure that only users/owners can access to Profile, Upload, Update and Delete.

## View Pages
- Home - Here is a simple welcome message and a button that leads to thh news page.
- News - In this page both users and guest can browse through all uploaded news, and access to full news page.
- Details - In details page everyone can see the detailed information about the news, the authors of the news can see the Update and Delete buttons and interact, they can see all upvotes and downvotes, but can't interact. The users that are not the authors can upvote or downvote th news. The guests can only read the news, but can not upvote or downvote.
- Update - Here authors of a news can update any information and by submiting they change it in the state and on the server.
- Upload - Here access have only authenticated users and by submiting the news they save it on the server and in the state.
- Profile - Here also access have only users that are authenticated and can see all the news that they uploaded and all the news that they upvotes or downvoted.
- Register - In register page by submiting an full name, email, password and repass an user can be registered in the server while being provided with unique id and authentication token.
- Login - Here by submiting correct email and password, the user will be granted with all the access for authenticated users.
- Logout - By pressing logout the local storage is being cleared.
- About - Here is a little information about the project.

## Service
This app is using as back-end [Firebase](https://firebase.google.com/) and Firestore for Data Base

## Setup
1. Clone Repository
2. In terminal run npm install
3. In terminal run ng serve

## Deploy
- In terminal 'firebase deploy'