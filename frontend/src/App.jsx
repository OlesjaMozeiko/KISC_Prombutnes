import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import VacationCalendar from './pages/VacationCalendar';
import Holidays from './pages/Holidays';
import Login from './pages/Login';
import Menu from "./components/Menu";
import CreateVacation  from "./pages/CreateVacation";
import ShowVacation from "./pages/ShowVacation";
import {AuthProvider}  from "./components/AuthProvider";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import CreateEvent from "./pages/CreateEvent";
import ShowVacationTypes from "./pages/ShowVacationTypes";
import EditVacationType from "./pages/EditVacationType";
import EditDepartment from "./pages/EditDepartment";
import EditPosition from "./pages/EditPosition";
import EditEvent from "./pages/EditEvent";
import Instruction from "./pages/Instruction";


const App = () => {
  return (
    <div className="relative flex w-100 items-stretch min-h-screen">
      <AuthProvider>
        <Menu className="flex-none" />
        <div className="flex-1">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee" element={<EmployeeList />} />
              <Route path="/vacation" element={<VacationCalendar />} />
              <Route path="/holiday" element={<Holidays />} />
              <Route path="/login" element={<Login />} />
              <Route path="/help" element={<Instruction />} />

              <Route path="/vacation/create" element={<CreateVacation />} />
              <Route path="/vacation/show/:id" element={<ShowVacation />} />

              <Route path="/vacationtype/show" element={<ShowVacationTypes />} />
              <Route path="/vacationtype/edit/:id" element={<EditVacationType />} />

              <Route path="/employee/create" element={<CreateEmployee />} />
              <Route path="/employee/edit/:id" element={<EditEmployee />} />

              <Route path="/event/create" element={<CreateEvent />} />

              <Route path="/department/edit/:id" element={<EditDepartment />} />
              <Route path="/position/edit/:id" element={<EditPosition />} />

              <Route path="/event/edit/:id" element={<EditEvent />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  )
}

export default App