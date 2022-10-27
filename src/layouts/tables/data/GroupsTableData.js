import MDBox from "components/MDBox";
import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Checkbox } from "@mui/material";
import { useQuery } from "urql";
import jwtDecode from "jwt-decode";

const DATA_QUERY_GROUPS = `
query ($subjectCode: Int!) {
    ins_getAllGroupsOfSubject(subjectCode: $subjectCode) {
      number
      slots
      subject {
        name
      }
    }
  }`;

export default function GroupsData(selectedSubjects) {

  const shouldPause= selectedSubjects[0] === undefined || selectedSubjects.length === 0 || selectedSubjects === undefined;
  
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_GROUPS,
    variables: {
      subjectCode: parseInt(selectedSubjects[0]),
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
      { Header: "Seleccionar", accessor: "Seleccionar", align: "right" },
      { Header: "Código", accessor: "Codigo", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
    ],

    rows: [
      {
        Seleccionar: (
          <MDBox ml={-1}>
            <Checkbox />
          </MDBox>
        ),
        Codigo: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {data ? data.ins_getAllGroupsOfSubject[0].number : ""}
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {data ? data.ins_getAllGroupsOfSubject[0].slots : ""}
          </MDTypography>
        ),
      },
    ],
  };

}
