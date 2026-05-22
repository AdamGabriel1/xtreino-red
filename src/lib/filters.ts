export function getAvailableMonths(
  data: any[]
) {
  return [
    ...new Set(
      data.map((item) => item.Mes)
    ),
  ]
}

export function getAvailableDays(
  data: any[],
  selectedMonth: string
) {
  return [
    ...new Set(
      data
        .filter(
          (item) =>
            item.Mes === selectedMonth
        )
        .map((item) => item.Dia)
    ),
  ]
}
