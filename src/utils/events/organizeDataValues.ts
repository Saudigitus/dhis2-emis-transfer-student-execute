export const organizeDataValues = (data: any) => {
    const response: any[] = []
    Object.keys(data).forEach((x) => {
      if (x !== "undefined" && x !== "eventdatestaticform") {
        response.push({ dataElement: x, value: data[x] })
      }
    })
    return response;
  }