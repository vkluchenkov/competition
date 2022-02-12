import { Typography, Box, CircularProgress } from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { EventCard } from "./EventCard";
// import { festivals } from "./festivals";
import { getFestivals } from "../../api";
import { Festival } from "../../models/festival";
import { useQuery } from 'react-query'

export const EventsList = () => {

  const { isLoading, isError, data, error } = useQuery<any, any>('festivals', getFestivals)

  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const today = DateTime.local();

  const futureFestivals = data.filter((festival: Festival) => DateTime.fromISO(festival.startDate) >= today);
  const pastFestivals = data.filter((festival: Festival) => DateTime.fromISO(festival.startDate) < today);

  const futureCards = () => {
    return futureFestivals.map((festival: Festival) => {
      return (
        <EventCard
          key={festival.id}
          id={festival.id}
          title={festival.title}
          type={festival.type}
          startDate={festival.startDate}
          endDate={festival.endDate}
          location={festival.location}
          description={festival.description}
          img={festival.img}
          urlSlug={festival.urlSlug}
        />)
    })
  }

  const pastCards = () => {
    return pastFestivals.map((festival: Festival) => {
      return (
        <EventCard
          key={festival.id}
          id={festival.id}
          title={festival.title}
          type={festival.type}
          startDate={festival.startDate}
          endDate={festival.endDate}
          location={festival.location}
          description={festival.description}
          img={festival.img}
          urlSlug={festival.urlSlug}
          past
        />)
    })
  }

  return (
    <Box>
      <Typography variant="h5">
        Your future festivals
      </Typography>
      {futureCards()}

      <Typography variant="h5">
        Your past festivals
      </Typography>
      {pastCards()}
    </Box>
  )

}