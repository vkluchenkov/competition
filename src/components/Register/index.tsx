import { getFestival } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Dww } from "../EventDww";
import { CircularProgress } from "@mui/material";


export const Register: React.FC = () => {

  const [festivalId, setFestivalId] = useState(null);

  const navigate = useNavigate()

  //Взяли адрес фестиваля из параметров роутера
  const { festivalUrl } = useParams();

  //Нашли ID фестиваля по запросу с адресом, вернули если есть
  const { isLoading, data } = useQuery<any, any>('isFestival', () => getFestival(festivalUrl), {
    onError: (error) => {
      if (error?.response?.status === 404) {
        navigate('/')
      }
    }
  })
  useEffect(() => {
    if (data) {
      setFestivalId(data.id)
    }
  }, [data])

  if (isLoading) {
    return <CircularProgress />
  }

  if (festivalId) {
    return <Dww festivalId={festivalId} />
  }

  return <></>
}