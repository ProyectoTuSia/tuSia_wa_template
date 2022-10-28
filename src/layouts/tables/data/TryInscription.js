import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import { useMutation } from "urql";

const MUTATION_INSCRIPTION = `
mutation ($list: [ins_StudentHasSubjectGroupInput]) {
    ins_addStudentToGroups(list: $list)
}
`;

function TryMutationInscription(props) {
  const [mutationInscriptionResult, mutationInscription] = useMutation(MUTATION_INSCRIPTION);
  const variables = {
    list: [
      {
        subject_group_number: 1,
        subject_group_subject_code: 1000003,
        student_username: "sarodriguezca",
        token: "aaa",
      },
      {
        subject_group_number: 1,
        subject_group_subject_code: 1000004,
        student_username: "sarodriguezca",
        token: "aaa",
      },
    ],
  };

  const validateInscription = () => {
    mutationInscription(variables).then((result) => {
      console.log(result);
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
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography>¿Desea validar su inscripción para terminar el proceso?</MDTypography>
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
