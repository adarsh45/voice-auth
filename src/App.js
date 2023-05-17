import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterVoice from "./pages/RegisterVoice";
import Landing from "./pages/Landing";
import Container from "./components/Container";
import LoginVoice from "./pages/LoginVoice";
import { ToastContainer } from "react-toastify";
import SuccessPage from "./pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container>
        <Landing />
      </Container>
    ),
  },
  {
    path: "/register",
    element: (
      <Container>
        <RegisterVoice />
      </Container>
    ),
  },
  {
    path: "/login",
    element: (
      <Container>
        <LoginVoice />
      </Container>
    ),
  },
  {
    path: "/home/:name",
    element: (
      <Container>
        <SuccessPage />
      </Container>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
