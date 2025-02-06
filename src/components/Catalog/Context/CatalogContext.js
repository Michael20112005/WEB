import React, { createContext, useState } from "react";
import item1Image from "../../../images/1.png";
import item2Image from "../../../images/12.jpg";
import item3Image from "../../../images/123.jpg";
import item4Image from "../../../images/1234.webp";

// Create a context for the catalog
export const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {
  // Catalog data, including product details and images
  const [catalogItems] = useState([
    {
      id: "1",
      title: "Mine",
      category: "Accessories",
      priceRange: "High",
      description: "Soft and cozy bed for your game",
      price: 149,
      image: item1Image,
    },
    {
      id: "2",
      title: "Minec",
      category: "Toys",
      priceRange: "High",
      description: "Durable scratcher for healthy claws",
      price: 80,
      image: item2Image,
    },
    {
      id: "3",
      title: "Minecr",
      category: "Accessories",
      priceRange: "Low",
      description:
        "Stylish carrier for comfortable travel into world oj blocks",
      price: 29,
      image: item3Image,
    },
    {
      id: "4",
      title: "Minecra",
      category: "Toys",
      priceRange: "Medium",
      description:
        "Engaging toys to keep your play active, happy, and healthy!",
      price: 45,
      image: item4Image,
    },
  ]);

  return (
    <CatalogContext.Provider value={{ catalogItems }}>
      {children} {/* Render children components */}
    </CatalogContext.Provider>
  );
};

export default CatalogProvider;
