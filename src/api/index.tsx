import React from "react";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

const BACKEND = "http://localhost:3001/"

export const GetFestivals = () => {
  const { isLoading, isError, data, error } = useQuery('festivals', () =>
    fetch(`${BACKEND}/festivals`).then(res => res.json()
    )
  )

  if (isLoading) {
    return <CircularProgress />
  }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  return data

}