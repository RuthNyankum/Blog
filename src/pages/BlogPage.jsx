import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = 'http://localhost:5000/addNew';

const BlogPage = () => {
  const [addNew, setAddNew] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
      <main className="flex gap-6">
        <div className="mt-8 w-full max-w-md space-y-4">
          {addNew.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBlog(item)}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-6 h-fit">
          {selectedBlog ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {selectedBlog.title}
              </h2>
              <p className="text-gray-700">{selectedBlog.description}</p>
            </>
          ) : (
            <div className="text-center text-gray-400 italic">
              <p>No blog selected yet.</p>
              <p className="mt-2">
                Click on a blog from the left to view full content here.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogPage;
