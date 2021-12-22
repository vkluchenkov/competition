const BACKEND = "http://localhost:3001"

export const getFestivals = () => fetch(`${BACKEND}/festivals`).then(res => res.json())
export const getWorkshops = (festivalId: number) => fetch(`${BACKEND}/festivals/${festivalId}/workshops`).then(res => res.json())