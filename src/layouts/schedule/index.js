import React from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ScheduleCalendar from "./ScheduleCalendar";

function Schedule() {
  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ScheduleCalendar />
    </DashboardLayout>
  );
}

export default Schedule;
