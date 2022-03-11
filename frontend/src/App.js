import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import LoginPage from "main/pages/LoginPage";
import ProfilePage from "main/pages/ProfilePage";

import AdminUsersPage from "main/pages/AdminUsersPage";
import AdminCreateCommonsPage from "main/pages/AdminCreateCommonsPage";
import AdminListCommonsPage from "main/pages/AdminListCommonPage";
import { hasRole, useCurrentUser } from "main/utils/currentUser";
import PlayPage from "main/pages/PlayPage"; 

function App() {

  const { data: currentUser } = useCurrentUser();

  return (
      <BrowserRouter>
        <Routes>
          { 
            (hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_USER")) && <Route path="/" element={<HomePage />} />
          }
          { 
            !(hasRole(currentUser, "ROLE_ADMIN") || hasRole(currentUser, "ROLE_USER")) && <Route path="/" element={<LoginPage />} />
          }
          <Route path="/profile" element={<ProfilePage />} />
          {
            hasRole(currentUser, "ROLE_ADMIN") && <Route path="/admin/users" element={<AdminUsersPage />} />
          }
          {
            hasRole(currentUser, "ROLE_ADMIN") && <Route path="/admin/createcommons" element={<AdminCreateCommonsPage />} />
          }
          {
            hasRole(currentUser, "ROLE_ADMIN") && <Route path="/admin/listcommons" element={<AdminListCommonsPage />} />
          }
          <Route path="/play/:commonsId" element={<PlayPage />} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
