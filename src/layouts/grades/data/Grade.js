/* eslint-disable react/prop-types */
import { Grid, Input } from "@mui/material";
import MDBox from "components/MDBox";
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
    console.log(grades);
    setGrade(grades);
  };

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid>
        <MDTypography variant="h5"> {description} </MDTypography>
        <MDInput
          label={value}
          // style={{ marginbottom: "2rem" }}
          type="number"
          onChange={(input) => handleChange(input)}
        >
          {}
        </MDInput>
      </Grid>
    </Grid>
  );
};

export default Grade;
