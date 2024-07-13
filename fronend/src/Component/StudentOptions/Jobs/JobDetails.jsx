import React, { useEffect } from "react";
import JobBox from "./JobBox";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "../../../actions/JobAction";
import Loading from "../../Loading/Loading";
import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";
import "./jobs.css";

function JobDetails() {
  const { allJobs, loading } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJob());
  }, [dispatch]); // Added dependency array to useEffect

  return (
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
          <Carousel className="carousel">
            <img
              style={{ width: "100%", height: "22vmax" }}
              src="/jobPoster1"
              alt={`Slide`}
            />
            <img
              style={{ width: "100%", height: "22vmax" }}
              src="/jobPoster4"
              alt={`Slide`}
            />
            <img
              style={{ width: "100%", height: "22vmax" }}
              src="/jobPoster.jpg"
              alt={`Slide`}
            />
            <img
              style={{ width: "100%", height: "22vmax" }}
              src="/jobPoster2.jpg"
              alt={`Slide`}
            />
            <img
              style={{ width: "100%", height: "22vmax" }}
              src="/jobPoster3"
              alt={`Slide`}
            />
          </Carousel>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {allJobs &&
              allJobs.data?.map((job) => (
                <JobBox key={job.id} data={job} /> // Added key prop
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default JobDetails;
