import {app} from './src/app.js'
import { connectToDataBase } from './src/db/database.js';

const port = process.env.PORT || 5000


connectToDataBase().then(() => {
    app.listen( port , () => {
        console.log(`server is running on port : ${port}`);    
    })
}).catch((err) => {
    console.log("Getting error while connection to the databse ", err);

})
