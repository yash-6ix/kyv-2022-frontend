import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Button } from '../../../components/Button';

import {
    NotSortedSVG,
    PlusSVG,
    SortedDownSVG,
    SortedUpSVG,
} from '../../../components/SVG';
import UpdatesService from '../../../services/updates/updatesService';
import { AdminLayout } from '../AdminLayout';

import config from '../../../config/config'

const UpdatesList = ({ data, history }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            // {
            //     Header: 'Description',
            //     accessor: 'description',
            // },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Source',
                accessor: 'sourceurl',
            },
            {
                Header: 'Internal Note',
                accessor: 'internalnote',
            },
            {
                Header: 'Date Created',
                accessor: 'createdon',
            },
            {
                Header: '',
                accessor: 'editbutton',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        // setPageSize,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );
    // const firstPageRows = rows.slice(0, 20)
    return (
        <>
            <div className="flex flex-row py-2 mb-2 space-x-2 border-b border-brand-neutral-100">
                <Button
                    onClick={() => history.push(`/admin/updates/edit-update`)}
                >
                    New Update
                    <PlusSVG className="w-5 h-5 ml-4 fill-current text-brand-white" />
                </Button>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    <div className="flex justify-center flex-1 px-4 py-2 mb-2">
                                        <p className="mr-2 font-bold text-black text-1xl font-body">
                                            {column.render('Header')}
                                        </p>
                                        <span>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <SortedDownSVG />
                                                ) : (
                                                    <SortedUpSVG />
                                                )
                                            ) : (
                                                <NotSortedSVG />
                                            )}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        console.log(row);
                        return (
                            <tr className="" {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            className="py-1 text-center"
                                            {...cell.getCellProps()}
                                        >
                                            {/* <div className="flex flex-1"> */}
                                            {cell.column.id === 'party' ? (
                                                <PartyInColor
                                                    party={cell.render('Cell')}
                                                />
                                            ) : (
                                                <p className="text-black text-1xl font-body">
                                                    {cell.render('Cell')}
                                                </p>
                                            )}
                                            {/* </div> */}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <br />

            <div className="pagination">
                <div className="flex justify-center">
                    <button
                        className="px-2 border-black bg-brand-white"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'} First
                    </button>
                    <button
                        className="px-2 border-black bg-brand-white"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {'<'} Previous
                    </button>
                    <button
                        className="px-2 border-black bg-brand-white"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        Next {'>'}
                    </button>
                    <button
                        className="px-2 border-black bg-brand-white"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        Last {'>>'}
                    </button>
                </div>

                <div className="flex justify-center my-4">
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
            </div>
        </>
    );
};

class AllUpdates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            updatesData: [],
        };
    }

    async componentDidMount() {
        let result = await UpdatesService.fetchUpdates();
        this.setState({
            fetching: false,
            updatesData: result,
        });
    }

    render() {
        const { updatesData, fetching } = this.state;

        const data = updatesData.map(
            ({ title, type, sourceurl, internalnote, createdon, _id }) => ({
                title: (
                    <a
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noreferrer"
                        href={config.frontendUrl + '/user/update/' + _id}
                    >
                        {title}
                    </a>
                ),
                type: type,
                sourceurl: (
                    <a className="text-blue-500 underline" href={sourceurl}>
                        Link
                    </a>
                ),
                internalnote: internalnote,
                createdon: new Date(createdon).toDateString(),
                editbutton: (
                    <Button
                        onClick={() =>
                            this.props.history.push(
                                `/admin/updates/edit-update?updateId=${_id}`
                            )
                        }
                    >
                        Edit
                    </Button>
                ),
            })
        );

        return (
            <AdminLayout>
                <h1 className="py-12 text-4xl border-b border-brand-neutral-100 text-brand-olive-900 font-heading">
                    All Updates
                </h1>
                {!fetching && <UpdatesList {...this.props} data={data} />}
            </AdminLayout>
        );
    }
}

export default AllUpdates;

// import { Link } from 'react-router-dom';
const PartyInColor = ({ party }) => {
    console.log(party.props.cell.value);
    return (
        <div
            className={
                'flex items-center rounded mx-auto justify-center w-28 bg-brand-' +
                party.props.cell.value +
                '-50 bg-opacity-25'
            }
        >
            <p
                className={
                    'font-body text-sm text-body text-brand-' +
                    party.props.cell.value +
                    '-500'
                }
            >
                {party}
            </p>
        </div>
    );
};
