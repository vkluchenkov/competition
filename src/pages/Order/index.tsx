/** @jsxImportSource @emotion/react */
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { getOrderByUser, payOrder } from "../../api";
import { Workshop } from "../../components/EventDww/types";
import { OrderFestival, Order } from "./types";

export const OrderPage = () => {

  const { isLoading, isError, data, error } = useQuery<Order, any>('order', getOrderByUser);

  const payMutation = useMutation<string, any, any, any>(payOrder);

  if (isLoading) {
    return <CircularProgress />
  }
  if (isError && error.message === "Request failed with status code 404") {
    return <span>You don't have an active order</span>
  }

  const handlePayment = async () => {
    try {
      await payMutation.mutateAsync("")
    } catch (error: any) {
      throw error;
    }
  }

  const festivals = () => {
    return data?.festivals.map((festival: OrderFestival) => {
      const fullPass = festival.isFullPass

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

  const orderButton = () => {
    if (data?.status === "new") {
      return (
        <Button
          sx={{
            mt: 3,
            mb: 2,
          }}
          variant="contained"
          size="large"
          disableElevation
          onClick={handlePayment}
        >
          Pay
        </Button>
      )
    }
  }

  return (
    <>
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
            Status: {data?.status}
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
      {orderButton()}
    </>
  )
};
