export const omitFields = (obj: any, fields: string[]): any => {
  const result = { ...obj }
  for (const field of fields) {
    delete result[field]
  }
  return result
}
