import React, { Component } from "react";
import css from './Searchbar.module.css';

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
        <header className={css.search__form}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search__btn}>
            <span className={css.button__label}>Search</span>
          </button>
      
          <input
            className={css.input}
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