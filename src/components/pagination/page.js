import React, { useEffect, useRef, useState } from "react";
import { paginationService } from "./pagination.service";
import axiosInstance from "../http/httpInstance";
import Constants from '../../utils/constants';

interface Props {
  
  apiRoute: Constants.PRODUCT_ENDPOINT;

  productsPerPage: 20;

  responseData: any;

  isLoadingData: any;

  reloadApi: boolean;
}

/*
 * Pagination with props
 */
export const Pagination = ({
  apiRoute,
  productsPerPage = 20,
  responseData,
  isLoadingData,
  reloadApi,
}: Props) => {
  
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pager, setPager] = useState({} as any);
  const [totalProductsPage, setTotalProductsPage] = useState(0);
  const currentPageRef = useRef(1);

  /*
   * Fetch data from API
   */
  const getData = (pageNumber: number) => {
    isLoadingData(true);
    setCurrentPage(Number(pageNumber));

    let finalApiRoute = `${apiRoute}?pageNumber=${pageNumber}&productsPerPage=${productsPerPage}
    }`;
    axiosInstance
      .get(finalApiRoute)
      .then((response: any) => {
        isLoadingData(false);
        setTotalCount(response.data.count);
        responseData(response.data.data);
        //setTotalProductsPage(Math.ceil(response.data.count / productsPerPage));
        setPagination(response.data.count, pageNumber, productsPerPage);
      })
      .catch((error) => {
        isLoadingData(false);
      });
  };

  /*
   * Set pagination data and pager data
   */
  const setPagination = (
    totalCount: number,
    pageNumber: number,
    productsPerPage: number
  ) => {
    const pData = paginationService.getPager(
      totalCount,
      pageNumber,
      productsPerPage
    );
    setPager({ ...pData });
  };

  /*
   * Watch reloadApi flag
   */
  useEffect(() => {
    if (reloadApi) {
      getData(currentPage);
    }
  }, [reloadApi]);

  /*
   * Component initiated
   */
  useEffect(() => {
    getData(currentPage);
  }, []);

  /*
   * Watch current page
   */
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  /*
   * Watch productsPerPage
   */
  useEffect(() => {
    getData(currentPage);
  }, [productsPerPage]);

  /*
   * Render
   */
  return (
    <div>
      {totalCount > 0 && (
        <div className="table-footer d-flex justify-content-between align-items-center">
          <div className="products-count d-sm-block d-none text-secondary">
            Showing {pager.startIndex + 1} to {pager.endIndex + 1} of{" "}
            {totalCount} products
          </div>
          <nav className="pages">
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "disabled page-item" : "page-item"
                }
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    getData(currentPageRef.current - 1);
                  }}
                >
                  Previous
                </a>
              </li>
              {pager.pages
                && pager.pages.map((page: number, index: number) => {
                  return (
                    <li
                      key={index}
                      className={
                        currentPage === page
                          ? "custom-disabled active page-item"
                          : "page-item"
                      }
                    >
                      <a
                        className="page-link"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          getData(page);
                        }}
                      >
                        {page}
                      </a>
                    </li>
                  );
                })}
              <li
                className={
                  currentPage + 1 > totalRecordsPage
                    ? "disabled page-item"
                    : "page-item"
                }
              >
                <a
                  className="page-link"
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    getData(currentPageRef.current + 1);
                  }}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};