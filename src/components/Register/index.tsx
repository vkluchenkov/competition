import { getFestival, getOrderByUser, getRegistrationByFestival } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { CircularProgress } from "@mui/material";
import { Registration } from "../EventDww/types";
import { OrderFestival, OrderProps } from "../../pages/Order/types";
import { Festival } from "../../models/festival";


export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { festivalUrl } = useParams();

  const [festival, setFestival] = useState<Festival | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [orderFestival, setOrderFestival] = useState<OrderFestival | null>(null);

  const orderData = useQuery<any, any>('isOrder', getOrderByUser)

  const festivalData = useQuery<any, any>('isFestival', () => getFestival(festivalUrl), {
    onError: (error) => {
      if (error?.response?.status === 404) {
        navigate('/')
      }
    }
  })

  const regData = useQuery<any, any>(
    ['isRegistration', festivalData.data],
    () => getRegistrationByFestival(festivalData.data.id),
    {
      enabled: !!festivalData.data,
    }
  )

  useEffect(() => {
    if (orderData.data) {
      const isFestivalinOrder = orderData.data.festivals.find((f: OrderFestival) => f.festival.id === festival?.id)
      if (festival && isFestivalinOrder) {
        setOrderFestival(isFestivalinOrder);
      }
    }
  }, [orderData.data, festivalData.data])

  useEffect(() => {
    if (regData.data) {
      setRegistration(regData.data);
    }
  }, [regData.data])

  useEffect(() => {
    if (festivalData.data) {
      setFestival(festivalData.data)
    }
  }, [festivalData.data])

  if (festivalData.isLoading || regData.isLoading || orderData.isLoading) {
    return <CircularProgress />
  }

  if (festival && regData.isFetched && orderData.isFetched) {
    return <Dww
      festival={festival}
      registration={registration}
      orderFestival={orderFestival}
    />
  }

  return <></>
}