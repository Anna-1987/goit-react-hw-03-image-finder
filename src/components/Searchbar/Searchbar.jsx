import React, { Component } from "react";
import css from '../Searchbar/Searchbar.css';

export class Searchbar extends Component{
    state = {
        searchQuery: '',
    }

    handleChange = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
      };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchQuery.trim() === '') {
          return alert('Please enter something :)');
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
      };
    
 render(){
    return (
        <header className='search__form'>
        <form className='form' onSubmit={this.handleSubmit}>
          <button type="submit" className='search__btn'>
            <span className="button__label">Search</span>
          </button>
      
          <input
            className='input'
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    )
 }

   
    }