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
import GroupsTableData from "layouts/tables/data/GroupsTableData";
import ScheduleTableData from "./data/ScheduleTableData";

function Tables() {
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const {
    columns: cColumns,
    rows: cRows,
    username,
    careerCheckList,
    emptyIdCheckeados,
  } = CareerTableData();

  const {
    columns: tColumns,
    selectedSubjects,
    foptaRows,
    fobliRows,
    doptaRows,
    dobliRows,
    leRows,
    nivRows,
    emptySelectedSubjects,
  } = TypologysTabledata(username, careerCheckList);

  // Mostrar la tabla de las carreras por defecto
  const [showCareers, setShowCareers] = useState(true);

  // La tabla de asignaturas tenerla oculta al inicio
  const [showSubjects, setShowSubjects] = useState(false);

  // La tabla de grupos tenerla oculta al inicio
  const [showGroups, setShowGroups] = useState(false);

  // La tabla de los horarios seleccionadas tenerla oculta al inicio
  const [showSchedule, setShowSchedule] = useState(false);

  // Almacenar los grupos seleccionados de las materias
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Almacenar los codigos de los horarios de los grupos seleccionados
  const [selectedSchedules, setSelectedSchedules] = useState([]);

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

  /** Si ya se estaba mostrando la tabla carreras
   * Al pedir que se muestren las materias dejar de mostrarla
   * Mostrar las asignaturas
   * */

  const goToSubjects = () => {
    if (showCareers === true) {
      setShowCareers(false);
      setShowSubjects(true);
    }
  };

  const returnToCareer = () => {
    if (showSubjects === true) {
      setShowSubjects(false);
      emptyIdCheckeados();
      setShowCareers(true);
    }
  };

  const returnToSubject = () => {
    if (showGroups === true) {
      setSelectedGroups([]);
      setShowGroups(false);
      emptySelectedSubjects();
      setShowSubjects(true);
    }
  };

  const goToGroups = () => {
    if (showSubjects === true) {
      setShowSubjects(false);
      setShowGroups(true);
    }
  };

  const goToSchedule = () => {
    if (showGroups === true) {
      setShowGroups(false);
      setShowSchedule(true);
    }
  };

  const returnToGroups = () => {
    if (showSchedule === true) {
      setSelectedSchedules([]);
      setShowSchedule(false);
      setSelectedGroups([]);
      setShowGroups(true);
    }
  };

  // Obtener grupos de asignaturas seleccionadas

  /*
  const settables1 = () => {
    if (showGroups === true) {
      setShow2(false);
    }
    setShowGroups((prev1) => !prev1);
  };

  const settables2 = () => {
    if (showSubjects === true) {
      setShowGroups(false);
      setShow2(false);
    }
    setShowSubjects((prev1) => !prev1);
  };
  */

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {showCareers && (
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
          )}

          {showCareers && (
            <Grid item xs={3}>
              <Card>
                <MDButton onClick={() => goToSubjects()}> Mostrar Materias </MDButton>
              </Card>
            </Grid>
          )}

          {showSubjects && (
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
                    Seleccione las asignaturas que desea inscribir
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fundamentación optativa" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: foptaRows }}
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
                        <ListItemText primary="Fundamentación obligatoria" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: fobliRows }}
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
                        <ListItemText primary="Disciplinar optativa" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: doptaRows }}
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
                        <ListItemText primary="Disciplinar obligatoria" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: dobliRows }}
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
                        <ListItemText primary="Libre elección" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: leRows }}
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
                        <ListItemText primary="Nivelación" />
                      </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DataTable
                        table={{ columns: tColumns, rows: nivRows }}
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
          {showSubjects && (
            <Grid item xs={3}>
              <MDBox>
                <Card>
                  <MDButton onClick={() => returnToCareer()}> Regresar </MDButton>
                </Card>
              </MDBox>
              <MDBox pt={3}>
                <Card>
                  <MDButton onClick={() => goToGroups()}> Mostrar Grupos </MDButton>
                </Card>
              </MDBox>
            </Grid>
          )}

          {showGroups && (
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
                    Seleccione los grupos de las asignaturas que desea cursar
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  {selectedSubjects.map((element) => (
                    <GroupsTableData subjectCode={element} selectedGroups={selectedGroups} />
                  ))}
                </MDBox>
              </Card>
            </Grid>
          )}

          {showGroups && (
            <Grid item xs={3}>
              <MDBox>
                <Card>
                  <MDButton onClick={() => returnToSubject()}> Regresar </MDButton>
                </Card>
              </MDBox>
              <MDBox pt={3}>
                <Card>
                  <MDButton onClick={() => goToSchedule()}> Mostrar Horario </MDButton>
                </Card>
              </MDBox>
            </Grid>
          )}

          {showSchedule && (
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
                    Verifica el horario de cada grupo que seleccionaste
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  {selectedGroups.map((element) => (
                    <ScheduleTableData group={element} selectedSchedules={selectedSchedules} />
                  ))}
                </MDBox>
              </Card>
            </Grid>
          )}
          {showSchedule && (
            <Grid item xs={3}>
              <MDBox>
                <Card>
                  <MDButton onClick={() => returnToGroups()}> Regresar </MDButton>
                </Card>
              </MDBox>
              <MDBox pt={3}>
                <Card>
                  <MDButton onClick={() => console.log(selectedSchedules)}> Finalizar Inscripción </MDButton>
                </Card>
              </MDBox>
            </Grid>
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
