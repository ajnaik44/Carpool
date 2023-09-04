const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Connection URI
const uri = 'mongodb+srv://admin:admin@cluster0.nos9wbt.mongodb.net/?retryWrites=true&w=majority';
const jwt = require('jsonwebtoken');

// Replace 'your-secret-key' with a strong secret key
const secretKey = 'secret_key';

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Handle user registration and store in MongoDB
app.post('/register', async (req, res) => {
	 console.log('Received POST request at /api/register');
	  console.log('Request Body:', req.body);
  const { username, password } = req.body;
const client = new MongoClient(uri);
  try {
    await client.connect(); // Connect to MongoDB

    const database = client.db('myDatabase');
    const collection = database.collection('users');

    // Insert user data into the 'users' collection
    await collection.insertOne({ username, password });
	console.log('User name:', username);
	console.log('User registered:', username);
    console.log('User password:', password);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close(); 
  }
});

app.post('/authenticate', async (req, res) => {
  console.log('Received POST request at /authenticate');
  console.log('Request Body:', req.body);
  
  const { username, password } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect(); 

    const database = client.db('myDatabase');
    const collection = database.collection('users');

    const user = await collection.findOne({ username, password });

    if (user) {
		const userData = {
		  id: username,
		  email: password
		};
    
		const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });
      console.log('Authentication success for user:', username);
      res.status(200).json({ message: token });
    } else {
      console.log('Authentication failed for user:', username);
      res.status(401);
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close(); // Close MongoDB connection
  }
});

app.post('/riders', async (req, res) => {
  console.log('Received POST request at /riders');
  console.log('Request Body:', req.body);
  
  const { start, destination,price } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect(); 

    const database = client.db('myDatabase');
    const collection = database.collection('riders');

    // Check if the user with the provided username and password exists
    const rider = await collection.insertOne({ start, destination,price });

    if (rider) {
		
      console.log('Rider Added');
      res.status(200).json({ message: 'Rider Added'});
    } else {
      console.log('Rider Not Added');
      res.status(500);
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close(); // Close MongoDB connection
  }
});


app.get('/riders', async (req, res) => {
  console.log('Received GET request at /riders');

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('myDatabase');
    const collection = database.collection('riders');

    const ridersCursor = collection.find();
    const ridersArray = await ridersCursor.toArray();

    res.json(ridersArray);
  } catch (error) {
    console.error('Error fetching riders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close(); 
  }
});

app.post('/passengers', async (req, res) => {
  console.log('Received POST request at /passengers');
  console.log('Request Body:', req.body);
  
  const { start, destination } = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect(); // Connect to MongoDB

    const database = client.db('myDatabase');
    const collection = database.collection('passengers');

    const rider = await collection.insertOne({ start, destination });

    if (rider) {
		
      console.log('Passenger Added');
      res.status(200).json({ message: 'Passenger Added'});
    } else {
      console.log('Passenger Not Added');
      res.status(500);
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.get('/passengers', async (req, res) => {
  console.log('Received GET request at /passengers');

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('myDatabase');
    const collection = database.collection('passengers');

    // Find all passengers and convert the cursor to an array
    const ridersCursor = collection.find();
    const ridersArray = await ridersCursor.toArray();

    res.json(ridersArray); 
  } catch (error) {
    console.error('Error fetching passengers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close(); 
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
