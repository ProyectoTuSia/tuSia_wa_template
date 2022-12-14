/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

// Import Hooks
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Sweet Aleret
import Swal from "sweetalert2";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Footer from "layouts/authentication/components/Footer";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Graphql connection
import { useQuery } from "urql";

// JWT Decode
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

// Background Image
import bgImage from "assets/images/tuSIA.jpg";

const DATA_QUERY_LOGIN = `
  query ($email: String!, $password: String!) {
    authLogin(email: $email, password: $password)
  }
`;

function handleLogin(responseData) {
  console.log(responseData);
  if (responseData.authLogin !== "User not found" && responseData.authLogin !== "Wrong password") {
    localStorage.setItem("token", responseData.authLogin);
    window.location.href = "/inicio";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario o Contraseña incorrectos",
    });
  }
}

function checkLogin() {
  const token = localStorage.getItem("token");

  if (token) {
    if (Date.now() < jwt_decode(token).exp * 1000) {
      window.location.href = "/inicio";
    } else {
      localStorage.removeItem("token");
    }
  }
}

function Basic() {
  // Check if token is still valid (if it exists)
  checkLogin();

  // Hooks declaration (email and password inputs)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Query GraphQL to login
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_LOGIN,
    variables: {
      email: `${email}@unal.edu.co`,
      password,
    },
    pause: true,
  });

  // Data, fetching and error of the query
  const { data, fetching, error } = result;

  if (error) console.log(error.message);

  // Function to execute the query
  useEffect(() => {
    if (result.fetching) return;

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [result.fetching, reexecuteQuery, email, password]);

  return (
    <div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Inicia Sesión
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox
              component="form"
              role="form"
              onSubmit={(event) => {
                event.preventDefault();
                reexecuteQuery();
                handleLogin(data);
              }}
            >
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Usuario UNAL"
                  id="emailInput"
                  value={email}
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Contraseña"
                  id="emailPassword"
                  value={password}
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="dark" fullWidth type="submit">
                  iniciar sesión
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
      <Footer light />
    </div>
  );
}

export default Basic;
