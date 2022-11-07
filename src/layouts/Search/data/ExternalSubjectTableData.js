/* eslint-disable react/prop-types */
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

const DATA_QUERY_SUBJECTS = `
query GetSubject {
  getSubject {
    Id_subject
    Name_subject
    Typology
    Credits
    Description
    Id_career
    Id_condition
  }
}`;

function SubjectsData(searchid, searchname) {
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_SUBJECTS,
    requestPolicy: "network-only",
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return {
      columns: [],
      rows: [],
    };
  }

  if (error) {
    return {
      columns: [],
      rows: [],
    };
  }

  const listSubject =
    !searchid && !searchname
      ? data.getSubject
      : data.getSubject.filter(
          (dato) =>
            (dato.Id_subject.toString().includes(searchid) && searchid) ||
            (dato.Name_subject.toLowerCase().includes(searchname.toLocaleLowerCase()) && searchname)
        );

  //listSchedulesOfGroup.map((element) => props.selectedSchedules.push(element.schedule.id));

  return {
    columns: [
      { Header: "ID", accessor: "Id_subject", align: "right" },
      { Header: "Nombre Materia", accessor: "Name_subject", align: "center" },
      { Header: "Typologia", accessor: "Typology", align: "left" },
      { Header: "Creditos", accessor: "Credits", align: "left" },
      { Header: "Descripcion", accessor: "Descripcion", align: "left" },
      { Header: "Carrera", accessor: "Id_career", align: "left" },
    ],
    rows: listSubject.map((element) => ({
      Id_subject: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.Id_subject}
        </MDTypography>
      ),
      Name_subject: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.Name_subject}
        </MDTypography>
      ),
      Typology: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.Typology}
        </MDTypography>
      ),
    })),
  };
}

export default SubjectsData;
