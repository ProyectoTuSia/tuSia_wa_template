/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
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

const DATA_QUERY_LOGIN = `
query Gm_getGroupGrades($courseCode: Int!, $groupCode: Int!) {
  gm_getGroupGrades(courseCode: $courseCode, groupCode: $groupCode) {
    username
  }
}
`;

export default function data() {
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

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Course", accessor: "course", width: "45%", align: "left" },
      { Header: "Edit Weight", accessor: "editWeight", align: "center" },
      { Header: "Upload Grades", accessor: "uploadGrades", align: "center" },
      { Header: "Consolidate Grades", accessor: "consolidateGrades", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        course: <Course image={team2} name="Course Nanme" courseGroup="course group" />,
        function: <Job title="Manager" description="Organization" />,
        editWeight: (
          <MDTypography
            component="a"
            href="/editWeight"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
        uploadGrades: (
          <MDTypography
            component="a"
            href="/uploadGrades"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
        consolidateGrades: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Consolidate
          </MDTypography>
        ),
      },
    ],
  };
}
