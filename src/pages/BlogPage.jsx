// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// const API_URL = 'http://localhost:5000/addNew';

// const BlogPage = () => {
//   const [addNew, setAddNew] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [editForm, setEditForm] = useState({ title: '', description: '' });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setAddNew(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   function handleEdit(post) {
//     // TODO: Implement edit functionality
//     console.log('Edit clicked for:', post);
//   }

//   function handleDelete(postId) {
//     // TODO: Implement delete functionality
//     console.log('Delete clicked for ID:', postId);
//   }

//   return (
//     <>
//       <main className="flex flex-col lg:flex-row gap-6 mt-8 px-4 md:px-8 lg:px-16">
//         {/* Blog List Section */}
//         <div className="w-full lg:max-w-md space-y-4">
//           {addNew.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition"
//             >
//               {/* Title with inline buttons */}
//               <div className="flex justify-between items-center mb-2">
//                 <h3
//                   onClick={() => setSelectedBlog(item)}
//                   className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 flex-1 mr-2"
//                 >
//                   {item.title}
//                 </h3>

//                 {/* Inline Action Buttons */}
//                 <div className="flex gap-2 flex-shrink-0">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEdit(item);
//                     }}
//                     className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDelete(item.id);
//                     }}
//                     className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               {/* Description */}
//               <p
//                 onClick={() => setSelectedBlog(item)}
//                 className="text-gray-600 line-clamp-1 cursor-pointer"
//               >
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Selected Blog Section */}
//         <div className="w-full flex-1 bg-white rounded-lg shadow-md p-6">
//           {selectedBlog ? (
//             <>
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 {selectedBlog.title}
//               </h2>
//               <p className="text-gray-700">{selectedBlog.description}</p>
//             </>
//           ) : (
//             <div className="text-center text-gray-400 italic">
//               <p>No post selected yet.</p>
//               <p className="mt-2">
//                 Click on a post from the left to view full content here.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default BlogPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = 'http://localhost:5000/addNew';

const BlogPage = () => {
  const [addNew, setAddNew] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

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

  function handleEdit(post) {
    setEditingId(post.id);
    setEditForm({
      title: post.title,
      description: post.description,
    });
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to update the post
      const response = await axios.put(`${API_URL}/${editingId}`, editForm);

      // Update the local state with the edited post
      setAddNew((prev) =>
        prev.map((item) => (item.id === editingId ? response.data : item))
      );

      // Exit edit mode
      setEditingId(null);

      // Clear the edit form
      setEditForm({ title: '', description: '' });
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  async function handleDelete(postId) {
    const confirmDelete = confirm('Are you sure you want to do this');
    if (!confirmDelete) return;
    try {
      await axios.delete(`${API_URL}/${postId}`);
      setAddNew((prevAddNew) =>
        prevAddNew.filter((addNew) => addNew.id !== postId)
      );
    } catch (error) {
      console.log('Cannot delete user:', error);
    }
  }

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-6 mt-8 px-4 md:px-8 lg:px-16">
        {/* Blog List Section */}
        <div className="w-full lg:w-1/2 space-y-4">
          {addNew.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition"
            >
              {editingId === item.id ? (
                // Show edit form
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    Edit Post
                  </h4>
                  <form onSubmit={handleSaveEdit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none "
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none "
                        rows="3"
                        placeholder="Description"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#0B394B] text-white text-sm rounded hover:bg-[#52b2be] transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-[#52b2be] text-white text-sm rounded hover:bg-[#0B394B] transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3
                      onClick={() => setSelectedBlog(item)}
                      className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-[#20617a] flex-1 mr-2"
                    >
                      {item.title}
                    </h3>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className={`px-2 py-1 text-xs rounded transition ${
                          item.isFavorite
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {item.isFavorite ? '★ Fav' : '☆ Fav'}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        className="px-2 py-1 bg-[#20617a] text-white text-xs rounded hover:bg-[#52b2be] transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p
                    onClick={() => setSelectedBlog(item)}
                    className="text-gray-600 line-clamp-1 cursor-pointer"
                  >
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Blog Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          {selectedBlog ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {selectedBlog.title}
              </h2>
              <p className="text-gray-700">{selectedBlog.description}</p>
            </>
          ) : (
            <div className="text-center text-gray-400 italic">
              <p>No post selected yet.</p>
              <p className="mt-2">
                Click on a post from the left to view full content here.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogPage;

//CONTINUE TO INTERGRATE FAVOURITE
