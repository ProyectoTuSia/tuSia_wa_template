import MDBox from "components/MDBox";
import React, { useState } from 'react';
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Checkbox } from "@mui/material";
import { useQuery } from "urql";

const DATA_QUERY_SUBJECTS = `
query($careerCode: Int!, $username: String!) {
  ins_getStudentNotCoursedSubjectsInCareer(careerCode: $careerCode, username: $username) {
    subject {
      code
      name
    }
    typology
  }
}`;

export default function SubjectsData(username, careerCheckList) {
  
  //Definir cuando no deberia hacerse la query
  const shouldPause = username === undefined || careerCheckList === [];
  
  //Traer las asignaturas no cursadas por un estudiante
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_SUBJECTS,
    variables: {
      careerCode: parseInt(careerCheckList[0]),
      username,
    },
    pause: shouldPause,
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

  console.log(data);

  return {
    columns: [
      { Header: "Check", accessor: "Check", align: "right" },
      { Header: "Id", accessor: "Id", align: "center" },
      { Header: "Typology", accessor: "Typology", align: "left" },
    ],

    rows: [
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox> </Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            1
          </MDTypography>
        ),
        Typology: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Empanada
          </MDTypography>
        ),
      },
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox id={1}> </Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            2
          </MDTypography>
        ),
        Typology: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Arepa
          </MDTypography>
        ),
      },
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox> </Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            3
          </MDTypography>
        ),
        Typology: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Rellena
          </MDTypography>
        ),
      },
    ],
  };
}
