import React from 'react';
import NoResults from './NoResults';
import Photo from './Photo';

// receives an array of photo information, and provides all the information needed to the photo component
const PhotoList = (props) => {
  let photos;
  if (props.data.length > 0) {
    photos = props.data.map((photo) => (
      <Photo
        src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
        key={photo.id}
      />
    ));
    // if the array is empty, photos is set to a not found jsx
  } else {
    photos = <NoResults />;
  }

  return (
    <div className="photo-container">
      <h2>Results for {props.search}</h2>
      <ul>{photos}</ul>
    </div>
  );
};

export default PhotoList;
