# React AntDesign "Holidaze" Exam

[![Netlify Status](https://api.netlify.com/api/v1/badges/39caaf7a-be52-4896-87a3-0ecf29d801f8/deploy-status)](https://app.netlify.com/sites/exam-holidaze/deploys)

**Host:** [Netlify](https://exam-holidaze.netlify.app/)  
**Repository:** [GitHub](https://github.com/siljeangelvik/react-antd-holidaze-exam)

**GitHub:**  
Board - [KanBan](https://github.com/users/siljeangelvik/projects/1/views/2)   
Roadmap - [Gantt Chart](https://github.com/users/siljeangelvik/projects/1/views/3)  
Table - [Overview](https://github.com/users/siljeangelvik/projects/1/views/4)

**Figma:**   
Design - [Style Tile](https://www.figma.com/file/0rgZXLdgoNZuJTmYoTV9MA/Holidaze-Venue-Manager-UI?type=design&node-id=30-1568&t=K92xt7vpIrkLTIzI-0)    
WireFrame / Prototype - [Mobile](https://www.figma.com/file/0rgZXLdgoNZuJTmYoTV9MA/Holidaze-Venue-Manager-UI?type=design&node-id=5-911&t=xkqBhFw0ewmxhreV-0)        
WireFrame / Prototype - [Desktop](https://www.figma.com/file/0rgZXLdgoNZuJTmYoTV9MA/Holidaze-Venue-Manager-UI?type=design&node-id=36-1086&t=i0IMM4amVObPEwpw-0)  

**Resources:**  
Exam - [Noroff Brief](https://content.noroff.dev/project-exam-2/brief.html)  
API Documentation -  [Noroff Holidaze](https://docs.noroff.dev/holidaze/venues)    
API Endpoints - [Noroff SwaggerUI](https://nf-api.onrender.com/docs/static/index.html#/)

### Resources used in this project
![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)  
![Create React App](https://img.shields.io/badge/Create%20React%20App-09D3AC.svg?style=for-the-badge&logo=Create-React-App&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)  
![AntDesign](https://img.shields.io/badge/Ant%20Design-0170FE.svg?style=for-the-badge&logo=Ant-Design&logoColor=white)
![Material Design](https://img.shields.io/badge/MUI-007FFF.svg?style=for-the-badge&logo=MUI&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7.svg?style=for-the-badge&logo=Netlify&logoColor=white)

---

## Description

This is a React exam project for the course "Frontend Development 2" at Noroff.   
The project is a website for a fictional venue booking application called "Holidaze".   
The website is built with React, AntDesign, Sanity.io and Netlify.   
This project contains a single page application with a home(list of venues) page,   
a profile page and a detail page for each venue.

---

## Resources

[Sanity Yup Form](https://www.sanity.io/guides/form-validation-with-npm-yup)  
[React Router v6](https://www.youtube.com/watch?v=Ul3y1LXxzdU)  
[Google Fonts Combination 2023](https://puzzlepiecesmarketing.com/blog/8-best-google-font-combinations-2022/)    
[Colour Trends 2023](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjA597Vjtv-AhUpRfEDHZQ4CIYQFnoECBUQAw&url=https%3A%2F%2Fwww.gira.com%2Fen%2Fen%2Fg-pulse-magazine%2Finterior-ideas%2Fnew-year-new-colours&usg=AOvVaw2Z8mwQ0kgnWdgpLTQpSMdL)    
[Colors Toolbox](https://uxpro.cc/toolbox/visual-design/colors/)    
[Culrs](https://culrs.com/#/tetradic)    
[GitHub Profile Badges](https://home.aveek.io/GitHub-Profile-Badges/)  
[React Hook](https://docs.noroff.dev/holidaze/venues)  
[Current User](https://www.back4app.com/docs/react/working-with-users/get-current-user-react)  
[Fastify](https://github.com/fastify/fastify-jwt)

---

### Dependencies Issues

List all dependencies and their sub-dependencies in the project:  
_(remember to open package.json in terminal)_
`npm ls`  

To check which dependencies depend on a specific package:  
`npm ls <package-name>`  

Shows all the direct dependencies of a specific package and their versions:  
`npm view <package-name> dependencies`  

To check which version of `<package-name>` is being used:  
`npm ls <package-name> --depth=0`  


Returns a list of packages that depend on `<package-name>` dependency:    
`npm ls --reverse <package-name>`    


### Had some issues with netlify

#### 1. Redirects not working
`"build": "react-scripts build && echo '/* /index.html  200' | cat >build/_redirects ",`


---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
