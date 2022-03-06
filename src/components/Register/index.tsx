import { getFestival, getOrderByUser, getRegistrationByFestival } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { Button, CircularProgress } from "@mui/material";
import { Registration } from "../EventDww/types";
import { Order, OrderFestival } from "../../pages/Order/types";
import { Festival } from "../../models/festival";


export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { festivalUrl } = useParams();

  const [festival, setFestival] = useState<Festival | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [orderFestival, setOrderFestival] = useState<OrderFestival | null>(null);

  const { data: orderData, isFetched: isOrderFetched, isLoading: isOrderLoading } = useQuery<Order, any>('isOrder', getOrderByUser, {
    retry: 0,
    refetchOnWindowFocus: false
  })


  const { data: festivalData, isLoading: isFestivalLoading } = useQuery('isFestival', () => getFestival(festivalUrl), {
    onError: (error: any) => {
      if (error?.response?.status === 404) {
        navigate('/')
      }
    },
    retry: 0,
    refetchOnWindowFocus: false
  })

  const { data: regData, isFetched: isRegFetched, isLoading: isRegloading } = useQuery<any, any>(
    ['isRegistration', festivalData],
    () => festivalData ? getRegistrationByFestival(festivalData.id) : null,
    {
      enabled: !!festivalData,
      retry: 0,
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    if (orderData) {
      const isFestivalInOrder = orderData.festivals.find((f: OrderFestival) => f.festival.id === festival?.id)
      if (festival && isFestivalInOrder) {
        setOrderFestival(isFestivalInOrder)
      }
    }
  }, [orderData, festival])

  useEffect(() => {
    if (regData) {
      setRegistration(regData);
    }
  }, [regData])

  useEffect(() => {
    if (festivalData) {
      setFestival(festivalData)
    }
  }, [festivalData])

  if (isFestivalLoading || isRegloading || isOrderLoading) {
    return <CircularProgress />
  }

  const orderButton = () => {
    if (orderFestival && orderData?.status === "new") {
      return (
        <Button
          sx={{
            mt: 3,
            mb: 2,
          }}
          variant="contained"
          size="large"
          disableElevation
          onClick={() => navigate('/my-order')}
        >
          View my order
        </Button>
      )
    }
  }

  if (festival && isRegFetched && isOrderFetched) {
    return (
      <>
        <Dww
          festival={festival}
          registration={registration}
          orderFestival={orderFestival}
        />
        {orderButton()}
      </>
    )
  }
  return <></>
}