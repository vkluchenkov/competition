const BACKEND = "http://localhost:3001"

const axios = require('axios').default;

export const getFestival = (festivalUrl: string | undefined) => {
  axios.get(`${BACKEND}/festivals/${festivalUrl}`)
    .then((result: any) => {
      console.log(result.data)
      return result.data
    })
}
export const getFestivals = () => fetch(`${BACKEND}/festivals`).then(res => res.json())
// export const getFestival = (festivalUrl: string) => fetch(`${BACKEND}/festivals/${festivalUrl}`).then(res => res.json())
export const getWorkshops = (festivalId: number) => fetch(`${BACKEND}/festivals/${festivalId}/workshops`).then(res => res.json())