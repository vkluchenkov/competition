import { getWorkshops, getFestival } from "../../api";
import { useLocation, useParams, useNavigate, Navigate } from "react-router-dom";
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
  const { isLoading, isError, data, error } = useQuery<any, any>('isFestival', () => getFestival('1'), {
    onError: () => {
      if (error?.status === 404) {
        return <Navigate to={'/'} />
      }
    }
  })

  // useEffect(() => {
  //   if (data) {
  //     setFestivalId(data.id)
  //   }
  // }, [data])

  if (isLoading) {
    return <CircularProgress />
  }

  if (festivalId) {
    return <Dww festivalId={festivalId} />
  }

  return <></>
}