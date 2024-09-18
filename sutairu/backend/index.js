// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import inscriptionRoutes from "./routes/inscriptionRoutes.js";
// import connexionRoutes from "./routes/connexionRoutes.js";
// import sauvegardeRoutes from "./routes/sauvegardeRoutes.js"; 
// import panierRoutes from "./routes/panierRoutes.js";

// const app = express();
// const uri = "mongodb+srv://UserDB:RUV0xqiwSQjnEX9o@sutairu.dabgfok.mongodb.net/Sutairu?retryWrites=true&w=majority";

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());

// async function connectToDatabase() {
//     try {
//         await mongoose.connect(uri);
//         console.log("connected to Mongodb");

//         app.use("/inscription", inscriptionRoutes); 
//         app.use("/connexion", connexionRoutes); 
//         app.use("/article", sauvegardeRoutes); // Utilisation de sauvegardeRoutes pour gérer les articles
//         app.use("/panier", panierRoutes); 
//         app.listen(5000, () => {
//             console.log("Server is running on port 5000");
//         });
//     } catch (error) {
//         console.error('Erreur connecting to MongoDB :', error);
//     }
// }

// connectToDatabase();


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import inscriptionRoutes from "./routes/inscriptionRoutes.js";
import connexionRoutes from "./routes/connexionRoutes.js";
import sauvegardeRoutes from "./routes/sauvegardeRoutes.js"; 
import panierRoutes from "./routes/panierRoutes.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const uri = "mongodb+srv://UserDB:RUV0xqiwSQjnEX9o@sutairu.dabgfok.mongodb.net/Sutairu?retryWrites=true&w=majority";
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

app.use(cors({
  origin: ['http://localhost:3000','https://sutairu-app.vercel.app'],
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("connected to Mongodb");

        app.use("/inscription", inscriptionRoutes); 
        app.use("/connexion", connexionRoutes); 
        app.use("/article", sauvegardeRoutes); // Utilisation de sauvegardeRoutes pour gérer les articles
        app.use("/panier", panierRoutes); 

        app.post("/stripe/charge", async (req, res) => {
            let { amount, id } = req.body;
            console.log("amount:", amount);
            console.log("id:", id);
            try {
                const payment = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: "EUR",
                    payment_method: id,
                    confirm: true,
                    automatic_payment_methods: {
                        enabled: true,
                        allow_redirects: 'never', // Assurez-vous que les redirections sont désactivées
                    },
                });
                res.json({
                    message: "payment reussi",
                    success: true,
                });
            } catch (error) {
                console.log("erreur", error);
                res.json({
                    message: "payment echoue",
                    success: false,
                });
            }
        });

        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    } catch (error) {
        console.error('Erreur connecting to MongoDB :', error);
    }
}

connectToDatabase();
