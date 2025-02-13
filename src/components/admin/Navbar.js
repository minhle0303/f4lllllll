import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Navbar = ({ menuItems, onToggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = menuItems.filter((item) =>
        item.label.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleSuggestionClick = (path) => {
    navigate(path);  // Navigate to the clicked path
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredItems.length > 0) {
      // Navigate to the first filtered suggestion
      navigate(filteredItems[0].path);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredItems.length > 0) {
      // Redirect to the first filtered suggestion if form is submitted
      navigate(filteredItems[0].path);
    }
  };

  return (
    <nav>
      <i className="bx bx-menu" onClick={onToggleSidebar}></i> {/* Call onToggleSidebar when clicked */}
      <form action="" onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}  // Handle 'Enter' key press
          />
          <button className="search-btn" type="submit">
            <i className="bx bx-search"></i>
          </button>
        </div>
        {filteredItems.length > 0 && (
          <ul className="search-suggestions">
            {filteredItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => handleSuggestionClick(item.path)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </form>
      <input type="checkbox" id="theme-toggle" hidden />
      <label htmlFor="theme-toggle" className="theme-toggle"></label>
      <a href="#" className="notif">
        <i className="bx bx-bell"></i>
        <span className="count">12</span>
      </a>
      <a href="#" className="profile">
        <img src="././logo192.png" alt="Profile" />
      </a>
    </nav>
  );
};

export default Navbar;
