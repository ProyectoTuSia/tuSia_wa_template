/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import { useState, useEffect } from "react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditWeight from "../editWeight";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useQuery } from "urql";
import MDInput from "components/MDInput";

const DATA_QUERY = `
query Gm_getGroupGrades($courseCode: Int!, $groupCode: Int!) {
  gm_getGroupGrades(courseCode: $courseCode, groupCode: $groupCode) {
    username
  }
}
`;

export default function data() {
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY,
    variables: {
      courseCode: 2017257,
      groupCode: 1,
    },
    pause: true,
  });

  const Course = ({ name, courseGroup }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{courseGroup}</MDTypography>
      </MDBox>
    </MDBox>
  );


  return {
    columns: [
      { Header: "Description", accessor: "description", width: "45%", align: "left" },
      { Header: "Weight", accessor: "weight", align: "center" },
    ],

    rows: [
      {
        description: <MDInput name="d0" label="Descripción" id="description_1" />,
        weight: <MDInput name="w0" label="Peso" id="weight_1" type="number" />,
      },
    ],
  };
}
