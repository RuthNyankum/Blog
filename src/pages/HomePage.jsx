import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch all blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/addNew');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    // Fetch only favourites
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/addNew?isFavorite=true'
        );
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchBlogs();
    fetchFavorites();
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* All Blogs Section */}
      <div>
        <h2 className="text-xl text-center font-bold mb-4">All Blog Posts</h2>
        {blogs.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="p-[2px] rounded shadow-sm bg-gradient-to-r from-[#0B394B] to-[#67E8F9]"
              >
                <div className="p-4 rounded bg-white">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-700">
                    {truncateText(blog.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Favourites Section */}
      <div>
        <h2 className="text-xl text-center font-bold mb-4">Favourite Posts</h2>
        {favorites.length === 0 ? (
          <p>No favourites found.</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="p-[2px] rounded shadow-sm bg-gradient-to-r from-[#0B394B] to-[#67E8F9]"
              >
                <div className="bg-white rounded p-4">
                  <h3 className="text-lg font-semibold">{fav.title}</h3>
                  <p className="text-gray-700">
                    {truncateText(fav.description)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
