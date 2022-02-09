/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, FormProvider } from "react-hook-form";
import { ContestCategory, Registration, Workshop } from "./types";
import { FormFields } from './types';
import { useUser } from "../../store/User";
import { useQuery } from 'react-query'
import { getWorkshops } from "../../api";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";
import { contestCats } from "./contestDataMock"
import { OrderFestival, OrderProps } from "../../pages/Order/types";

interface DwwProps {
  festival: Festival;
  registration: Registration | null;
  orderFestival: OrderFestival | null;
}

export const Dww: React.FC<DwwProps> = ({ festival, registration, orderFestival }) => {
  const [{ currentUser }] = useUser();

  // Form setup
  const methods = useForm<FormFields>({ defaultValues: { workshops: [], contest: [] } });
  const { setValue } = methods;

  // Workshops data
  const workshops = useQuery<any, any>('workshops', () => getWorkshops(festival.id))

  useEffect(() => {
    if (workshops.data && (registration || orderFestival)) {
      setValue(
        "workshops", workshops.data.map((ws: Workshop) => {

          // If workshop in reg set checked and disable
          if (registration?.workshops.some((value: number) => value === ws.id)) {
            return { ...ws, selected: true, disabled: true, price: 0 }
          }
          // If workshop in order set checked, but not disable
          if (orderFestival?.workshops.some((orderWs: Workshop) => orderWs.id === ws.id)) {
            return { ...ws, selected: true, disabled: false }
          }
          // If workshop not in reg or order set free to choose
          return { ...ws, selected: false }
        })
      )
    }
    else if (workshops.data) {
      setValue("workshops", workshops.data.map((ws: Workshop) => ({ ...ws, selected: false })))
    }
  }, [workshops.data, registration])

  // Competition data mock
  useEffect(() => {
    // If there's reg
    if (contestCats && registration) {
      setValue(
        "contest", contestCats.map((cat: ContestCategory) => {

          // If in reg and solo pass, set checked, but not disabled
          if (registration.contest.some((value: number) => value === cat.id) && registration.is_soloPass) {
            return { ...cat, selected: true, disabled: false, price: 0 }
          }

          // If in order and solo pass, set checked, but not disabled
          if (orderFestival?.contest.some((value: number) => value === cat.id) && orderFestival.is_soloPass) {
            return { ...cat, selected: true, disabled: false }
          }

          // If in reg without solo pass set checked and disabled
          else if (registration.contest.some((value: number) => value === cat.id)) {
            return { ...cat, selected: true, disabled: true, price: 0 }
          }

          // If in order without solo pass set checked but not disabled
          else if (orderFestival?.contest.some((value: number) => value === cat.id)) {
            return { ...cat, selected: true, disabled: false }
          }

          //If NOT in reg or order set free to choose
          return { ...cat, selected: false, disabled: false }
        })
      )

      // If there's no reg set free to choose
    } else if (contestCats) {
      setValue("contest", contestCats.map((cat: ContestCategory) => ({ ...cat, selected: false, disabled: false })))
    }
  }, [workshops.data, registration])

  // Age group setup
  const eventDate = festival.startDate;
  const ageGroup = useMemo(() => AgeGroup(eventDate, currentUser?.birthDate), [currentUser?.birthDate])

  // Render
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
        registration={registration}
        orderFestival={orderFestival}
      />
    </FormProvider>
  );
};
