import React from "react";
import { Table } from "../../components";
import { useParams } from "../../hooks/commons/useQueryParams";
import InfoPage from "../../components/info/InfoPage";

function TableComponent() {
  const { urlParamiters } = useParams()
  const { school } = urlParamiters()

  return (
    <>
      {(school !== null)
        ? <Table />
        : <InfoPage />
      }
    </>
  )
}

export default TableComponent;
