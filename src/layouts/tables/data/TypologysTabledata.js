import MDBox from "components/MDBox";
import React, { useState } from "react";
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
  // Definir cuando no deberia hacerse la query
  const shouldPause = username === undefined || careerCheckList === [];

  // Traer las asignaturas no cursadas por un estudiante
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

  const foptaSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "fundamentacion optativa"
  );
  const fobliSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "fundamentacion obligatoria"
  );
  const doptaSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "disciplinar optativa"
  );
  const dobliSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "disciplinar obligatoria"
  );
  const leSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "libre eleccion"
  );
  const nivSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "nivelacion"
  );

  /*
  Trabajo de grado no se implementa por ahora
  const tgSubjects = data.ins_getStudentNotCoursedSubjectsInCareer.filter(
    (subject) => subject.typology === "trabajo de grado"
  );
  */

  return {
    columns: [
      { Header: "Seleccionar", accessor: "Seleccionar", align: "right" },
      { Header: "Código", accessor: "Codigo", align: "center" },
      { Header: "Nombre", accessor: "Nombre", align: "left" },
      { Header: "Creditos", accessor: "Creditos", align: "left" },
    ],

    foptaRows: foptaSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),

    fobliRows: fobliSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),

    doptaRows: doptaSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),

    dobliRows: dobliSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),

    leRows: leSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),

    nivRows: nivSubjects.map((element) => ({
      Seleccionar: (
        <MDBox ml={-1}>
          <Checkbox id={element.subject.code}> </Checkbox>
        </MDBox>
      ),
      Codigo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.code}
        </MDTypography>
      ),
      Nombre: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.name}
        </MDTypography>
      ),
      Creditos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {element.subject.credits}
        </MDTypography>
      ),
    })),
  };
}
