import React, { Component } from "react";
import { fetchImages } from "./ServerAPI/ServerAPI";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { animateScroll } from 'react-scroll';
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export class App extends Component {
  state = {
    images: [],
    page: 1,
    per_page:12,
    id: null,
    searchQuery: '',
    error: '',
    loading: false,
    loadMore: false,
    showModal: false,
    largeImageURL: 'largeImageURL',

  }

  componentDidUpdate (prevProps, prevState) {

    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.createImages(searchQuery, page);
    }
  }


  createImages = async (q, page) => {
    this.setState({ loading: true });
    if (!q) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(q, page);
      console.log(hits, totalHits);
      this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };


  formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };
 
  onloadMore = () => {
    this.setState(prevState => ({ page: this.state.page + 1 }));
    this.scrollOnMoreButton();
  };

  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  openModal = largeImageURL => {
    console.log(largeImageURL);
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };
  

  render() {
    const { error, images, loading, loadMore, page, largeImageURL, showModal} = this.state
  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      {error && <h1>{error}</h1>}
     <Searchbar onSubmit={this.formSubmit} />

      {loading ? ( 
      <Loader />
       ) : (
        <ImageGallery images={images} openModal={this.openModal} />
       )}
     {loadMore && <Button onloadMore={this.onloadMore} page={page}/>}

     {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
    </div>

    
  );
    }

  }
