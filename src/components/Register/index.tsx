import { getFestival, getRegistrationByFestival } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";
import { Registration } from "../EventDww/types";


export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { festivalUrl } = useParams();

  const [festival, setFestival] = useState(null);
  const [registration, setRegistration] = useState<Registration | null>(null);

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
    if (regData.data) {
      setRegistration(regData.data);
    }
  }, [regData.data])

  useEffect(() => {
    if (festivalData.data) {
      setFestival(festivalData.data)
    }
  }, [festivalData.data])

  if (festivalData.isLoading || regData.isLoading) {
    return <CircularProgress />
  }

  if (festival && registration) {
    return <Dww festival={festival} registration={registration} />
  }

  return <></>
}