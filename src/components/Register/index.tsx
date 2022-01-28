import { getFestival } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { CircularProgress } from "@mui/material";
import { Festival } from "../../models/festival";


export const Register: React.FC = () => {
  const navigate = useNavigate()
  const { festivalUrl } = useParams();

  const [festival, setFestival] = useState(null);


  const { isLoading, data } = useQuery<any, any>('isFestival', () => getFestival(festivalUrl), {
    onError: (error) => {
      if (error?.response?.status === 404) {
        navigate('/')
      }
    }
  })

  useEffect(() => {
    if (data) {
      setFestival(data)
    }
  }, [data])

  if (isLoading) {
    return <CircularProgress />
  }

  if (festival) {
    return <Dww festival={festival} />
  }

  return <></>
}