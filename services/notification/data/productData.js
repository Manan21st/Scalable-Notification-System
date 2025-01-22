const products = [
  {
    "productId": "601c1a1e810c19729de860ea",
    "name": "Smartphone",
    "category": "electronics",
    "price": 699.99,
    "priceRange": "high"
  },
  {
    "productId": "601c1a1e810c19729de860eb",
    "name": "Bluetooth Headphones",
    "category": "electronics",
    "price": 199.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860ec",
    "name": "4K LED TV",
    "category": "electronics",
    "price": 899.99,
    "priceRange": "high"
  },
  {
    "productId": "601c1a1e810c19729de860ed",
    "name": "Smart Watch",
    "category": "electronics",
    "price": 149.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860ee",
    "name": "Dumbbells Set",
    "category": "gym-accessories",
    "price": 49.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860ef",
    "name": "Resistance Bands",
    "category": "gym-accessories",
    "price": 29.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f0",
    "name": "Yoga Mat",
    "category": "gym-accessories",
    "price": 19.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f1",
    "name": "Pull-Up Bar",
    "category": "gym-accessories",
    "price": 39.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f2",
    "name": "Football",
    "category": "sports",
    "price": 25.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f3",
    "name": "Cricket Bat",
    "category": "sports",
    "price": 45.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f4",
    "name": "Basketball",
    "category": "sports",
    "price": 29.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f5",
    "name": "Tennis Racket",
    "category": "sports",
    "price": 59.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860fa",
    "name": "T-Shirt",
    "category": "clothing",
    "price": 19.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860fb",
    "name": "Running Shoes",
    "category": "footwear",
    "price": 49.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860fc",
    "name": "Jeans",
    "category": "clothing",
    "price": 39.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860fd",
    "name": "Jacket",
    "category": "clothing",
    "price": 79.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860fe",
    "name": "Sandals",
    "category": "footwear",
    "price": 29.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860ff",
    "name": "Sneakers",
    "category": "footwear",
    "price": 89.99,
    "priceRange": "high"
  },
  {
    "productId": "601c1a1e810c19729de860fg",
    "name": "Formal Shoes",
    "category": "footwear",
    "price": 59.99,
    "priceRange": "mid"
  },
  {
    "productId": "601c1a1e810c19729de860fh",
    "name": "Slippers",
    "category": "footwear",
    "price": 19.99,
    "priceRange": "low"
  },
  {
    "productId": "601c1a1e810c19729de860f1",
    "name": "Men's T-Shirt",
    "category": "clothing",
    "priceRange": "low",
    "price": 499
  },
  {
    "productId": "601c1a1e810c19729de860f2",
    "name": "Women's Jacket",
    "category": "clothing",
    "priceRange": "mid",
    "price": 2499
  },
  {
    "productId": "601c1a1e810c19729de860f3",
    "name": "Smartphone",
    "category": "electronics",
    "priceRange": "high",
    "price": 74999
  },
  {
    "productId": "601c1a1e810c19729de860f4",
    "name": "Wireless Earbuds",
    "category": "electronics",
    "priceRange": "mid",
    "price": 4999
  },
  {
    "productId": "601c1a1e810c19729de860f5",
    "name": "Running Shoes",
    "category": "footwear",
    "priceRange": "low",
    "price": 999
  },
  {
    "productId": "601c1a1e810c19729de860f6",
    "name": "Basketball Shoes",
    "category": "footwear",
    "priceRange": "mid",
    "price": 3999
  },
  {
    "productId": "601c1a1e810c19729de860f7",
    "name": "Dumbbell Set",
    "category": "gym-accessories",
    "priceRange": "low",
    "price": 799
  },
  {
    "productId": "601c1a1e810c19729de860f8",
    "name": "Yoga Mat",
    "category": "gym-accessories",
    "priceRange": "mid",
    "price": 1299
  },
  {
    "productId": "601c1a1e810c19729de860f9",
    "name": "Cricket Bat",
    "category": "sports",
    "priceRange": "low",
    "price": 1199
  },
  {
    "productId": "601c1a1e810c19729de860fa",
    "name": "Football",
    "category": "sports",
    "priceRange": "mid",
    "price": 1599
  },
  {
    "productId": "601c1a1e810c19729de860fb",
    "name": "Gaming Laptop",
    "category": "electronics",
    "priceRange": "high",
    "price": 149999
  },
  {
    "productId": "601c1a1e810c19729de860fc",
    "name": "Sports Watch",
    "category": "electronics",
    "priceRange": "mid",
    "price": 8999
  },
  {
    "productId": "601c1a1e810c19729de860fd",
    "name": "Formal Shoes",
    "category": "footwear",
    "priceRange": "high",
    "price": 5999
  },
  {
    "productId": "601c1a1e810c19729de860fe",
    "name": "Gym Gloves",
    "category": "gym-accessories",
    "priceRange": "low",
    "price": 499
  },
  {
    "productId": "601c1a1e810c19729de860ff",
    "name": "Tennis Racket",
    "category": "sports",
    "priceRange": "high",
    "price": 7999
  }

];

export default products;
