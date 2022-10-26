// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
/* import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem"; */
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { /* Checkbox, */ Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
/* import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess"; */
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import projectsTableData from "layouts/tables/data/projectsTableData";
import TypologysTabledata from "layouts/tables/data/TypologysTabledata";
import CareerTableData from "layouts/tables/data/CareerTableData";

function Tables() {
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const { columns: cColumns, rows: cRows, career , careerCheckList} = CareerTableData();

  const { columns: tColumns, rows: tRows } = TypologysTabledata();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  /* const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false); */
  /* const handleClick = () => {
    setOpen(!open);
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }; */
  const settables1 = () => {
    if (show1 === true) {
      setShow2(false);
    }
    setShow1((prev1) => !prev1);
  };

  const settables2 = () => {
    if (show === true) {
      setShow1(false);
      setShow2(false);
    }
    setShow((prev1) => !prev1);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={9}>
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
                  Elija la carrera habilitada en su historia academica para elegir materias
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: cColumns, rows: cRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <MDButton onClick={() => settables2()}> Mostrar Materias </MDButton>
            </Card>
          </Grid>
          {show && (
            <Grid item xs={9}>
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
                <MDBox pt={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fundamental optativa" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: tRows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fundamental optativa" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: cColumns, rows: cRows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                      />
                    </AccordionDetails>
                  </Accordion>
                </MDBox>
              </Card>
            </Grid>
          )}
          {show && (
            <Grid item xs={3}>
              <Card>
                <MDButton onClick={() => settables1()}> Mostrar Grupos </MDButton>
              </Card>
            </Grid>
          )}
          {show1 && (
            <Grid item xs={9}>
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
                    Elija la tipologia de las materias que desea cursar
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: tColumns, rows: tRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
          {show1 && (
            <Grid item xs={3}>
              <Card>
                <MDButton onClick={() => setShow2((prev1) => !prev1)}> Mostrar Horario </MDButton>
              </Card>
            </Grid>
          )}
          {show2 && (
            <Grid item xs={9}>
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
                    Elija la tipologia de las materias que desea cursar
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: tColumns, rows: tRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
          {show2 && (
            <Grid item xs={3}>
              <Card>
                <MDButton> Finalizar Inscripsión </MDButton>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
