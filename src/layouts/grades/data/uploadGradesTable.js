/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditWeight from "../editWeight";

// Images
import team2 from "assets/images/team-2.jpg";

import { useMutation, useQuery } from "urql";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Grade from "./Grade";
import Snackbar from "@mui/material/Snackbar";

const DATA_QUERY = `
query Gm_getGroupGrades($courseCode: Int!, $groupCode: Int!) {
  gm_getGroupGrades(courseCode: $courseCode, groupCode: $groupCode) {
    description
    weight
    username
    value
  }
}
`;

const DATA_QUERY_USER_GRADE = `query Gm_getStudentGradesInGroup($courseCode: Int!, $groupCode: Int!, $username: String!) {
  gm_getStudentGradesInGroup(courseCode: $courseCode, groupCode: $groupCode, username: $username) {
    description
    weight
  }
}`;

const DATA_MUTATION_USER_GRADES = `mutation Mutation($courseCode: Int!, $courseGroup: Int!, $grades: gm_GradesInput!) {
  gm_updateStudentsGrades(courseCode: $courseCode, courseGroup: $courseGroup, grades: $grades) {
    status
    grades {
      weight
      description
      value
    }
  }
}`;

export default function data() {
  let studentNames = [];
  const token = localStorage.getItem("token");
  let email = jwt_decode(token).email;
  email = email.split("@")[0];

  const [open, setOpen] = useState(false);
  const {
    state: { course },
  } = useLocation();

  const [userGrades, setUserGrades] = useState([]);
  const [nameUser, setnameUser] = useState("");
  const [snackopen, setsnackOpen] = useState(false);

  const [submitMutationResult, submitMutation] = useMutation(DATA_MUTATION_USER_GRADES);

  const [result, studentsQuery] = useQuery({
    query: DATA_QUERY,
    variables: {
      courseCode: course.courseCode,
      groupCode: course.groupNumber,
    },
  });
  // Data, fetching and error of the query
  const { data, fetching, error } = result;

  useEffect(() => {
    const timerId = setTimeout(() => {
      studentsQuery();
    }, 4000);
    const { data, fetching, error } = result;
    return () => clearTimeout(timerId);
  }, [result.fetching, studentsQuery, data]);

  if (data) {
    console.log(data, "data");
    data["gm_getGroupGrades"].forEach((student) => {
      if (student) {
        let username = student.username;
        if (!studentNames.includes(username)) {
          studentNames.push(username);
        }
      }
    });
  }
  const handleSnackClick = () => {
    setsnackOpen(true);
  };

  const handlesnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackOpen(false);
  };

  const handleClickOpen = (username) => {
    let auxUserGrades = [];
    console.log(username, "from handle");
    setnameUser(username);
    data["gm_getGroupGrades"].forEach((student) => {
      if (student) {
        if (username == student.username) {
          auxUserGrades.push(student);
        }
      }
    });

    setUserGrades(auxUserGrades);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handlesnackClose();
  };

  const handleUpdate = () => {
    let aux_gm_GradesInput = [];

    userGrades.forEach((grade) => {
      let aux = {
        student_username: nameUser,
        // professor_username: email,
        professor_username: "arondonz",

        weight: grade.weight,
        description: grade.description,
        value: grade.value,
      };

      aux_gm_GradesInput.push(aux);
      console.log(aux_gm_GradesInput, "aux_gm_GradesInput");
    });

    let gm_GradesInput = {
      grades: aux_gm_GradesInput,
    };

    let variables = {
      courseCode: course.courseCode,
      courseGroup: course.groupNumber,
      grades: gm_GradesInput,
    };

    console.log(variables, "variables");

    submitMutation(variables).then((submitMutationResult) => {
      if (submitMutationResult.error) {
        console.error("Oh no!", submitMutationResult.error);
      }
      handleSnackClick();
      console.log(submitMutationResult);
    });
  };

  const getUserGrades = (username) => {
    data["gm_getGroupGrades"].forEach((student) => {
      if (username == student.username) {
        userGrades.push(student);
      }
    });
    // console.log(userGrades, "userGrades");
    // return userGrades;
  };

  const Student = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Nombre", accessor: "nombre", width: "70%", align: "left" },
      { Header: "Editar notas", accessor: "editar", align: "center" },
    ],

    rows: studentNames
      ? studentNames.map((username) => {
          return {
            nombre: <Student name={username} />,
            editar: (
              <>
                <MDButton onClick={() => handleClickOpen(username)} color="primary">
                  Editar
                </MDButton>
                <Dialog open={open} onClose={handleClose} fullWidth="true">
                  <DialogTitle style={{ justifyContent: "center" }}>{nameUser}</DialogTitle>
                  <Grid container justifyContent={"space-between"}>
                    <Grid>
                      {userGrades ? (
                        userGrades.map((grade) => (
                          <Grade
                            key={grade.description}
                            description={grade.description}
                            value={grade.value}
                            grades={userGrades}
                            setGrade={setUserGrades}
                          ></Grade>
                        ))
                      ) : (
                        <MDButton>Cargando...</MDButton>
                      )}
                    </Grid>
                  </Grid>

                  <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={() => handleUpdate({ username })}>Actualizar</Button>
                    <Snackbar open={snackopen} onClose={handlesnackClose}>
                      <Alert onClose={handlesnackClose} severity="success" sx={{ width: "100%" }}>
                        Se actualizaron las notas!
                      </Alert>
                    </Snackbar>
                  </DialogActions>
                </Dialog>
              </>
            ),
          };
        })
      : [
          {
            nombre: <Student name={"nombre estudiante"} />,
            editar: <MDButton color="primary">Editar</MDButton>,
          },
        ],
  };
}
