/** @jsxImportSource @emotion/react */
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { useQuery } from "react-query";
import { getOrder } from "../../api";
import { Workshop } from "../../components/EventDww/types";
import { OrderFestival, OrderProps } from "./types";

export const Order = () => {

  // Временно
  const orderId = '44';

  const { isLoading, isError, data, error } = useQuery<any, any>('orderId', () => getOrder(orderId))

  if (isLoading) {
    return <CircularProgress />
  }
  if (isError && error.message === "Request failed with status code 404") {
    return <span>You don't have an active order</span>
  }

  const festivals = () => {
    return data.festivals.map((festival: OrderFestival) => {
      const fullPass = festival.is_fullPass

      const workshops = festival.workshops?.map((ws: Workshop) => {
        const start = DateTime.fromISO(ws.start).toFormat("dd.LL.y | H:mm")
        return (
          <Box sx={{ paddingLeft: "16px" }} key={"workshop" + ws.id}>
            <Typography variant="body2">
              <strong>{ws.teacher.name}</strong>
            </Typography>
            <Typography variant="body2" key={ws.id}>
              {ws.topic}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {start}
            </Typography>
          </Box>
        )
      })

      const fullPassOrWorkshops = () => {
        if (fullPass) {
          return (
            <Typography variant="body1" sx={{ paddingLeft: "8px" }}>
              Workshops: Full Pass
            </Typography>
          )
        }
        if (workshops && festival.workshops.length > 0) {
          return (
            <>
              <Typography variant="body1" gutterBottom sx={{ paddingLeft: "8px" }}>
                Workshops:
              </Typography>
              {workshops}
            </>
          )
        }
      }

      return (
        <TableRow key={"festival" + festival.festival.id}>
          <TableCell>
            <Typography variant="body1" gutterBottom>
              <strong>{festival.festival.title}</strong>
            </Typography>
            {fullPassOrWorkshops()}

          </TableCell>
          <TableCell>€XX</TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 10px 5px"
        }}>
        <Typography variant="h3">
          Your order
        </Typography>

        <Typography variant="h5">
          Status: {data.status}
        </Typography>

        <TableContainer sx={{ maxWidth: "600px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {festivals()}
              <TableRow sx={{ borderBottom: 0 }}>
                <TableCell align="right" sx={{ borderBottom: 0 }}>
                  <strong>Total:</strong>
                </TableCell>
                <TableCell sx={{ borderBottom: 0 }}>€XXX</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
};
