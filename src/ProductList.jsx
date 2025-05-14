import { useState } from "react";
import PropTypes from "prop-types";
import "./ProductList.css";
import CartItem from "./CartItem";
import { addItem } from "./CartSlice";
import { useDispatch, useSelector } from "react-redux";
import plantsArray from "./assets/plants.json"; // Import the JSON data

const ProductList = ({ onHomeClick }) => {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };
  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false); // Hide the cart when navigating to About Us
  };
  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((addedToCart) => ({
      ...addedToCart,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a
              className="tag_home_link"
              href="/"
              onClick={(e) => handleHomeClick(e)}
            >
              <div>
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div className="other_navbar_links">
          <div>
            <a
              className="navbar_link"
              href="#"
              style={{marginLeft: "75px"}}
              onClick={(e) => handlePlantsClick(e)}
            >
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a
              className="navbar_link"
              href="#"
              onClick={(e) => handleCartClick(e)}
            >
              <h1 className="cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="IconChangeColor"
                  height="68"
                  width="68"
                >
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    id="mainIconPathAttribute"
                  ></path>
                </svg>
                {cartItems.length > 0 && (
                  <span className="cart_quantity_count">
                    {cartItems.length}
                  </span>
                )}
              </h1>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="product-category">
              <h2>{category.category}</h2>
              <div className="product-list">
                {category.plants.map((plant, index) => (
                  <div key={index} className="product-card">
                    <img
                      className="product-image"
                      src={plant.image}
                      alt={plant.name}
                    />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">
                      {plant.description}
                    </div>
                    <div className="product-price">{plant.cost}</div>
                    {addedToCart[plant.name] ? (
                      <button className="product-button added-to-cart" disabled>
                        Added to Cart
                      </button>
                    ) : (
                      <button
                        className="product-button"
                        onClick={() => handleAddToCart(plant)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
};
ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};

export default ProductList;
