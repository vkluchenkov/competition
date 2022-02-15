/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { AgeGroup } from "./AgeGroup";
import { DwwEvents } from "./DwwEvents"
import { useForm, FormProvider } from "react-hook-form";
import { ContestCategory, Registration, Workshop } from "./types";
import { FormFields } from './types';
import { useUser } from "../../store/User";
import { useQuery } from 'react-query'
import { getContestCats, getWorkshops } from "../../api";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";
import { OrderFestival } from "../../pages/Order/types";

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

  // Workshops and contest categories data
  const { data: workshopsData, isLoading: isWorkshopsLoading, isError: isWorkshopsError, error: workshopsError } = useQuery<any, any>('workshops', () => getWorkshops(festival.id))
  const { data: contestCatsData, isLoading: isContestCatsLoading, isError: isContestCatsError, error: contestCatsError } = useQuery<any, any>('contestCats', () => getContestCats(festival.id))

  useEffect(() => {
    if (workshopsData && (registration || orderFestival)) {
      setValue(
        "workshops", workshopsData.map((ws: Workshop) => {

          // If workshop in reg set checked and disable
          if (registration?.workshops.some((value: number) => value === ws.id)) {
            return { ...ws, selected: true, disabled: true, price: 0 }
          }
          // If workshop in order set checked, but not disable
          if (orderFestival?.workshops.some((orderWs: Workshop) => orderWs.id === ws.id)) {
            console.log("workshop in order");
            return { ...ws, selected: true, disabled: false }
          }
          // If workshop not in reg or order set free to choose
          return { ...ws, selected: false }
        })
      )
    }
    else if (workshopsData) {
      setValue("workshops", workshopsData.map((ws: Workshop) => ({ ...ws, selected: false })))
    }
  }, [workshopsData, registration, orderFestival])

  // Competition data mock
  useEffect(() => {
    // If there's reg
    if (contestCatsData && registration) {
      setValue(
        "contest", contestCatsData.map((cat: ContestCategory) => {
          // If in reg and solo pass, set checked, but not disabled
          if (registration.contest.some((value: number) => value === cat.id) && registration.isSoloPass) {
            return { ...cat, selected: true, disabled: false, price: 0 }
          }

          // If in order and solo pass, set checked, but not disabled
          if (orderFestival?.contest.some((value: number) => value === cat.id) && orderFestival.isSoloPass) {
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
    } else if (contestCatsData) {
      setValue("contest", contestCatsData.map((cat: ContestCategory) => ({ ...cat, selected: false, disabled: false })))
    }
  }, [registration, contestCatsData, orderFestival])

  // Age group setup
  const eventDate = festival.startDate;
  const ageGroup = useMemo(() => AgeGroup(eventDate, currentUser?.birthDate), [currentUser?.birthDate])

  // Render
  if (isWorkshopsLoading || isContestCatsLoading) {
    return <CircularProgress />
  }

  if (isWorkshopsError) {
    return <span>Error: {workshopsError.message}</span>
  }

  if (isContestCatsError) {
    return <span>Error: {contestCatsError.message}</span>
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
