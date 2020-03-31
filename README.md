### Preparation

npm install

### Run

npm start

### File Structure

src: 
 
 &nbsp;&nbsp; -- Lib : Cross projects base functions and definitions.
 
 &nbsp;&nbsp; -- Logic: Put actions, reducers, Saga and Api calls here.

 &nbsp;&nbsp; -- Utils: Non logic functions which is useful in this project.
 
 &nbsp;&nbsp; -- Views: 
 
 &nbsp;&nbsp; &nbsp;&nbsp; -- Basic: Small basic components
 
 &nbsp;&nbsp; &nbsp;&nbsp; -- other folders: Component of each page.
 
 ### Details
 
 * Responsive and suit to mobile device
 * Load at most 15 items per page.
 * Include search no results hint.
 * If make the test under "Slow 3G", a Loading component will be more easy to see.
 * Allow a product which has a long name (Hot Dogs), the product card in the same row stay in the same height.
 * Support "Enter" key in search bar.

### Test

Some tests in View/Basic/

run "npm test"

 