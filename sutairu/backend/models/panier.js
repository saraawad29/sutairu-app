import mongoose from 'mongoose';

const PanierSchema = new mongoose.Schema({
  user: { type: String, required: true },
  articles: [
    {
      article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
      quantite: { type: Number, default: 1 }
    }
  ]
});

const Panier = mongoose.model('Panier', PanierSchema);
export default Panier;
