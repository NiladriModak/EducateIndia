import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../../actions/LibraryAction";
import Loading from "../../Loading/Loading";
import Layout from "../../Layout";
import LibraryBox from "./LibraryBox";

function Library() {
  const dispatch = useDispatch();
  const { allBooks, loading } = useSelector((state) => state.allBooks);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Layout>
      <>
        {loading ? (
          <Loading />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "rgba(248, 248, 248, 0.6)",
            }}
          >
            <div>
              <h1>ALL LIBRARY BOOKS</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {allBooks &&
                allBooks.results?.map((job) => (
                  <LibraryBox key={job.id} data={job} /> // Added key prop
                ))}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
}

export default Library;
