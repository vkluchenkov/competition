import { Typography, Box } from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { EventCard } from "./EventCard";
// import { festivals } from "./festivals";
import { GetFestivals } from "../../api";
import { Festival } from "../../models/festival";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

export const EventsList = () => {
  const queryClient = new QueryClient()
  const festivals: Festival[] = GetFestivals();

  const today = DateTime.local();

  const futureFestivals = festivals.filter(festival => DateTime.fromISO(festival.startDate) >= today);
  const pastFestivals = festivals.filter(festival => DateTime.fromISO(festival.startDate) < today);

  const futureCards = () => {
    return futureFestivals.map(festival => {
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
        />)
    })
  }

  const pastCards = () => {
    return pastFestivals.map(festival => {
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
          past
        />)
    })
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Typography variant="h5">
          Your future events
        </Typography>
        {futureCards()}

        <Typography variant="h5">
          Your past events
        </Typography>
        {pastCards()}
      </Box>
    </QueryClientProvider>
  )

}