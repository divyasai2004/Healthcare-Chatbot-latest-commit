const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const User = require('./user'); // Ensure this is correctly importing your User model
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const port = process.env.PORT || 3100;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Important for form submissions
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot-1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.post('/register', async (req, res) => {
    try {
        console.log("Incoming request data:", req.body);  // Log incoming data

        const user = new User(req.body);
        await user.save();

        console.log("User saved successfully:", user);  //  Confirm save
        res.status(201).send(user);
    } catch (error) {
        console.error("User registration error:", error);  //  Log error
        res.status(400).send({ error: error.message });
    }
});


// // User Registration Route
// app.post('/register', async (req, res) => {
//     console.log("Received registration request:", req.body); // Debugging log

//     try {
//         const user = new User(req.body);
//         await user.save();
//         console.log("User registered:", user);
//         res.status(201).send(user);
//     } catch (error) {
//         console.error("User registration error:", error);
//         res.status(400).send({ error: error.message });
//     }
// });

// User Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username, password }); // Fixed field names
        if (user) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Other routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// const User = require('./user');
// const express = require('express');
// const mongoose = require('mongoose');
// //const stripe = require('stripe')('AIzaSyB2XHl4cfznKR0gySXPUp2n6WD6Yz5rWJc'); // Corrected initialization
// const app = express();
// const port = process.env.PORT || 3100;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// //const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Corrected initialization
// require('dotenv').config();

// // Import routes
// const userRoutes = require("./routes/userRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chatbot-1", { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // // User Registration
// // app.post('/', async (req, res) => {
// //     try {
// //         const user = new User(req.body);
// //         await user.save();
// //         res.status(201).send(user);
// //     } catch (error) {
// //         console.error("User registration error:", error);
// //         res.status(400).send({ error: error.message });
// //     }
// // });

// // User Registration
// app.post('/register', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         console.log("user", user);
//         res.status(201).send(user);
//     } catch (error) {
//         console.error("User registration error:", error);
//         res.status(400).send({ error: error.message });
//     }
// });



// // User Login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ un: username, ps: password });
//         if (user) {
//             res.status(200).json({ message: "Login successful", user });
//         } else {
//             res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (e) {
//         console.error("Login error:", e);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// });

// // Chatbot Interaction 
// app.post('/process', async (req, res) => {
//     const { question } = req.body;

//     try {
//         const pythonResponse = await axios.post('http://127.0.0.1:5000/process', { question });

//         if (!pythonResponse.data || !pythonResponse.data.response) {
//             throw new Error('Invalid response from Python API');
//         }

//         res.json(pythonResponse.data);
//     } catch (error) {
//         console.error("Error communicating with Python backend:", error.message);
//         res.status(500).json({ error: 'Error communicating with the chat service' });
//     }
// });



// // Stripe Payment Intent Route
// app.post('/create-payment-intent', async (req, res) => {
//     try {
//         const { amount, currency } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency,
//             payment_method_types: ['card'],
//         });

//         res.status(200).json({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         console.error('Error creating payment intent:', error);
//         res.status(400).json({ error: error.message });
//     }
// });

// // Other routes
// app.use("/api/users", userRoutes);
// app.use("/api/appointments", appointmentRoutes);

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



// const User = require('./user');
// const express = require('express');
// const mongoose = require('mongoose');
// const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key
// require('dotenv').config();
// const app = express();
// const port = process.env.PORT || 3100; // Use environment variable for port or default 3100
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// // Import routes
// const Testimonial = require('./testimonial');
// const userRoutes = require("./routes/userRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI, { // Use environment variable for MongoDB URI
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // User Registration
// app.post('/', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send(user); // Send the saved user object back
//     } catch (error) {
//         console.error("User registration error:", error); // Log the error for debugging
//         res.status(400).send({ error: error.message }); // Send a more informative error response
//     }
// });

// // User Login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ un: username, ps: password }); // Use findOne for a single result
//         if (user) {
//             res.status(200).json({ message: "Login successful", user }); // Send a success message and the user object
//         } else {
//             res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized is more appropriate
//         }
//     } catch (e) {
//         console.error("Login error:", e); // Log the error
//         res.status(500).json({ message: "Something went wrong" }); // Send a 500 status code
//     }
// });

// // Chatbot Interaction (Gemini Proxy)
// app.post('/HomePage', async (req, res) => {  // Consistent route name
//     const { question } = req.body; // Use "question" key

//     try {
//         const pythonResponse = await axios.post('http://127.0.0.1:5000/process', { question }); // Python backend URL
//         res.json(pythonResponse.data); // Send the response from Python back to React
//     } catch (error) {
//         console.error("Error proxying to Python:", error);
//         res.status(500).json({ error: 'Error communicating with the chat service' });
//     }
// });


// // ... (Testimonial Management routes - no changes needed)
//     app.get('/testimonials', async (req, res) => {
//     try {
//          const testimonials = await Testimonial.find();
//          res.json(testimonials);
//     } catch (error) {
//          console.error('Error fetching testimonials:', error);
//          res.status(500).send('Error fetching testimonials');
// }
//     });
//     app.post('/testimonials', async (req, res) => {
//           const { name, feedback, image } = req.body;
        
//           const newTestimonial = new Testimonial({ name, feedback, image });
        
//           try {
//               await newTestimonial.save();
//               res.status(201).send('Testimonial added successfully');
//           } catch (error) {
//               console.error('Error adding testimonial:', error);
//               res.status(500).send('Error adding testimonial');
//           }
//         });
        
//         app.delete('/testimonials/:id', async (req, res) => {
//           try {
//               await Testimonial.findByIdAndDelete(req.params.id);
//               res.send('Testimonial deleted successfully');
//           } catch (error) {
//               console.error('Error deleting testimonial:', error);
//               res.status(500).send('Error deleting testimonial');
//           }
//         });
// // Stripe Payment Intent Route
// app.post('/create-payment-intent', async (req, res) => {
//     try {
//         const { amount, currency } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency,
//             payment_method_types: ['card'],
//         });

//         res.status(200).json({ clientSecret: paymentIntent.client_secret }); // Send JSON response
//     } catch (error) {
//         console.error('Error creating payment intent:', error); // Log the full error object
//         res.status(400).json({ error: error.message }); // Send JSON error response
//     }
// });

// // ... (Other routes)
//     app.use("/api/users", userRoutes);
//     app.use("/api/appointments", appointmentRoutes);
//     //Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// const User = require('./user');
// const express = require('express');
// const mongoose = require('mongoose');
// const Stripe = require('stripe'); // Add Stripe
// require('dotenv').config(); // Load environment variables
// const app = express();
// const port = 3100;
// const bodyParser= require('body-parser');
// const cors = require('cors');
// const axios = require('axios');

// // Import routes for user,appointment management and testimonial
// const Testimonial = require('./testimonial');
// const userRoutes = require("./routes/userRoutes");
// const appointmentRoutes = require("./routes/appointmentRoutes");

// app.use(express.json());
// app.use(cors()); 
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/user', {

// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// //user registration
// app.post('/', async(req, res) => {
//     const receivedData = req.body;
//     console.log(receivedData);
   
//         const { Fullname,Email,DOB,Gen,un,ps } = req.body;
        
//         const user = new User(req.body);
//         try {
//           await user.save();
//           res.status(201).send(User);
//         } catch (error) {
//           res.status(400).send(error);
//         }
//       });

//       //user login
// app.post('/login', async (req, res) => {
//         const { username, password } = req.body;
//         console.log(username);
//         console.log(password);
//         try {



//           let answer = await User.find({ un: username , ps: password })
//           console.log(answer)
    
//           if(answer.length != 0){
//             console.log("success")
//             res.sendStatus(200)
//           } else{
//            console.log("fail")
//            res.sendStatus(404)
//           }
  
//         } catch (e) {
//             res.send("Something Went Wrong");
//         }
//       });

//   //Chatbot Interaction
//     app.post('/HomePage', async (req, res) => {
//       const { Message,Input } = req.body;
    
//       try {
//         const response = await axios.post('http://127.0.0.1:5000/process' , {
//           message: Message,
//           input: Input,
//         }); // Assuming Flask runs on port 5000
//         console.log(response.data);
//         res.json(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Error fetching data');
//       }
     
//     });


//     // Testimonial Management
// app.get('/testimonials', async (req, res) => {
//   try {
//       const testimonials = await Testimonial.find();
//       res.json(testimonials);
//   } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       res.status(500).send('Error fetching testimonials');
//   }
// });

// app.post('/testimonials', async (req, res) => {
//   const { name, feedback, image } = req.body;

//   const newTestimonial = new Testimonial({ name, feedback, image });

//   try {
//       await newTestimonial.save();
//       res.status(201).send('Testimonial added successfully');
//   } catch (error) {
//       console.error('Error adding testimonial:', error);
//       res.status(500).send('Error adding testimonial');
//   }
// });

// app.delete('/testimonials/:id', async (req, res) => {
//   try {
//       await Testimonial.findByIdAndDelete(req.params.id);
//       res.send('Testimonial deleted successfully');
//   } catch (error) {
//       console.error('Error deleting testimonial:', error);
//       res.status(500).send('Error deleting testimonial');
//   }
// });


// // Stripe Payment Intent Route
// app.post('/create-payment-intent', async (req, res) => {
//   try {
//       const { amount, currency } = req.body;

//       // Create payment intent with the specified amount and currency
//       const paymentIntent = await stripe.paymentIntents.create({
//           amount, // Amount in smallest currency unit (e.g., 1000 for $10)
//           currency, // Example: 'usd'
//           payment_method_types: ['card'], // Support card payments
//       });

//       res.status(200).send({
//           clientSecret: paymentIntent.client_secret, // Send client secret to the frontend
//       });
//   } catch (error) {
//       console.error('Error creating payment intent:', error.message);
//       res.status(400).send({ error: error.message });
//   }
// });

// // Use routes for user and appointment management
// app.use("/api/users", userRoutes);
// app.use("/api/appointments", appointmentRoutes);

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);   
// });
