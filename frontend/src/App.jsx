import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Layout from "./pages/Main Layout/MainLayout";
import ProfileLayout from "./pages/Profile Layout/ProfileLayout";
import Error from "./pages/Error/Error";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile Edit/EditProfile";
import ChangePassword from "./pages/Change Password/ChangePassword";
import Authentication from "./pages/Authentication/Authentication";
import ImageUploader from "./pages/Chat/ImageUploader";
import { AuthProvider } from "./context/AuthContext";
import ChatLayout from "./pages/Chat Layout/ChatLayout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "profile",
          element: <ProfileLayout />,
          children: [
            { index: true, element: <Profile /> },
            { path: ":id/edit", element: <EditProfile /> },
            { path: "change-password", element: <ChangePassword /> },
          ],
        },
        {
          path: "chat",
          element: <ChatLayout />,
          children: [
            { index: true, element: <Chat /> },
            { path: "image", element: <ImageUploader /> },
          ],
        },
        { path: "auth", element: <Authentication /> },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
