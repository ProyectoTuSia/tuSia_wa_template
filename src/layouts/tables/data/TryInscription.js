// Sweet Aleret
import Swal from "sweetalert2";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React from "react";
import { useMutation } from "urql";

const MUTATION_INSCRIPTION = `
mutation ($list: [ins_StudentHasSubjectGroupInput]) {
    ins_addStudentToGroups(list: $list)
}
`;

function TryMutationInscription(props) {
  const [mutationInscriptionResult, mutationInscription] = useMutation(MUTATION_INSCRIPTION);

  const validateInscription = () => {
    const variables = {
      list: props.inscriptionData,
    };
    mutationInscription(variables).then((result) => {
      if (result.error) {
        console.log("Hubo algo mal al plantear la query");
      }

      // Si el resultado es true, si se hizo la inscripcion
      if (result.data.ins_addStudentToGroups) {
        Swal.fire({
          icon: "success",
          title: "Se ha realizado la inscripción exitosamente",
          text: "Da click al boton para volver a la pantalla principal",
        }).then((value) => {
          window.location.href = "/dashboard";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No se ha podido realizar la inscripción",
          text: "Puede que los cupos de alguna asignatura se agotaran mientras realizabas el proceso, da click al boton para volver a la pantalla de seleccion de grupos",
        }).then((value) => {
            props.fromInscriptionToGroups();
        });
      }
    });
  };

  return (
    <Grid item xs={9}>
      <Card>
        <MDBox
          mx={2}
          mt={0}
          py={3}
          px={2}
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">¿Desea validar su inscripción para terminar el proceso?</MDTypography>
        </MDBox>
      </Card>
      <MDBox mt={3}>
        <Card>
          <MDButton onClick={() => validateInscription()}> Si, deseo validar </MDButton>
        </Card>
      </MDBox>
    </Grid>
  );
}

class TryInscription extends React.Component {
  render() {
    return <TryMutationInscription {...this.props} />;
  }
}

export default TryInscription;
