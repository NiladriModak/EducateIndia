import React, { useEffect } from "react";
import Layout from "../../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getScholarship } from "../../../actions/JobAction";
import { allScholarships } from "./AllSchool";
import Carousel from "react-material-ui-carousel";
import Loading from "../../Loading/Loading";
import ScholarshipBox from "./ScholarshipBox";
function ScholarshipDetails() {
  //   const dispatch = useDispatch();
  //   const { allScholarships, loading } = useSelector(
  //     (state) => state.allScholarships
  //   );
  //   useEffect(() => {
  //     dispatch(getScholarship());
  //   }, [dispatch]);
  const loading = false;
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
            <Carousel className="carousel">
              <img
                style={{ width: "100%", height: "22vmax" }}
                src="/scholarPoster1"
                alt={`Slide`}
              />
              <img
                style={{ width: "100%", height: "22vmax" }}
                src="/scholarPoster2"
                alt={`Slide`}
              />
              <img
                style={{ width: "100%", height: "22vmax" }}
                src="/scholarPoster3"
                alt={`Slide`}
              />
              <img
                style={{ width: "100%", height: "22vmax" }}
                src="/scholarPoster4"
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
              {allScholarships &&
                allScholarships.news?.map((job) => (
                  <ScholarshipBox key={job.id} data={job} /> // Added key prop
                ))}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
}

export default ScholarshipDetails;
// "id": "85adda32-6e59-4516-9d50-03827db02199",
//             "title": "Hope's Heartbeat: Grief leads to creation of scholarships in school administrator's name",
//             "description": "Hope's Heartbeat: Grief leads to creation of scholarships in school administrator's name\n\nHAMILTON TWP., New Jersey (WPVI) -- In Hope's Heartbeat, we introduce you to the surviving loved ones of a lat...",
//             "url": "https://6abc.com/post/hamilton-township-school-administrator-caras-love/15054518/",
//             "author": "@6abc",
//             "image": "https://cdn.abcotvs.com/dip/images/15054926_071224-wpvi-hopes-heartbeat-caras-love-6pm-CC-vid.jpg?w=1600",
//             "language": "en",
//             "category": [
//                 "regional",
//                 "philadelphia",
//                 "pennsylvania"
//             ],
//             "published": "2024-07-12 23:01:29 +0000"
