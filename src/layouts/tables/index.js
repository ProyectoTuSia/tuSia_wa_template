/* eslint-disable react/jsx-key */
// Sweet Aleret
import Swal from "sweetalert2";

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
import { Try } from "@mui/icons-material";
import ScheduleTableData from "./data/ScheduleTableData";
import TryInscription from "./data/TryInscription";

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

  // Mostrar una pantalla de inscripcion
  const [showInscription, setShowInscription] = useState(false);

  // Hook para almacenar los datos necesarios para intentar realizar la inscripcion
  const [inscriptionData, setInscriptionData] = useState([]);

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

  const fromInscriptionToGroups = () => {
    if (showInscription === true) {
      //Vaciar datos que se iban a usar para inscripcion
      setInscriptionData([]);
      //Vaciar la lista de horarios
      setSelectedSchedules([]);
      //Vaciar los grupos elegidos
      setSelectedGroups([]);
      setShowInscription(false);
      setShowGroups(true);
    }
  };

  // Antes de ir a schedule se debe verificar que dos grupos elegidos sean de la misma asignatura

  const goToSchedule = () => {
    if (showGroups === true) {
      /* Lista auxiliar para almacenar codigos de asignaturas
       * que ya se inscribieron */
      const auxiliarList = [];
      let dosGruposMismaAsignatura = false;
      for (let i = 0; i < selectedGroups.length; i++) {
        if (dosGruposMismaAsignatura) {
          break;
        }

        if (!auxiliarList.includes(selectedGroups[i].split("-")[1])) {
          // Agregar a la lista la asignatura porque ningun otro grupo la tiene
          auxiliarList.push(selectedGroups[i].split("-")[1]);
        } else {
          // Poner la bandera que indica que hay dos grupos de una misma asignatura en true
          dosGruposMismaAsignatura = true;
        }
      }

      // Si en el analisis se encontraron dos  grupos de una misma asignatura lanzar error
      if (dosGruposMismaAsignatura) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pueden elegir dos grupos de una misma asignatura",
        });
      } else {
        setShowGroups(false);
        setShowSchedule(true);
      }
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

  const goToTryInscription = () => {
    if (showSchedule === true) {
      /* Lista auxiliar para almacenar los codigos
       * de los horarios inscritos */
      const auxiliarList = [];
      let dosHorariosIguales = false;
      for (let i = 0; i < selectedSchedules.length; i++) {
        if (dosHorariosIguales) {
          break;
        }
        if (!auxiliarList.includes(selectedSchedules[i])) {
          // Agregar a la lista el horario ya que ningun otro grupo lo tiene
          auxiliarList.push(selectedSchedules[i]);
        } else {
          // Poner la bandera que indica que hay dos grupos en un mismo horario en true
          dosHorariosIguales = true;
        }
      }
      // Si en el analisis se encontraron dos grupos con mismo horario
      if (dosHorariosIguales) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algunos grupos que elegiste comparten algun horario, por favor elige grupos que no se dicten a la misma hora",
        });
      } else {
        // Intentar armar la lista de datos para realizar la inscripcion
        let auxiliarObject = {};
        const currentToken = localStorage.getItem("token");
        for (let i = 0; i < selectedGroups.length; i++) {
          const groupNumber = parseInt(selectedGroups[i].split("-")[0], 10);
          const subjectCode = parseInt(selectedGroups[i].split("-")[1], 10);
          auxiliarObject = {
            subject_group_number: groupNumber,
            subject_group_subject_code: subjectCode,
            student_username: username,
            token: currentToken,
          };

          inscriptionData.push(auxiliarObject);
        }

        setShowSchedule(false);
        setShowInscription(true);
      }
    }
  };

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
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
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
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
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
                        <ListItemText primary="Fundamentaci??n optativa" />
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
                        <ListItemText primary="Fundamentaci??n obligatoria" />
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
                        <ListItemText primary="Libre elecci??n" />
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
                        <ListItemText primary="Nivelaci??n" />
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
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
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
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
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
                  <MDButton onClick={() => goToTryInscription()}>
                    {" "}
                    Ir a pantalla de finalizaci??n de inscripci??n{" "}
                  </MDButton>
                </Card>
              </MDBox>
            </Grid>
          )}
          {showInscription && (
            <TryInscription
              inscriptionData={inscriptionData}
              fromInscriptionToGroups={fromInscriptionToGroups}
            />
          )}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
