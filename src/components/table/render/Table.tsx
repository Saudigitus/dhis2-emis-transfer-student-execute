import React, { useEffect, useState } from 'react'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { HeaderFilters, Pagination, TableComponent } from '../components'
import RenderHeader from './RenderHeader'
import RenderRows from './RenderRows'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import WithBorder from '../../template/WithBorder';
import WithPadding from '../../template/WithPadding';
import WorkingLists from '../components/filters/workingList/WorkingLists';
import { useHeader } from '../../../hooks/tableHeader/useHeader';
import { useTableData } from '../../../hooks/tableData/useTableData';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { HeaderFieldsState } from '../../../schema/headersSchema';
import { TeiRefetch } from '../../../schema/refecthTeiSchema';
import { TableDataLoadingState } from '../../../schema/tableDataLoadingSchema';

const usetStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto'
    },
    workingListsContainer: {
        display: 'flex',
        marginLeft: '0.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    h4: {
        margin: '0px',
        fontSize: '22px',
        fontWeigth: '500',
    }
});

function Table() {
    const classes = usetStyles()
    const { columns } = useHeader()
    const { getData, loading, tableData } = useTableData()
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const [page, setpage] = useState<number>(1)
    const [pageSize, setpageSize] = useState<number>(10)
    const [refetch] = useRecoilState(TeiRefetch)
    const setLoading = useSetRecoilState(TableDataLoadingState)

    useEffect(() => {
        void getData(page, pageSize)
    }, [headerFieldsState, page, pageSize, refetch])

    useEffect(() => {
        setLoading(loading)
    }, [loading])


    const onPageChange = (newPage: number) => {
        setpage(newPage)
    }

    const onRowsPerPageChange = (event: any) => {
        setpageSize(parseInt(event.value, 10))
        setpage(1)
    }

    return (
        <Paper>
            <div className={classes.workingListsContainer}>
                <h4 className={classes.h4}>Transfers</h4>
                <WorkingLists />
            </div>
            <WithBorder type='bottom' />
            <WithPadding >
                <WithBorder type='all' >
                    <HeaderFilters />
                    <div
                        className={classes.tableContainer}
                    >
                        {loading ?
                            <CenteredContent>
                                <CircularLoader />
                            </CenteredContent>
                            :
                            <TableComponent>
                                <>
                                    <RenderHeader
                                        createSortHandler={() => { }}
                                        order='asc'
                                        orderBy='desc'
                                        rowsHeader={columns}
                                    />
                                    <RenderRows
                                        headerData={columns}
                                        rowsData={tableData}
                                    />
                                </>
                            </TableComponent>
                        }
                    </div>
                    <Pagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        page={page}
                        rowsPerPage={pageSize}
                        totalPerPage={tableData?.length}
                    />
                </WithBorder>
            </WithPadding>
        </Paper>
    )
}

export default Table
