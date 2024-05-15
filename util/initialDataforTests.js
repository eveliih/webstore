const initialProducts = [
  {
    name: "Avocado",
    categoryId: 4,
    price: 1.99,
    ingredients: "Avocado",
    origin: "Peru",
  },
  {
    name: "Watermelon",
    categoryId: 4,
    price: 2.99,
    ingredients: "Watermelon",
    origin: "Spain",
  },
  {
    name: "Banana",
    categoryId: 4,
    price: 0.99,
    ingredients: "Banana",
    origin: "Ecuador",
  },
];

const initialImages = [
  {
    url: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Juicy watermelon",
    productId: 1,
  },
  {
    url: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Juicy watermelon",
    productId: 2,
  },
  {
    url: "https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Juicy watermelon",
    productId: 3,
  },
];

const initialCategories = [
  {
    name: "Fruits",
  },
];

module.exports = { initialProducts, initialImages, initialCategories };
