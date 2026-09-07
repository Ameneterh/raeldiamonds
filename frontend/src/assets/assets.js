import women1 from "./fashion_1.jpg";
import women2 from "./fashion_2.jpg";
import women3 from "./fashion_3.jpg";
import women4 from "./fashion_4.jpg";
import kid_fash_1 from "./kid_fash_1.jpg";
import kid_fash_2 from "./kid_fash_2.jpg";
import kid_fash_3 from "./kid_fash_3.jpg";
import kid_fash_4 from "./kid_fash_4.jpg";
import men_fash_1 from "./men_fash_1.jpg";
import men_fash_2 from "./men_fash_2.jpg";
import men_fash_3 from "./men_fash_3.jpg";
import men_fash_4 from "./men_fash_4.jpg";
import nav_img from "./header_img.png";
import hero_img from "./heroimage.png";
import exchange_icon from "./exchange_icon.png";
import quality_icon from "./quality_icon.png";
import support_icon from "./support_img.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.jpg";
import exceptional_logo from "./exceptional-logo.png";
import exclucive_offer from "./exclusive-offer.jpg";
import support_247 from "./247-support.png";
import wide_products from "./wide-products.jpg";
import convenience from "./convenience.png";
import logo from "./logo.png";

// images for new products line
import belt_1 from "./belt_1.jpeg";
import diamond_bracelets_1 from "./diamond_bracelets_1.jpeg";
import diamond_necklace_1 from "./diamond_necklace_1.jpeg";
import diamond_necklace_2 from "./diamond_necklace_2.jpeg";
import diamond_necklace_3 from "./diamond_necklace_3.jpeg";
import diamond_rings_1 from "./diamond_rings_1.jpeg";
import diamond_rings_2 from "./diamond_rings_2.jpeg";
import perfume_1 from "./perfume_1.jpeg";
import perfume_2 from "./perfume_2.jpeg";
import watch_1 from "./watch_1.jpeg";
import watch_2 from "./watch_2.jpeg";
import watch_3 from "./watch_3.jpeg";

export const assets = {
  nav_img,
  hero_img,
  exchange_icon,
  quality_icon,
  support_icon,
  about_img,
  contact_img,
  exceptional_logo,
  exclucive_offer,
  support_247,
  wide_products,
  convenience,
  logo,
};

export const products = [
  {
    _id: "1",
    name: "Fashionable Gold Plated Belt",
    slug: "fashionable-gold-plated-belt",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 10500,
    image: [belt_1, women2, women3, women4],
    category: "accessories",
    subCategory: "men_wears",
    payondelivery: true,
    sizes: ["S", "M", "L"],
    logistics_included: true,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",

    reviews: [
      {
        buyer: {
          name: "AMENE Terhemen",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDYO06lppcfPSL-RovtTD_Sqv2I8bK_YYgnWJHPtoVF84xw5hqUKFsvSz&s=10",
        },
        rating: 4,
        comment: "This is a great product. I love it!",
      },
    ],
  },
  {
    _id: "2",
    name: "Diamond Bracelet",
    slug: "diamond-bracelet",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 15000,
    image: [diamond_bracelets_1, women2, women3, women4],
    category: "bracelets",
    subCategory: "accessories",
    sizes: ["S", "M", "L"],
    logistics_included: false,
    bestSeller: false,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "3",
    name: "Diamond Necklace 1",
    slug: "diamond-necklace-1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 1050,
    image: [diamond_necklace_1, men_fash_2, men_fash_3, men_fash_4],
    category: "necklaces",
    subCategory: "men_wears",
    sizes: ["M", "L", "XL"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "4",
    name: "Diamond Necklace 2",
    slug: "diamond-necklace-2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 1500,
    image: [diamond_necklace_2, men_fash_2, men_fash_3, men_fash_4],
    category: "necklaces",
    subCategory: "womens_wears",
    sizes: ["M", "L", "XL"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "5",
    name: "Diamond Necklace 3",
    slug: "diamond-necklace-3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 85000,
    image: [diamond_necklace_3, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "necklaces",
    subCategory: "womens_wears",
    sizes: ["S", "M"],
    logistics_included: true,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "6",
    name: "Diamond Ring 1",
    slug: "diamond-ring-1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [diamond_rings_1, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "rings",
    subCategory: "engagement_rings",
    sizes: ["S", "M"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "7",
    name: "Diamond Ring 2",
    slug: "diamond-ring-2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [diamond_rings_2, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "rings",
    subCategory: "couple_rings",
    sizes: ["S", "M"],
    logistics_included: true,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "8",
    name: "Now White Perfume 150mL",
    slug: "now-white-perfume-150ml",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [perfume_1, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "perfumes",
    subCategory: "female_perfumes",
    sizes: ["S", "M"],
    logistics_included: true,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "9",
    name: "Supremacy Avnan Incense Perfume 200mL",
    slug: "supremacy-avnan-incense-perfume-200ml",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [perfume_2, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "perfumes",
    subCategory: "male_perfumes",
    sizes: ["S", "M"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "10",
    name: "Watch One",
    slug: "watch-one",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [watch_1, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "watches",
    subCategory: "men_watches",
    sizes: ["S", "M"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "11",
    name: "Watch Two",
    slug: "watch-two",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [watch_2, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "watches",
    subCategory: "women_watches",
    sizes: ["S", "M"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
  {
    _id: "12",
    name: "Watch Three",
    slug: "watch-three",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    price: 9000,
    image: [watch_3, kid_fash_2, kid_fash_3, kid_fash_4],
    category: "watches",
    subCategory: "unisex_watches",
    sizes: ["S", "M"],
    logistics_included: false,
    bestSeller: true,
    createdAt: "2026-09-06T08:05:19.320+00:00",
  },
];
