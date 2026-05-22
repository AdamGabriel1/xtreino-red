import Papa from "papaparse"

export async function loadCSV(path: string) {
  const response = await fetch(path)

  const text = await response.text()

  const result = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
  })

  return result.data
}