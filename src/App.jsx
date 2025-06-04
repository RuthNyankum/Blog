import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import AddNewPage from './pages/AddNewPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'blog',
        Component: BlogPage,
      },
      {
        path: 'add-new',
        Component: AddNewPage,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
