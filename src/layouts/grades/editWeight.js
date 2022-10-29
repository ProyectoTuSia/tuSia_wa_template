// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/grades/data/editWeightsTable";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";
import { Alert, Icon, Snackbar } from "@mui/material";
import MDInput from "components/MDInput";
import { useMutation, useQuery } from "urql";

const DATA_MUTATION = `
mutation Mutation($courseCode: Int!, $courseGroup: Int!, $weights: gm_WeightsInput!) {
  gm_updateGradeWeights(courseCode: $courseCode, courseGroup: $courseGroup, weights: $weights) {
    status
    weights{
      weight
      description
    }
  }
}
`;

function EditWeight() {
  const [idWeight, setIdWeight] = useState("weight_1");
  const [idDescription, setIdDescription] = useState("description_1");
  const [snackopen, setsnackOpen] = useState(false);

  const handleSnackClick = () => {
    setsnackOpen(true);
  };

  const handlesnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackOpen(false);
  };
  const {
    state: { course },
  } = useLocation();
  const { columns, rows: weightrows } = authorsTableData();

  const [rows, setrows] = useState(weightrows);
  useEffect(() => {
    // console.log(rows, "useEffectrows");
  }, [rows]);

  const [submitMutationResult, submitMutation] = useMutation(DATA_MUTATION);

  const handleAdd = () => {
    const newIdWeight = idWeight.replace(/(\d+)$/, function (match, number) {
      return parseInt(number) + 1;
    });

    const newIdDescription = idDescription.replace(/(\d+)$/, function (match, number) {
      return parseInt(number) + 1;
    });

    setIdWeight(newIdWeight);
    setIdDescription(newIdDescription);
    // console.log(document.getElementById("description_1").value, "value");

    setrows(
      rows.concat([
        {
          description: <MDInput name="d1" id={newIdDescription} label="Descripción" />,
          weight: (
            <MDInput
              name="w1"
              onChange={(e, { value }) => {
                setrows(...rows);
              }}
              label="Peso"
              id={newIdWeight}
              type="number"
            />
          ),
        },
      ])
    );

    // console.log(temprows);
  };

  const handleChange = () => {
    rows.filter((row) => {});
  };

  const handleSubmit = () => {
    let aux_gm_WeightsInput = [];
    let gm_WeightsInput = {};
    let variables = {};

    for (let i = 1; i <= rows.length; i++) {
      let curGrade = {
        description: document.getElementById(`description_${i}`).value,
        weight: parseInt(document.getElementById(`weight_${i}`).value),
      };
      aux_gm_WeightsInput.push(curGrade);
    }
    gm_WeightsInput = {
      weights: aux_gm_WeightsInput,
    };
    console.log(course);

    variables = {
      courseCode: course.courseCode,
      courseGroup: course.groupNumber,
      weights: gm_WeightsInput,
    };

    submitMutation(variables).then((submitMutationResult) => {
      if (submitMutationResult.error) {
        console.error("Oh no!", submitMutationResult.error);
      } else {
        handleSnackClick();
      }
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container justifyContent={"space-between"}>
                  <MDTypography variant="h6" color="white">
                    {course.courseName}
                  </MDTypography>
                  <Grid>
                    <MDButton style={{ marginRight: "1rem" }} onClick={handleAdd}>
                      <Icon>add</Icon>
                    </MDButton>
                    <MDButton onClick={handleSubmit}>
                      <Icon>save</Icon>
                    </MDButton>
                    <Snackbar open={snackopen} autoHideDuration={4000} onClose={handlesnackClose}>
                      <Alert onClose={handlesnackClose} severity="success" sx={{ width: "100%" }}>
                        Se han actualizado los pesos!
                      </Alert>
                    </Snackbar>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Projects Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditWeight;
