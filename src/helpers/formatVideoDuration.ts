export function formatVideoDuration(duration: number) {
  const oneMinute = 60
  if (duration <= 9) {
    return ('00:0' + duration)
  }
  if (duration > 9 && duration <= 59) {
    return ('00:' + duration)
  }
  if (duration >= 60 && duration < 3600){
    const hours = Math.round(duration / oneMinute)
    const minutes = (duration % oneMinute)

    if (minutes <= 9) {
      return (hours + ':0' + minutes)
    }
    else {
      return (hours + ':' + minutes)
    }
  }
}