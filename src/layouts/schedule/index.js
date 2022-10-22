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

const DEFAULT_MONTH_OPTIONS = {
  dayNames: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
  visibleWeeksCount: 0,
  workweek: false,
  narrowWeekend: false,
  startDayOfWeek: 0,
  isAlways6Weeks: false,
  visibleEventCount: 6,
};

const DEFAULT_THEME_OPTIONS = {
  month: {
    dayName: {
      backgroundColor: "rgba(240, 242, 245, 0.4)",
    },
  },
};

const template = {
  milestone(event) {
    return `<span style="color:#fff;background-color: ${event.backgroundColor};">${event.title}</span>`;
  },
  milestoneTitle() {
    return "Milestone";
  },
  allday(event) {
    return `${event.title}<i class="fa fa-refresh"></i>`;
  },
  alldayTitle() {
    return "All Day";
  },
};

function Schedule() {
  const calendars = [
    {
      id: "1",
      name: "My Calendar",
      color: "#ffffff",
      bgColor: "#9e5fff",
      dragBgColor: "#9e5fff",
      borderColor: "#9e5fff",
    },
    {
      id: "2",
      name: "Company",
      color: "#ffffff",
      bgColor: "#00a9ff",
      dragBgColor: "#00a9ff",
      borderColor: "#00a9ff",
    },
  ];

  const initialEvents = [
    {
      id: "1",
      calendarId: "cal1",
      title: "Lunch",
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
              theme={DEFAULT_THEME_OPTIONS}
              eventFilter={(event) => event.isVisible && event.isAllday}
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
