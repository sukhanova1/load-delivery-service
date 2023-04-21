const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
 
dotenv.config();

const app = express();

const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://adrianas:qwertasdfg@cluster0.lhr0l9m.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const port = process.env.PORT || 8080;

// const io = require('socket.io')(port, {
//   cors: {
//     origin: ['http://localhost:5500'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log(socket.id);
// });

const userRouter = require('./routers/userRouter');
const truckRouter = require('./routers/truckRouter');
const loadRouter = require('./routers/loadRouter');

const { errorHandler } = require('./errorHandler/errorHandler');

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', userRouter);
app.use('/api/trucks', truckRouter);
app.use('/api/loads', loadRouter);

// app.listen(8080);

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port);
  } catch (err) {
    console.log('Server Error', err.mesage);
    process.exit(1);
  }
}

start();

app.use(errorHandler);
