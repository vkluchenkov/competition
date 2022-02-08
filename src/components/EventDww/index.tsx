/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, FormProvider } from "react-hook-form";
import { ContestCategory, Registration, Workshop } from "./types";
import { FormFields } from './types';
import { useUser } from "../../store/User";
import { useQuery } from 'react-query'
import { getRegistrationByFestival, getWorkshops } from "../../api";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";
import { contestCats } from "./contestDataMock"
import { truncate } from "fs";

interface DwwProps {
  festival: Festival;
  registration: Registration | null;
}

export const Dww: React.FC<DwwProps> = ({ festival, registration }) => {
  const [{ currentUser }] = useUser();

  // Form setup
  const methods = useForm<FormFields>({ defaultValues: { workshops: [], contest: [] } });
  const { setValue } = methods;

  // Workshops data
  const workshops = useQuery<any, any>('workshops', () => getWorkshops(festival.id))

  useEffect(() => {
    if (workshops.data && registration) {
      setValue(
        "workshops", workshops.data.map((ws: Workshop) => {
          if (registration.workshops.some((value: number) => value === ws.id)) {
            return { ...ws, selected: true, disabled: true, price: 0 }
          }
          return { ...ws, selected: false }
        })
      )
    } else if (workshops.data) {
      setValue("workshops", workshops.data.map((ws: Workshop) => ({ ...ws, selected: false })))
    }
  }, [workshops.data, registration])

  // Competition data mock
  useEffect(() => {
    if (contestCats && registration) {
      setValue(
        "contest", contestCats.map((cat: ContestCategory) => {
          if (registration.contest.some((value: number) => value === cat.id)) {
            return { ...cat, selected: true, disabled: true, price: 0 }
          }
          return { ...cat, selected: false, disabled: false }
        })
      )
    } else if (contestCats) {
      setValue("contest", contestCats.map((cat: ContestCategory) => ({ ...cat, selected: false, disabled: false })))
    }
  }, [workshops.data, registration])

  const eventDate = festival.startDate;
  const ageGroup = useMemo(() => AgeGroup(eventDate, currentUser?.birthDate), [currentUser?.birthDate])

  if (workshops.isLoading) {
    return <CircularProgress />
  }

  if (workshops.isError) {
    return <span>Error: {workshops.error.message}</span>
  }

  return (
    <FormProvider {...methods}>
      <DwwEvents
        ageGroup={ageGroup}
        festivalId={festival.id}
        registration={registration} />
    </FormProvider>
  );
};
