/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import React, { useRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomTuiCalendar from "./components/CustomTuiCalendar";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const schedules = [
  {
    id: "1",
    title: "Mua nuoc dum",
    calendarId: "1",
    category: "time",
    attendees: ["Chin"],
    isVisible: true,
    start,
    end,
  },
  {
    id: "2",
    title: "Di lau nha",
    calendarId: "2",
    category: "time",
    attendees: ["Khanh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
  {
    id: "3",
    title: "Di don phong",
    calendarId: "3",
    category: "time",
    attendees: ["Hai"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 4)),
  },
  {
    id: "4",
    title: "Phai lam sao day",
    calendarId: "4",
    category: "time",
    attendees: ["Linh"],
    isVisible: true,
    start: new Date(new Date().setHours(start.getHours() + 2)),
    end: new Date(new Date().setHours(start.getHours() + 6)),
  },
];

const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F",
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A",
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C",
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D",
  },
  {
    id: "6",
    color: "#ffffff",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40",
  },
  {
    id: "7",
    color: "#000000",
    bgColor: "#FFFFFF",
    dragBgColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
];

const calendars = [
  {
    id: "1",
    name: "BPA Technical",
  },
  {
    id: "2",
    name: "Aqua 2 Cleaning",
  },
  {
    id: "3",
    name: "Aqua 4 Cleaning",
  },
  {
    id: "4",
    name: "Luxury 6 Cleaning",
  },
  {
    id: "5",
    name: "Luxury 6 Management",
  },
  {
    id: "6",
    name: "Aqua 3 Management",
  },
  {
    id: "7",
    name: "Aqua 2 Management",
  },
];

export default function Schedule() {
  const childRef = useRef();

  function onBeforeCreateSchedule(event) {
    // console.log('onBeforeCreateSchedule', event)
    event.guide.clearGuideElement();
  }

  function onBeforeUpdateSchedule(event) {
    // console.log('onBeforeUpdateSchedule', event)

    const { schedule, changes } = event;

    // resize & drag n drop
    if (changes) {
      // call api
      const result = true;
      if (result) {
        return childRef.current.updateSchedule(schedule, changes);
      }
    }
  }

  function onBeforeDeleteSchedule(event) {
    // console.log('onBeforeDeleteSchedule', event)

    // call api
    const result = true;

    if (result) {
      const { schedule } = event;
      childRef.current.deleteSchedule(schedule);
    }

    return true;
  }

  const formatCalendars = calendars.map((element) => ({
    ...colors.find((element2) => element2.id === element.id),
    ...element,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <div>
              <CustomTuiCalendar
                ref={childRef}
                {...{
                  isReadOnly: false,
                  showSlidebar: true,
                  showMenu: true,
                  useCreationPopup: false,
                  calendars: formatCalendars,
                  schedules,
                  onBeforeCreateSchedule,
                  onBeforeUpdateSchedule,
                  onBeforeDeleteSchedule,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
