import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from "../context/CartContext";
import { foodItems } from "../food/foodItems";

const style = {
  position: "absolute",
  top: "15%",
  left: "35%",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  p: 4,
};

function OrdersPage() {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([])
  const [value, setValue] = useState("");
  const [products, setProducts] = useState(foodItems);
  const { addToCart } = useCart();
  const debounceRef = useRef(null);

  const categories = Array.from(new Set(foodItems.map((i) => i.category)));

  // 🌀 Shuffle items only once on mount

  // 🔍 Debounced Search
  const handleSearchChange = (e) => {
    const value = e.target.value;
      if (value.startsWith(" ")) return;
    setValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const filtered = foodItems.filter((item) => {
        const matchesName = item.name
          .toLowerCase()
          .includes(value.trim().toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(item.category);
        return matchesName && matchesCategory;
      });
      setProducts(filtered);
    }, 300);
  };

  // ✅ Category Filtering
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const newCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((cat) => cat !== value);
    setSelectedCategories(newCategories);
  };

  const handleApplyFilter = () => {
    const filtered =
      selectedCategories.length > 0
        ? foodItems.filter((item) =>
            selectedCategories.includes(item.category)
          )
        : foodItems;
    setProducts(filtered);
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setProducts(foodItems);
  };

  return (
    <section className="menu">
      <div className="menu-header">
        <h2>Popular Dishes</h2>
        <input
          type="search"
          placeholder="Search"
          value={value}
        //   onKeyDown={handleKeyDown}
          onChange={handleSearchChange}
        />
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>

      {/* Filter Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style} className="filter-modal">
          <div className="filter-modal-header">
            <h3>Filter by Category</h3>
            <button className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>

            <div className="filter-categories">
    {categories.map((category, index) => (
      <div key={`${category}-${index}`} className="filter-category">
        <label>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          {category}
        </label>
      </div>
    ))}
  </div>         

          <div style={{ marginTop: "1rem" }}>
            <button onClick={handleClear} className="clear-filter">
              Clear Filter
            </button>
            <button className="apply-btn" onClick={handleApplyFilter}>
              Apply
            </button>
          </div>
        </Box>
      </Modal>

      {/* Food Cards */}

<div className="menu-grid">
  {products.map((item, index) => (
    <div key={`${item.id}-${index}`} className="card">
      <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <button className="add-btn" onClick={() => addToCart(item)}>
        Add to Cart
      </button>
    </div>
  ))}
</div>
    </section>
  );
}

export default OrdersPage;
