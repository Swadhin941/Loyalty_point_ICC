import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from './Components/Layout/Main';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/details",
          element: <Details></Details>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
