/* eslint-disable @next/next/no-img-element */
import { Container } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { fetchData } from "../functions";

import Img from "../components/image";
import LazyLoad from "react-lazyload";

const Home = (props) => {
  const [photos, setPhotos] = useState(props.photos);
  const [page, setPage] = useState(1);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const getPhotos = async () => {
        const newPhotos = await fetchData(`/api/photos/${page}`);
        setPhotos((prevPhotos) => prevPhotos.concat(newPhotos));
      };
      getPhotos();
    }
  }, [page]);

  if (photos) {
    return (
      <Container>
        {photos.map((photo, index, array) => {
          const lastImage = index === array.length - 1;
          return (
            <div key={photo.id}>
              <LazyLoad height={200}>
                <Img
                  key={photo.id}
                  photo={photo}
                  lastImage={lastImage}
                  endOfPage={() => setPage((prevPage) => prevPage + 1)}
                />
              </LazyLoad>
            </div>
          );
        })}
      </Container>
    );
  } else return <h1>Nothing to see here...</h1>;
};

export default Home;

export async function getServerSideProps() {
  const data = await fetchData("https://api.unsplash.com/photos?page=1");
  if (!data) {
    return {
      props: {
        photos: null,
      },
    };
  } else
    return {
      props: {
        photos: data,
      },
    };
}
