import mongoose from 'mongoose'
import cors from 'cors';
import express from 'express';
// @ts-ignore
import router from './routes/router.ts';

const app = express();
app.use(cors())
mongoose.set('strictQuery', true);

const dbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.enspmzz.mongodb.net/gamehub?retryWrites=true&w=majority`

// General app settings
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded({ // to support URL-encoded bodies
		extended: true
	})
);

// Router middleware
app.use('/api', router);

mongoose.connect(dbUri).then(result => {
	app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
  }).catch((err) => console.log(err));