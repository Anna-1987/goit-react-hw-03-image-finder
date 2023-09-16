import React from "react"; 
import './Gallery.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images, openModal}) => (

<ul className = 'gallery'>
{images.map(({ id, webformatURL, tags, largeImageURL }) => {
  return (
    <ImageGalleryItem
      key={id}
      src={webformatURL}
      alt={tags}
      largeImageURL={largeImageURL}
      openModal={openModal} />
  );
})}
</ul>
)

