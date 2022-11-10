/* eslint-disable react/jsx-key */
// Sweet Aleret
import Swal from "sweetalert2";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
// import Button from "@mui/material/Button";
/* import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem"; */
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { /* Checkbox, */ Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
/* import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess"; */
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import React, { useState } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import SubjectsData from "layouts/Search/data/ExternalSubjectTableData";

function ExternalSearch() {
  const [searchname, setSearchname] = useState("");
  const [searchid, setSearchid] = useState("");
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const { columns: cColumns, rows: cRows } = SubjectsData(searchid, searchname);

  // Mostrar la tabla de las carreras por defecto
  const [showFilters, setShowFilters] = useState(true);
  const searchername = (e) => {
    setSearchname(e.target.value);
    // console.log(e.target.value);
  };
  const searcherid = (e) => {
    setSearchid(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {showFilters && (
            <Grid item xs={4}>
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
                <MDTypography variant="h5" color="white">
                  ¿Desea filtrar por ID de materia? Ingrese la Id
                </MDTypography>
              </MDBox>
              <MDBox
                mx={2}
                mt={0}
                py={3}
                px={2}
                variant="gradient"
                bgColor="secundary"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <Card>
                  <Input
                    value={searchid}
                    onChange={searcherid}
                    type="text"
                    placeholder="Search"
                    className="form-control"
                  />
                </Card>
              </MDBox>
            </Grid>
          )}

          {showFilters && (
            <Grid item xs={4}>
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
                <MDTypography variant="h5" color="white">
                  ¿Desea filtrar por nombre de materia? Ingrese el nombre
                </MDTypography>
              </MDBox>
              <MDBox
                mx={2}
                mt={0}
                py={3}
                px={2}
                variant="gradient"
                bgColor="secundary"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <Card>
                  <Input
                    value={searchname}
                    onChange={searchername}
                    type="text"
                    placeholder="Search"
                    className="form-control"
                  />
                </Card>
              </MDBox>
            </Grid>
          )}
          {showFilters && (
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
                  coloredShadow="primary"
                >
                  <MDTypography variant="h6" color="white">
                    Estas son las materias ofertadas por el grupo 2B.
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
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
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ExternalSearch;
