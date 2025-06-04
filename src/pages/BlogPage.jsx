import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = 'http://localhost:5000/addNew';

const BlogPage = () => {
  const [addNew, setAddNew] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setAddNew(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mt-8 w-full max-w-md space-y-4">
        {addNew.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
