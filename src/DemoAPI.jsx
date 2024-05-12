import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, Table } from "antd";

function DemoAPI() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    console.log("fetching movies...");

    const respone = await axios.get(
      "https://api.themoviedb.org/3/discover/tv?api_key=a10ee5569194b352bcca20840b7f8a32&with_networks=213"
    );

    console.log(respone.data.results);
    setMovies(respone.data.results);
  }
  useEffect(fetchMovies, []); //callback

  const columns = [
    {
      title: "Movie name",
      key: "original_name",
      dataIndex: "original_name",
    },

    {
      title: "Overview",
      key: "overview",
      dataIndex: "overview",
    },

    {
      title: "Poster",
      key: "poster_path",
      dataIndex: "poster_path",
      render: (value) => (
        <Image
          width={200}
          src={`https://image.tmdb.org/t/p/original${value}`}
        />
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={movies} columns={columns} />;
    </div>
  );
}

export default DemoAPI;
