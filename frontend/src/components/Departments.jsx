import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {

  const departmentsArray = [
    {
      name: "Art",
      imageUrl: "/departments/art.jpg",
    },
    {
      name: "Biology",
      imageUrl: "/departments/biology.jpg",
    },
    {
      name: "Chemistry",
      imageUrl: "/departments/chemistry.jpg",
    },
    {
      name: "English",
      imageUrl: "/departments/english.jpg",
    },
    {
      name: "History",
      imageUrl: "/departments/history.jpg",
    },
    {
      name: "Mathematics",
      imageUrl: "/departments/mathematics.jpg",
    },
    {
      name: "Music",
      imageUrl: "/departments/music.jpg",
    },
    {
      name: "Physics",
      imageUrl: "/departments/physics.jpg",
    },
    {
      name: "Programming",
      imageUrl: "/departments/programming.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["medium", "small"]}>
        {
          departmentsArray.map((department, index)=>{
            return(
              <div className="card" key={index}>
                <div className="depart-name">{department.name}</div>
                <img src={department.imageUrl} alt={department.name} />
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
};

export default Departments;

