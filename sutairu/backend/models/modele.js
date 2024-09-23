import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  email: { type: String, required: true },
  hoodie: { type: String, required: true },
  taille: { type: String, required: true },
  couleur: { type: String, required: true },
  texte: { type: String, required: false },
  logo: { type: String, required: false },
  prix: { type: Number, required: true }
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
