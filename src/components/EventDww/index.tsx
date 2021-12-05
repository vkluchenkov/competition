/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { StylesProvider } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { AgeGroup } from "./AgeGroup";
import { EventsList } from "./EventsList"
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";

// Мок юзера
const userData = {
  firstName: "Ivan",
  lastName: "Ivanov",
  age: 18,
}

export const Dww: React.FC = () => {
  const { handleSubmit, control, reset, setError, formState: { errors } } = useForm();
  const methods = useForm();
  const { t } = useTranslation();
  const ageGroup = useMemo(() => AgeGroup(userData.age), [userData.age]);

  return (
    <FormProvider {...methods}>
      <EventsList />
    </FormProvider>
  );
};
