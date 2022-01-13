/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
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

interface DwwProps {
  festivalId: number;
}

export const Dww: React.FC<DwwProps> = ({ festivalId }) => {

  const [{ currentUser }, { setActiveUser }] = useUser();

  const eventDate = "2022-08-18"

  const { isLoading, isError, data, error } = useQuery<any, any>('festivals', () => getWorkshops(festivalId))

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
