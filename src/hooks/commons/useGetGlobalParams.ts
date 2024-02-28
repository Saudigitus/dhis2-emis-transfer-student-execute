import { useRecoilValue } from "recoil";
import { formatCamelToTitleCase } from "../../utils/commons/formatCamelCaseToWords";
import { useParams } from "./useQueryParams";
import { DataStoreState } from "../../schema/dataStoreSchema";

const useGetGlobalParams = () => {
    const { useQuery } = useParams()
    const sectionType = useQuery().get('sectionType')
    const filterItems = useRecoilValue(DataStoreState).find(data => data.key === sectionType)?.filters?.dataElements

    const globalParams = filterItems?.map(filterItem => {
        return {
            [filterItem.code]: useQuery().get(filterItem.code)
        }
        
    })

    return { globalParams };
}
export default useGetGlobalParams;
