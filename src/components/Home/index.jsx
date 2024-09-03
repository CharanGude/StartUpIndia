import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import noData from "../../assets/noData.jpg";
import Card from "../Card";
import Greeting from "../Greeting";
import Loader from "../Loader";
import "./index.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const username = Cookie.get("username");
  const [highlightedData, setHighlightedData] = useState(null);
  const recentData = data.slice(-8);

  const handleCardClick = (data) => {
    setHighlightedData(data);
  };

  useEffect(() => {
    const token = Cookie.get("jwt_token");
    if (token === undefined) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_SERVER+"/data",
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("jwt_token")}`,
          },
        },
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onLogout = () => {
    Cookie.remove("jwt_token");
    navigate("/login");
  };

  const goBack = () => {
    setHighlightedData(null);
  };

  const onCategoryChange = async (event) => {
    const filter = event.target.value;
    console.log(filter);
    if (filter === "") {
      fetchData();
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BACKEND_SERVER+"/filter",
          { filter },
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Register New Company</Link>
            </li>
            <li>
              <Link to="/login" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="body">
        <div className="sidebar">
          <Greeting user={username} />
          <div className="sidebar-content">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="sidebar-filter">
                  <h2 className="compName categoryHead">Filter Using Category:</h2>
                  <select onChange={onCategoryChange} id="category-select">
                    <option value="">All Categories</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Vehicle Bookings">Vehicle Bookings</option>
                    <option value="Learning">Learning</option>
                    <option value="Food Delivery">Food Delivery</option>
                    <option value="Smart Payments">Smart Payments</option>
                    <option value="Hotel Bookings">Hotel Bookings</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Credit Card Payments/Verification">
                      Credit Card Payments/Verification
                    </option>
                    <option value="Clothes">Clothes</option>
                    <option value="Sports">Sports</option>
                    <option value="News">News</option>
                    <option value="Digital Security">Digital Security</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Investments">Investments</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Loans">Loans</option>
                    <option value="Buying/Selling Properties">
                      Buying/Selling Properties
                    </option>
                    <option value="Innovation">Innovation</option>
                    <option value="Rent Bikes">Rent Bikes</option>
                    <option value="Build API">Build API</option>
                    <option value="Health">Health</option>
                    <option value="Streaming">Streaming</option>
                    <option value="Movie Tickets">Movie Tickets</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Momos">Momos</option>
                    <option value="Hygienic products">Hygienic products</option>
                    <option value="Footwears">Footwears</option>
                    <option value="Electronic Gadgets">
                      Electronic Gadgets
                    </option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Spectacles">Spectacles</option>
                  </select>
                  <h1 className="compName">Recently Listed:</h1>
                  {recentData.map((item) => (
                    <>
                      <span
                        onClick={() => setHighlightedData(item)}
                        className="compName"
                        key={item._id}
                      >
                        {item.name}
                      </span>
                      <br></br>
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {highlightedData ? (
          <>
            <div className="highlighted-data">
              <div className="highlighted-card">
                <img
                  src={highlightedData.logo}
                  alt="Company Logo"
                  className="company-logo"
                />
                <div className="company-name highcompany">
                  {highlightedData.name}
                </div>
                <div className="tagline hightagline">
                  {highlightedData.tagline}
                </div>
                <div className="category">
                  <strong>Category:</strong> {highlightedData.category}
                </div>
                <div className="description">
                  <strong>Description:</strong> {highlightedData.description}
                </div>
                <div className="products">
                  <strong>Products and Services Offered:</strong>{" "}
                  {highlightedData.products_or_services}
                </div>
                <div className="locations">
                  <strong>Office Available At:</strong>{" "}
                  {highlightedData.location}
                </div>
                <div className="contact">
                  <strong>Contact:</strong>{" "}
                  <a className="link" href={highlightedData.contact}>
                    {highlightedData.name}
                  </a>
                </div>
                <div className="row">
                  <div className="best-sellers">
                    <strong>Best Sellers:</strong>
                    <ul>
                      {highlightedData.best_sellers.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="platforms">
                    <strong>Available Platforms:</strong>
                    <ul>
                      {highlightedData.platforms.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button onClick={goBack}>Back</button>
              </div>
            </div>
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <><div className="gears" id="two-gears">
                  <div className="gears-container">
                    <div className="gear-rotate"></div>
                    <div className="gear-rotate-left"></div>
                  </div>
                </div>
                <p className="intro">
                  "India is home to a thriving startup ecosystem, with countless
                  innovative companies making waves in various industries. India
                  Startup Hub is a platform dedicated to promoting and
                  showcasing the diverse range of startups and brands that are
                  contributing to India's growth story."
                </p>
              </>
            )}
            <div className="company-cards">
              {data.length > 0 ?<>{data.map((item) => (
                <Card
                  details={item}
                  handleCardClick={handleCardClick}
                  key={item._id}
                />
              ))}</>:<><img className="noData" src={noData} alt="no-data" /></>}
              
            </div>
          </>
        )}
        <p className="intro">
        Explore our website to find out more about the latest
        startups, success stories, industry trends, and opportunities
        in the Indian startup ecosystem. Join us in celebrating the
        spirit of entrepreneurship and innovation in India!</p>
      </div>
    </div>
  );
};

export default Home;
