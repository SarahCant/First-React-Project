import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";
import UserDetailPage from "./pages/UserDetailPage";
import UserUpdatePage from "./pages/UserUpdatePage";

function App() {
  return (
    <main className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="users/:id/update" element={<UserUpdatePage />} />
      </Routes>
    </main>
  );
}

export default App;
