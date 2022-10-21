/* eslint-disable no-unused-vars */
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Calendar component and CSS styles
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

function Schedule() {
  const calendars = [
    {
      id: "0",
      name: "Private",
      backgroundColor: "#9e5fff",
      borderColor: "#9e5fff",
    },
    {
      id: "1",
      name: "Company",
      backgroundColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
  ];

  const initialEvents = [
    {
      id: "1",
      calendarId: "cal1",
      title: "Lunch",
      category: "time",
      start: "2022-10-21T07:00:00",
      end: "2022-10-21T09:00:00",
    },
    {
      id: "2",
      calendarId: "cal1",
      title: "Coffee Break",
      category: "time",
      start: "2022-10-28T15:00:00",
      end: "2022-10-28T15:30:00",
    },
  ];

  const DEFAULT_MONTH_OPTIONS = {
    dayNames: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Weeks: false,
    visibleEventCount: 6,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Calendar
              id="calendar"
              height="900px"
              usageStatistics={false}
              view="month"
              isReadOnly="true"
              useDetailPopup="true"
              month={DEFAULT_MONTH_OPTIONS}
              calendars={calendars}
              events={initialEvents}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Schedule;
