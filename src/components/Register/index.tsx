import { getFestival, getOrderByUser, getRegistrationByFestival } from "../../api";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { Button, CircularProgress, Link } from "@mui/material";
import { Registration } from "../EventDww/types";
import { OrderFestival } from "../../pages/Order/types";
import { Festival } from "../../models/festival";


export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { festivalUrl } = useParams();

  const [festival, setFestival] = useState<Festival | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [orderFestival, setOrderFestival] = useState<OrderFestival | null>(null);

  const { data: orderData, isFetched: isOrderFetched, isLoading: isOrderLoading } = useQuery<any, any>('isOrder', getOrderByUser)

  const { data: festivalData, isLoading: isFestivalLoading } = useQuery('isFestival', () => getFestival(festivalUrl), {
    onError: (error: any) => {
      if (error?.response?.status === 404) {
        navigate('/')
      }
    }
  })

  const { data: regData, isFetched: isRegFetched, isLoading: isRegloading } = useQuery<any, any>(
    ['isRegistration', festivalData],
    () => festivalData ? getRegistrationByFestival(festivalData.id) : null,
    {
      enabled: !!festivalData,
    }
  )

  useEffect(() => {
    if (orderData) {
      const isFestivalInOrder = orderData.festivals.find((f: OrderFestival) => f.festival.id === festival?.id)
      if (festival && isFestivalInOrder) {
        setOrderFestival(isFestivalInOrder)
      }
    }
  }, [orderData, festivalData])

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
    if (orderFestival) {
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