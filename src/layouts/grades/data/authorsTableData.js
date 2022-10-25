/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditWeight from "../editWeight";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useNavigate, Navigate, Link } from "react-router-dom";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useQuery } from "urql";
import { useState, useEffect } from "react";

const DATA_QUERY = `query Query($professorUsername: String!) {
  gm_getProfessorGroups(professorUsername: $professorUsername) {
    courseName
    courseCode
    groupNumber
    
  }
}
`;

export default function data() {
  const navigate = useNavigate();

  const [selectedCourse, setselectedCourse] = useState(() => ({
    courseName: "",
    courseCode: "",
    courseGroup: "",
  }));

  const toComponentB = () => {
    // console.log("hi desde authors");
    navigate("/editWeight", { state: { id: 1, name: "sabaoon" } });
  };
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY,
    variables: {
      professorUsername: "arondonz",
    },
    pause: true,
  });
  // Data, fetching and error of the query
  const { data, fetching, error } = result;
  if (data) {
    console.log(data["gm_getProfessorGroups"][0]);
  }

  useEffect(() => {
    // if (result.fetching) return;

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery();
    }, 3000);
    // const { data, fetching, error } = result;
    // console.log(data);
    return () => clearTimeout(timerId);
  }, [result.fetching, reexecuteQuery, data]);

  const Course = ({ name, courseGroup }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">Grupo: {courseGroup}</MDTypography>
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
      { Header: "Cursos", accessor: "course", width: "45%", align: "left" },
      { Header: "Editar ponderación", accessor: "editWeight", align: "center" },
      { Header: "Subir notas", accessor: "uploadGrades", align: "center" },
      { Header: "Consolidar notas", accessor: "consolidateGrades", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: data
      ? data["gm_getProfessorGroups"].map((course) => {
          return {
            course: (
              <Course image={team2} name={course.courseName} courseGroup={course.groupNumber} />
            ),
            // function: <Job title="Manager" description="Organization" />,
            editWeight: (
              <Link to="/editWeight" state={{ course }}>
                <MDTypography
                  // component="EditWeight"
                  onClick={() => {
                    toComponentB();
                  }}
                  // Navigate
                  // to="/editWeight, {id: 1}"
                  href="/editWeight "
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                >
                  Editar
                </MDTypography>
              </Link>
            ),
            uploadGrades: (
              <MDTypography
                component="a"
                href="/uploadGrades"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Editar
              </MDTypography>
            ),
            consolidateGrades: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Consolidar
              </MDTypography>
            ),
          };
        })
      : [
          {
            course: <Course image={team2} name="Course Name" courseGroup="Course Group" />,

            editWeight: (
              <MDTypography
                component="a"
                href="/"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Editar
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
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Consolidate
              </MDTypography>
            ),
          },
        ],
    // [
    // ],
  };
}
