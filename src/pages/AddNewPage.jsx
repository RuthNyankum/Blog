import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const API_URL = 'http://localhost:5000/addNew';

const AddNewPage = () => {
  const [addNew, setAddNew] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description } = form;

    if (!title || !description) return;
    try {
      //set isFavorite to false for new posts
      const postData = {
        ...form,
        isFavorite: false,
      };

      const response = await axios.post(API_URL, postData);
      navigate('/blog');
      setAddNew((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
    }
    setForm({ title: '', description: '' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setAddNew(response.data);
        setForm({
          title: '',
          description: '',
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        className="bg-[#0B394B] p-6 md:p-8 rounded-xl shadow-md w-full max-w-xl min-h-[500px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-[#67E8F9]">
          Add New Blog
        </h2>

        <div className="mb-7">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#67E8F9] mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            value={form.title}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, title: event.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-white"
          />
        </div>

        <div className="mb-7">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#67E8F9] mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter description"
            rows="6"
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#20617a] text-white py-2 px-4 rounded-lg hover:bg-[#52b2be] transition duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewPage;
