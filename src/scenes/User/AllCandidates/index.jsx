import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import styled from 'styled-components';

import {
    NotSortedSVG,
    SortedDownSVG,
    SortedUpSVG,
} from '../../../components/SVG';
import candidatesService from '../../../services/candidates/candidatesService';

const Styles = styled.div`
    table {
        thead {
        }
        tbody {
            tr {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                --tw-bg-opacity: 1;
                background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
            }
        }
    }
`;

const CandidatesList = ({ data }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Full Name of Candidate',
            },
            {
                Header: 'Riding',
                accessor: 'Riding Name',
            },
            {
                Header: 'Party',
                accessor: 'Party Affiliation',
            },
            // {
            //     Header: 'Incumbent?',
            //     accessor: 'incumbent',
            // },
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
        <Styles className="flex flex-col flex-1 p-6 overflow-hidden bg-brand-lightBlue">
            <h2 className="mb-4 text-3xl font-bold font-heading text-brand-olive-900">
                All Candidates
            </h2>
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
        </Styles>
    );
};

class AllCandidates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
        };
    }

    async componentDidMount() {
        let result = await candidatesService.fetchCandidates();
        this.setState({
            fetching: false,
            candidatesData: result,
        });
    }

    render() {
        const { candidatesData, fetching } = this.state;
        return (
            <React.Fragment>
                {!fetching && <CandidatesList data={candidatesData} />}
            </React.Fragment>
        );
    }
}

export default AllCandidates;

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
