### Preparation

```npm install```

### Run

```npm start```

### File Structure

src: 
 
 &nbsp;&nbsp; -- Lib : Cross projects base functions and definitions.
 
 &nbsp;&nbsp; -- Logic: Put actions, reducers, Saga and Api calls here.

 &nbsp;&nbsp; -- Utils: Non logic functions which is useful in this project.
 
 &nbsp;&nbsp; -- Views: Component of each page.
 
 ### Details
 * React app
 * Responsive and suit to mobile device
 * URL: http://localhost:3000/  (default if the port is not used by the other program)
 * Click "Run" button, it will show the working process. And then give the result.
 * Not allow Click "Run" multiple times if it is running.
 
 ### Others
 No warnings in my dev environment, Ubuntu 18.04.1 LTS (Bionic Beaver), node version v12.16.0, npm version 6.13.7.
 Do not rule out the possibility that there are warnings in the some other devices.
 
 I also put in on the docker hub. It is public.
 
 ```docker pull pd54007/duopankogan:1.0```
  
 ```docker container run pd54007/duopankogan:1.0```
 
 it will show
 
 ```
> duopan@1.0.0 start /usr/src/app
> react-scripts start

ℹ ｢wds｣: Project is running at http://172.17.0.2/
ℹ ｢wds｣: webpack output is served from 
ℹ ｢wds｣: Content not from webpack is served from /usr/src/app/public
ℹ ｢wds｣: 404s will fallback to /
Starting the development server...

Compiled successfully!

You can now view duopan in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.17.0.2:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

```

Open http://172.17.0.2:3000 can access this web page. (In Mac it could be http://192.168.99.100:3000)
