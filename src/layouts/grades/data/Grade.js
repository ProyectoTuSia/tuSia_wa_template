import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Grade = ({ setGrade, grades, key, description, value }) => {
  //   const {
  //     state: { userGrades },
  //   } = useState();

  // console.log(grades, "from grades");

  const handleChange = (text) => {
    console.log(description, "desde for each");

    // console.log(text, "grade handle");
    grades.forEach((grade) => {
      if (description == grade.description) {
        // console.log(grade, "desde for each");
        grade.value = parseFloat(text.target.value);
      }
    });
    setGrade(grades);
  };

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid>
        <MDTypography> {description}</MDTypography>
        <MDInput label={value} type="number" onChange={(input) => handleChange(input)}>
          {}
        </MDInput>
      </Grid>
    </Grid>
  );
};

export default Grade;
