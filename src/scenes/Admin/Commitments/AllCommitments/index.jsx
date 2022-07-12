import React, { useEffect, useMemo, useState } from 'react';
import {
    NotSortedSVG,
    PlusSVG,
    SortedDownSVG,
    SortedUpSVG,
} from '../../../../components/SVG';
import { AdminLayout } from '../../AdminLayout';
import { Button } from '../../../../components/Button';
import { useHistory } from 'react-router';
import commitmentsService from '../../../../services/commitments/commitmentsService';
import { usePagination, useSortBy, useTable } from 'react-table';
// import { config } from 'dotenv';
import config from '../../../../config/config.js'

const AllCommitments = () => {
    const [commitments, setCommitments] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const commitments = await commitmentsService.fetchCommitments({
                populateTopics: true,
            });
            setCommitments(commitments);
            setLoading(false);
        })();
    }, []);
    console.log(commitments);

    const data = commitments.map(
        ({
            topics,
            title,
            commitmentdate,
            commitmentmetdate,
            commitmentpromiseddate,
            commitmentstatus,
            commitmenttype,
            description,
            partyjurisdiction,
            partyname,
            sourcelink,
            _id,
        }) => ({
            topics: topics.map((topic) => topic.name).join(', '),
            title: (
                <a className="text-blue-500 underline" target="_blank" rel="noreferrer" href={config.frontendUrl + "/user/commitment/" + _id}>
                    {title}
                </a>
            ),
            description: description,
            commitmentdate: new Date(commitmentdate).toDateString(),
            commitmentstatus: commitmentstatus,
            commitmentpromiseddate: new Date(
                commitmentpromiseddate
            ).toDateString(),
            partyname: partyname,
            partyjurisdiction: partyjurisdiction,
            sourcelink: (
                <a className="text-blue-500 underline" href={sourcelink}>
                    Link
                </a>
            ),
            editbutton: (
                <Button
                    onClick={() =>
                        history.push(
                            `/admin/commitments/edit-commitment?commitmentId=${_id}`
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
                All Commitments
            </h1>
            {!loading && <CommitmentsTable data={data}></CommitmentsTable>}
        </AdminLayout>
    );
};

const CommitmentsTable = ({ data }) => {
    const history = useHistory();

    const columns = useMemo(
        () => [
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Party',
                accessor: 'partyname',
            },

            {
                Header: 'Jurisdiction',
                accessor: 'jurisdiction',
            },
            {
                Header: 'Status',
                accessor: 'commitmentstatus',
            },
            {
                Header: 'Topics',
                accessor: 'topics',
            },
            // {
            //     Header: 'Description',
            //     accessor: 'description',
            // },
            // {
            //     Header: 'Date commitment made',
            //     accessor: 'commitmentdate',
            // },
            // {
            //     Header: 'Date commitment promised for',
            //     accessor: 'commitmentpromiseddate',
            // },
            {
                Header: 'Source',
                accessor: 'sourcelink',
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
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
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

    return (
        <>
            <div className="flex flex-row py-2 mb-2 space-x-2 border-b border-brand-neutral-100">
                <Button
                    onClick={() =>
                        history.push(`/admin/commitments/edit-commitment`)
                    }
                >
                    New Commitment
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
                        className="px-2 bg-white border-black"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                    >
                        {'<<'} First
                    </button>
                    <button
                        className="px-2 bg-white border-black"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        {'<'} Previous
                    </button>
                    <button
                        className="px-2 bg-white border-black"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                    >
                        Next {'>'}
                    </button>
                    <button
                        className="px-2 bg-white border-black"
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

export default AllCommitments;
