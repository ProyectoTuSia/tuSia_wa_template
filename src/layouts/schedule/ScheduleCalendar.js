/* eslint-disable prefer-object-spread */
/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Footer from "examples/Footer";
import MDAlert from "components/MDAlert";

// Calendar component and CSS styles
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

// JWT Decode
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

// Graphql connection
import { useQuery } from "urql";

// Epic Spinner
import { FingerprintSpinner } from "react-epic-spinners";

import "./style.css";

// Query to get the schedule of the user
const DATA_QUERY_SCHEDULE = `
query($userId: String!) {
  sc_getSchedule(userId: $userId) {
    monday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
    tuesday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
    wednesday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
    thursday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
    friday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
    saturday {
      name
      professor
      courseId
      building
      classroom
      group
      timetable
    }
  }
}
`;

// Configure options for the calendar (week view)
const WEEK_OPTIONS = {
  taskView: false,
  hourStart: 6,
  hourEnd: 21,
  dayNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
};

// Configure options for the calendar (month view)
const MONTH_OPTIONS = {
  dayNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
};

// Configure options for the calendar theme
const DEFAULT_THEME_OPTIONS = {
  week: {
    dayName: {
      backgroundColor: "rgba(240, 242, 245, 0.4)",
    },
  },
};

// Function to obtain the first day of the week
function getFirstDayOfWeek(date) {
  return new Date(date.setDate(date.getDate() - date.getDay()));
}

// Function to create events for the entire academic calendar
function distributeEventsInSemester(data) {
  const events = [];
  const endDateOfSemester = new Date("2022-12-03T00:00:00");
  const currentDate = getFirstDayOfWeek(new Date());

  for (const event in data) {
    for (const i in data[event]) {
      const firstEvent = { ...data[event][i] };
      firstEvent.start = firstEvent.start.toISOString();
      firstEvent.end = firstEvent.end.toISOString();
      events.push(firstEvent);

      while (data[event][i].start < endDateOfSemester) {
        const newEvent1 = Object.assign({}, data[event][i]);
        const newEvent2 = Object.assign({}, data[event][i]);
        newEvent1.start.setDate(newEvent1.start.getDate() + 2);
        newEvent1.end.setDate(newEvent1.end.getDate() + 2);

        newEvent1.start = newEvent1.start.toISOString();
        newEvent1.end = newEvent1.end.toISOString();

        newEvent2.start.setDate(newEvent2.start.getDate() + 5);
        newEvent2.end.setDate(newEvent2.end.getDate() + 5);

        newEvent2.start = newEvent2.start.toISOString();
        newEvent2.end = newEvent2.end.toISOString();

        events.push(newEvent1);
        events.push(newEvent2);

        // eslint-disable-next-line no-param-reassign
      }
    }
  }
  events.pop();
  return events;
}

// Transform the data from the query to the format that the calendar needs
function createEvents(data) {
  const events = {};

  let colours = ["#00A9FF", "#F2B34C", "#F2B34C", "#34C38F", "#F4696A", "#FF5583", "#9D9D9D"];

  const dateNow = new Date();

  for (const days in data) {
    if (data[days].length > 0 && days !== "__typename") {
      const array = [];

      for (const i in data[days]) {
        const colorSelected = colours[Math.floor(Math.random() * colours.length)];
        colours = colours.filter((item) => item !== colorSelected);

        let dateStart;
        let dateEnd;

        if (days === "monday") {
          dateStart = getFirstDayOfWeek(dateNow);
          dateStart.setDate(dateStart.getDate() + 1);

          dateEnd = getFirstDayOfWeek(dateNow);
          dateEnd.setDate(dateEnd.getDate() + 1);
        } else if (days === "tuesday") {
          dateStart = getFirstDayOfWeek(dateNow);
          dateStart.setDate(dateStart.getDate() + 2);

          dateEnd = getFirstDayOfWeek(dateNow);
          dateEnd.setDate(dateEnd.getDate() + 2);
        } else if (days === "wednesday") {
          dateStart = getFirstDayOfWeek(dateNow);
          dateStart.setDate(dateStart.getDate() + 3);

          dateEnd = getFirstDayOfWeek(dateNow);
          dateEnd.setDate(dateEnd.getDate() + 3);
        }

        dateStart.setHours(data[days][i].timetable.split("-")[0].split(":")[0], 0, 0, 0);
        dateEnd.setHours(data[days][i].timetable.split("-")[1].split(":")[0], 0, 0, 0);

        const event = {
          title: `${data[days][i].name} - ${data[days][i].courseId}`,
          start: dateStart,
          end: dateEnd,
          location: `${data[days][i].building} - ${data[days][i].classroom}`,
          body: `Grupo ${data[days][i].group}`,
          attendees: [data[days][i].professor],
          color: "#ffffff",
          backgroundColor: colorSelected,
          dragBackgroundColor: colorSelected,
          state: "",
        };
        array.push(event);
      }
      events[days] = array;
    }
  }

  return distributeEventsInSemester(events);
}

// Get the email claim from the token
function getEmailToken() {
  let mail = jwt_decode(localStorage.getItem("token")).email;
  mail = mail.replace(/@.*/, "");
  return mail;
}

function ScheduleCalendar() {
  const [result] = useQuery({
    query: DATA_QUERY_SCHEDULE,
    variables: {
      userId: getEmailToken(),
    },
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <div className="container--loader">
        <FingerprintSpinner color="red" size={100} />
      </div>
    );
  }

  if (error) {
    return (
      <MDAlert color="error">
        <Icon fontSize="small">nearby_error</Icon>&nbsp; {error.message}
      </MDAlert>
    );
  }

  const calendarRef = React.createRef();

  const handleClickPrevButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.prev();
  };

  const handleClickNextButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.next();
  };

  const handleClickTodayButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.today();
  };

  const handleClickDailyButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.changeView("day");
  };

  const handleClickWeeklyButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.changeView("week");
  };

  const handleClickMonthButton = () => {
    const calendarInstance = calendarRef.current.getInstance();

    calendarInstance.changeView("month");
  };

  const dataCalendar = createEvents(data.sc_getSchedule);

  return (
    <div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDButton
              variant="gradient"
              color="info"
              onClick={handleClickPrevButton}
              style={{ marginRight: "15px" }}
            >
              <Icon>arrow_back_ios</Icon>
            </MDButton>
            <MDButton
              variant="gradient"
              color="info"
              onClick={handleClickNextButton}
              style={{ marginRight: "50px" }}
            >
              <Icon>arrow_forward_ios</Icon>
            </MDButton>
            <MDButton
              variant="gradient"
              color="info"
              onClick={handleClickTodayButton}
              style={{ marginRight: "50px" }}
            >
              <Icon>today</Icon>&nbsp; Hoy
            </MDButton>
            <MDButton
              variant="gradient"
              color="primary"
              style={{ marginRight: "20px" }}
              onClick={handleClickDailyButton}
            >
              <Icon>view_day</Icon>&nbsp; Diario
            </MDButton>
            <MDButton
              variant="gradient"
              color="primary"
              style={{ marginRight: "20px" }}
              onClick={handleClickWeeklyButton}
            >
              <Icon>calendar_view_week</Icon>&nbsp; Semanal
            </MDButton>
            <MDButton variant="gradient" color="primary" onClick={handleClickMonthButton}>
              <Icon>calendar_month</Icon>&nbsp; Mensual
            </MDButton>
            <MDBox mt={4} mb={1}>
              <Calendar
                id="calendar1"
                ref={calendarRef}
                height="900px"
                usageStatistics={false}
                task={false}
                view="week"
                isReadOnly="true"
                useDetailPopup="true"
                theme={DEFAULT_THEME_OPTIONS}
                week={WEEK_OPTIONS}
                month={MONTH_OPTIONS}
                events={dataCalendar}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </div>
  );
}

export default ScheduleCalendar;
