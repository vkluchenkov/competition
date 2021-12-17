import React from "react";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

const BACKEND = "http://localhost:3001"

export const getFestivals = () => fetch(`${BACKEND}/festivals`).then(res => res.json())