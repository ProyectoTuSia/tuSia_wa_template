import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Header from "layouts/profile/components/Header";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import bgImage from "assets/images/tuSIA.jpg";

// JWT Decode
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

function displayName() {
  const name = jwt_decode(localStorage.getItem("token")).email;
  return name.split("@")[0];
}

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MDBox position="relative" mb={5}>
            <Header></Header>
          </MDBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
