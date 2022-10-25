import MDBox from "components/MDBox";
import React, { useState } from 'react';
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Checkbox } from "@mui/material";
import { useQuery } from "urql";
import jwtDecode from "jwt-decode";

const DATA_QUERY_CAREER = `
query Ins_getCareersOfStudent($username: String!) {
  ins_getCareersOfStudent(username: $username) {
    career {
      code
      name
    }
  }
}`;

export default function data() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(jwtDecode(token).email.split("@")[0]);

  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_CAREER,
    variables: {
      username,
    },
    pause: true,
  });

  console.log(result);
  
  return {
    columns: [
      { Header: "Check:", accessor: "Check", align: "right" },
      { Header: "Id", accessor: "Id", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
    ],

    rows: [
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox></Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            454554
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Ingenieria de Sistemas
          </MDTypography>
        ),
      },
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox></Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            17174
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Ingenieria Agricola
          </MDTypography>
        ),
      },
      {
        Check: (
          <MDBox ml={-1}>
            <Checkbox></Checkbox>
          </MDBox>
        ),
        Id: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            12345
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Medicina
          </MDTypography>
        ),
      },
    ],
  };
}