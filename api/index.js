import makeApp from '../app.js';
import * as database from "../utils/database.js";

const app = makeApp(database);


//Port set to 3000 for development purpose and local hosting
app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
});

export default app;