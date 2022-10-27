import MDBox from "components/MDBox";
import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Checkbox, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useQuery } from "urql";

const DATA_QUERY_SCHEDULE = `
query ($subjectCode: Int!, $groupNumber: Int!) {
    ins_getSchedulesOfGroup(subjectCode: $subjectCode, groupNumber: $groupNumber) {
      subjectGroup {
        number
        subject {
          name
        }
      }
      schedule {
        start_time
        end_time
        day
        id
      }
    }
}`;

function ScheduleData(props) {
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_SCHEDULE,
    variables: {
      subjectCode: parseInt(props.group.split("-")[1]),
      groupNumber: parseInt(props.group.split("-")[0]),
    },
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return <MDBox />;
  }

  if (error) {
    return <MDBox />;
  }

  const listSchedulesOfGroup = data.ins_getSchedulesOfGroup;

  const columns = [
    { Header: "Dia", accessor: "Dia", align: "right" },
    { Header: "Hora Inicio", accessor: "HoraInicio", align: "center" },
    { Header: "Hora Fin", accessor: "HoraFin", align: "left" },
  ];
  const rows = listSchedulesOfGroup.map((element) => ({
    Dia: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {element.schedule.day}
      </MDTypography>
    ),
    HoraInicio: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {element.schedule.start_time}
      </MDTypography>
    ),
    HoraFin: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {element.schedule.end_time}
      </MDTypography>
    ),
  }));

  listSchedulesOfGroup.map((element) => props.selectedSchedules.push(element.schedule.id));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Grupo "+(listSchedulesOfGroup[0].subjectGroup.number).toString()+" "+(listSchedulesOfGroup[0].subjectGroup.subject.name).toString()} />
        </ListItemButton>
      </AccordionSummary>
      <AccordionDetails>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </AccordionDetails>
    </Accordion>
  );
}

class ScheduleTableData extends React.Component {
  render() {
    return <ScheduleData {...this.props} />;
  }
}

export default ScheduleTableData;
