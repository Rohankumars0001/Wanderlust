const sampleRooms = [
  {
    title: "Chic Modern Bedroom",
    description:
      "Bright and airy modern bedroom with minimalist décor and elegant style.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    },
    price: 1200,
    location: "Bengaluru",
    country: "India",
  },
  {
    title: "Contemporary Guest Room",
    description:
      "Neutral-toned guest room featuring clean lines and cosy ambiance.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    },
    price: 1000,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Luxury Master Suite",
    description:
      "Spacious master suite with plush textures and refined lighting.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    },
    price: 2500,
    location: "New Delhi",
    country: "India",
  },
  {
    title: "Scandinavian Style Room",
    description:
      "Cozy Scandinavian design with wooden accents and minimalist appeal.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg",
    },
    price: 900,
    location: "Chennai",
    country: "India",
  },
  {
    title: "Urban Loft Bedroom",
    description: "Stylish urban loft with exposed elements and modern setup.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    },
    price: 1500,
    location: "Kolkata",
    country: "India",
  },
  {
    title: "Cozy Cottage Bedroom",
    description: "A rustic bedroom with warm tones and wooden finishes.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
    price: 800,
    location: "Manali",
    country: "India",
  },
  {
    title: "Elegant Blue Bedroom",
    description: "Soft blue walls paired with white linen for a calming effect.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg",
    },
    price: 1300,
    location: "Pune",
    country: "India",
  },
  {
    title: "Minimalist Bedroom",
    description: "Sleek design with minimal furniture and maximum space.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    },
    price: 1100,
    location: "Ahmedabad",
    country: "India",
  },
  {
    title: "Vintage Styled Room",
    description: "Vintage elements meet comfort in this cozy setup.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1571456/pexels-photo-1571456.jpeg",
    },
    price: 1000,
    location: "Hyderabad",
    country: "India",
  },
  {
    title: "Penthouse Bedroom",
    description: "Luxurious penthouse suite with city view and sleek design.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    },
    price: 2800,
    location: "Gurgaon",
    country: "India",
  },
  {
    title: "Beachside Room",
    description: "Bright room with coastal decor near the beach.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg",
    },
    price: 1700,
    location: "Goa",
    country: "India",
  },
  {
    title: "Mountain View Suite",
    description: "Relaxing bedroom with panoramic mountain views.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
    price: 1900,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Neutral Toned Room",
    description: "Beige, white and taupe create a peaceful ambiance.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg",
    },
    price: 950,
    location: "Indore",
    country: "India",
  },
  {
    title: "Boho Themed Bedroom",
    description: "Bohemian textiles and cozy lighting for free spirits.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg",
    },
    price: 1150,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Compact City Room",
    description: "Efficient space with stylish and smart interiors.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
    },
    price: 850,
    location: "Surat",
    country: "India",
  },
  {
    title: "Floral Accents Room",
    description: "Bright room with floral wallpaper and soft furnishings.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg",
    },
    price: 1050,
    location: "Nagpur",
    country: "India",
  },
  {
    title: "Kids Themed Bedroom",
    description: "Colorful room designed especially for children.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    },
    price: 950,
    location: "Lucknow",
    country: "India",
  },
  {
    title: "Twin Bed Room",
    description: "Comfortable twin beds perfect for sharing.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
    price: 1200,
    location: "Chandigarh",
    country: "India",
  },
  {
    title: "Industrial Decor Room",
    description: "Raw and edgy design inspired by industrial lofts.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg",
    },
    price: 1400,
    location: "Noida",
    country: "India",
  },
  {
    title: "Pastel Comfort Room",
    description: "Soft pastel colors and cozy decor.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1457849/pexels-photo-1457849.jpeg",
    },
    price: 980,
    location: "Mysore",
    country: "India",
  },
  {
    title: "Classic Indian Bedroom",
    description: "Traditional Indian patterns and carved wooden furniture.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1457846/pexels-photo-1457846.jpeg",
    },
    price: 1000,
    location: "Varanasi",
    country: "India",
  },
  {
    title: "Hotel Suite Bedroom",
    description: "Modern hotel room with elegant design.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
    price: 2200,
    location: "Bhopal",
    country: "India",
  },
  {
    title: "Wooden Finish Room",
    description: "Full wood finish brings warmth and elegance.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    },
    price: 1500,
    location: "Raipur",
    country: "India",
  },
   {
    title: "White Themed Room",
    description: "Bright, clean, all-white theme for a serene vibe.",
    image: {
      filename: "roomimage",
      url: "https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg",
    },
    price: 1250,
    location: "Coimbatore",
    country: "India",
  },
  
];

module.exports = sampleRooms;
