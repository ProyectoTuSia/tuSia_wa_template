/* eslint-disable react/prop-types */
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

const DATA_QUERY_GROUPS = `
query ($subjectCode: Int!) {
    ins_getAllGroupsOfSubject(subjectCode: $subjectCode) {
      number
      slots
      subject {
        name
        code
      }
    }
  }`;

function GroupsData(props) {
  /*
  const shouldPause =
    selectedSubjects[0] === undefined ||
    selectedSubjects.length === 0 ||
    selectedSubjects === undefined;

  */

  const checkGroup = (event) => {
    if (event.target.checked) {
      // Si esta checkeado agregarlo a la lista de checkeados
      props.selectedGroups.push(event.target.id);
    } else {
      // Si ya no esta checkeado quitarlo de la lista de checkeados
      props.selectedGroups.splice(props.selectedGroups.indexOf(event.target.id), 1);
    }
  };

  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_GROUPS,
    variables: {
      subjectCode: parseInt(props.subjectCode),
    },
    requestPolicy: "network-only",
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return <MDBox />;
  }

  if (error) {
    return <MDBox />;
  }

  const listGroupsOfSubject = data.ins_getAllGroupsOfSubject;

  const columns = [
    { Header: "Seleccionar", accessor: "Seleccionar", align: "right" },
    { Header: "Número", accessor: "Numero", align: "center" },
    { Header: "Cupos", accessor: "Cupos", align: "left" },
  ];

  const rows = listGroupsOfSubject.map((element) => ({
    Seleccionar: (
      <MDBox ml={-1}>
        <Checkbox
          id={element.number.toString() + "-" + element.subject.code.toString()}
          onChange={checkGroup}
        />
      </MDBox>
    ),
    Numero: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {element.number}
      </MDTypography>
    ),
    Cupos: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {element.slots}
      </MDTypography>
    ),
  }));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={data.ins_getAllGroupsOfSubject[0].subject.name} />
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

class GroupsTableData extends React.Component {
  render() {
    return <GroupsData {...this.props} />;
  }
}

export default GroupsTableData;
