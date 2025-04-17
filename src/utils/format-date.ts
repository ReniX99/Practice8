function padZeros(value: string) {
  return String(value).padStart(2, '0')
}

export const formatDate = (date: Date) => {
  const day = padZeros(date.getDate().toString())
  const month = padZeros((date.getMonth() + 1).toString())
  const year = padZeros(date.getFullYear().toString())

  return `${day}.${month}.${year}`
}
