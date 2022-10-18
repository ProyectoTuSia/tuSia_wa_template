/* eslint-disable no-restricted-globals */
/* eslint-disable-next-line no-restricted-globals */
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Graphql connection
import { useLazyQuery, gql } from "@apollo/client";

// Images
import bgImage from "assets/images/tuSIA.jpg";

const DATA_QUERY_LOGIN = gql`
  query ($email: String!, $password: String!) {
    authLogin(email: $email, password: $password)
  }
`;

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [mailInputData, setMail] = useState("");
  const [passwordInputData, setPassword] = useState("");

  const [token, setToken] = useState("");

  const [getToken, dataResponse] = useLazyQuery(DATA_QUERY_LOGIN);

  const handleLogin = (email, password) => {
    event.preventDefault();
    getToken({ variables: { email, password } });
    console.log(dataResponse);
    if (dataResponse.data) {
      setToken(dataResponse.data.authLogin);
      console.log(token);
      window.location.href = "/dashboard";
    } else {
      console.log(dataResponse.error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  /* 
  useEffect(() => {
    if (dataResponse.data) {
      setToken(dataResponse.data.authLogin);
    }
  }, [dataResponse]); */

  return (
    <BasicLayout image={bgImage}>
      {/* <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert> */}
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
            onSubmit={() => {
              handleLogin(mailInputData, passwordInputData);
            }}
          >
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Correo"
                fullWidth
                onChange={(event) => setMail(event.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recuérdame
              </MDTypography>
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
  );
}

export default Basic;
