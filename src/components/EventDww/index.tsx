/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from "react";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, FormProvider } from "react-hook-form";
import { Workshop } from "./types";
import { FormFields } from './types';
import { useUser } from "../../store/User";
import { User } from "../../models/user";
import avatar from "../../images/media.webp";
import { useQuery } from 'react-query'
import { getWorkshops } from "../../api";
import { CircularProgress } from "@mui/material";

// Мок юзера
const userData: User = {
  firstName: "Ivan",
  lastName: "Ivanov",
  email: "user@example.com",
  id: "1",
  birthDate: "2015-12-12",
  avatar: avatar,
}

export const Dww: React.FC = () => {

  const [{ currentUser }, { setActiveUser }] = useUser();

  // Для тестирования ставим сразу активного юзера из мока
  useEffect(() => {
    if (!currentUser) {
      setActiveUser(userData)
    }
  })

  const eventDate = "2022-08-18"

  const { isLoading, isError, data, error } = useQuery<any, any>('festivals', () => getWorkshops(1))

  const methods = useForm<FormFields>({ defaultValues: { workshops: [] } });

  useEffect(() => {
    if (data) {
      setValue("workshops", data.map((ws: Workshop) => ({ ...ws, selected: false })))
    }
  }, [data])

  const { setValue } = methods;

  const ageGroup = useMemo(() => AgeGroup(eventDate, currentUser?.birthDate), [currentUser?.birthDate])

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <FormProvider {...methods}>
      <DwwEvents
        ageGroup={ageGroup} />
    </FormProvider>
  );
};
