/** @jsxImportSource @emotion/react */
import React, { useMemo } from "react";
import { StylesProvider } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import { AgeGroup } from "./AgeGroup";
import { EventsList } from "./EventsList"
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { workshopsList } from "./workshopsList";
import { FormFields } from './types';

// Мок юзера
const userData = {
  firstName: "Ivan",
  lastName: "Ivanov",
  age: 18,
}

export const Dww: React.FC = () => {
  const methods = useForm<FormFields>({
    defaultValues: {
      workshops: workshopsList.map((ws) => ({ ...ws, selected: false })),
    }
  });
  const { handleSubmit, control, reset, setError, formState: { errors }, watch } = methods;
  const { t } = useTranslation();
  const ageGroup = useMemo(() => AgeGroup(userData.age), [userData.age]);

  const selected = watch("workshops").filter((ws) => ws.selected);

  console.log('selected workshops', selected);

  return (
    <FormProvider {...methods}>
      <EventsList />
    </FormProvider>
  );
};
