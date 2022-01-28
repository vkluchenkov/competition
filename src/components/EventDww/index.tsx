/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from "react";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, FormProvider } from "react-hook-form";
import { Workshop } from "./types";
import { FormFields } from './types';
import { useUser } from "../../store/User";
import { useQuery } from 'react-query'
import { getWorkshops } from "../../api";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";
import { contestCats } from "./contestDataMock"

interface DwwProps {
  festival: Festival;
}

export const Dww: React.FC<DwwProps> = (festival) => {
  const [{ currentUser }] = useUser();

  // Form setup
  const methods = useForm<FormFields>({ defaultValues: { workshops: [], contest: [] } });
  const { setValue } = methods;

  // Workshops data
  const { isLoading, isError, data, error } = useQuery<any, any>('festivals', () => getWorkshops(festival.festival.id))
  useEffect(() => {
    if (data) {
      setValue("workshops", data.map((ws: Workshop) => ({ ...ws, selected: false })))
    }
  }, [data, setValue])

  // Competition data mock
  useEffect(() => {
    setValue("contest", contestCats.map((cat) => ({ ...cat, selected: false })))
  }, [contestCats])

  const eventDate = festival.festival.startDate;
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
        ageGroup={ageGroup}
        festivalId={festival.festival.id} />
    </FormProvider>
  );
};
