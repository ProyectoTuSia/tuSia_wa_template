import MDBox from "components/MDBox";
import React, { useState } from 'react';
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { Checkbox } from "@mui/material";
import { useQuery } from "urql";

const DATA_QUERY_SUBJECTS = `
query($careerCode: Int!, $username: String!) {
  ins_getStudentNotCoursedSubjectsInCareer(careerCode: $careerCode, username: $username) {
    subject {
      code
      name
      credits
    }
    typology
  }
}`;

export default function SubjectsData(username, careerCheckList) {
  
  //Definir cuando no deberia hacerse la query
  const shouldPause = username === undefined || careerCheckList === [];
  
  //Traer las asignaturas no cursadas por un estudiante
  const [result, reexecuteQuery] = useQuery({
    query: DATA_QUERY_SUBJECTS,
    variables: {
      careerCode: parseInt(careerCheckList[0]),
      username,
    },
    pause: shouldPause,
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return {
      columns: [],
      rows: [],
    };
  }

  if (error) {
    return {
      columns: [],
      rows: [],
    };
  }

  const foptaSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='fundamentacion optativa');
  const fobliSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='fundamentacion obligatoria');
  const doptaSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='disciplinar optativa');
  const dobliSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='disciplinar obligatoria');
  const leSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='libre eleccion');
  const nivSubejcts = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='nivelacion');
  const tgSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter( (subject) => subject.typology==='trabajo de grado');

  console.log(foptaSubjects);
  console.log(fobliSubjects);
  console.log(doptaSubjects);
  console.log(dobliSubjects);
  console.log(leSubjects);
  console.log(nivSubejcts);
  console.log(tgSubjects);

  return {
    columns: [
      { Header: "Seleccionar", accessor: "Seleccionar", align: "right" },
      { Header: "Código", accessor: "Código", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
      { Header: "Creditos", accessor: "Creditos", align: "left" },
    ],

    rows: [
      {
        Seleccionar: (
          <MDBox ml={-1}>
            <Checkbox> </Checkbox>
          </MDBox>
        ),
        Código: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            1
          </MDTypography>
        ),
        Nombre: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Empanada
          </MDTypography>
        ),
        Creditos: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Creditos
          </MDTypography>
        ),
      },
    ],
  };
}
