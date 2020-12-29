import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Navs from './components/Navs';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';
import apiKey from './config';

// strings for the default navs
const defaultLoads = ['cars', 'helicopters', 'airplanes'];

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      Photos: [],
      cars: [],
      helicopters: [],
      airplanes: [],
    };
  }

  // on page load, arrrays from the default strings are loaded into state for use in the default navs
  componentDidMount() {
    defaultLoads.map((vehicle) => {
      axios
        .get(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${vehicle}&per_page=24&format=json&nojsoncallback=1`
        )
        .then((response) => {
          switch (vehicle) {
            case 'cars':
              this.setState({ cars: response.data.photos.photo });
              break;
            case 'helicopters':
              this.setState({ helicopters: response.data.photos.photo });
              break;
            case 'airplanes':
              this.setState({ airplanes: response.data.photos.photo });
              break;
          }
        })
        .catch((error) => {
          'error fetching data';
        });
    });
  }

  // takes a string and searches flikr for up to 24 images
  searchFlikr = (search) => {
    this.setState({ loading: true });
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${search}&per_page=24&format=json&nojsoncallback=1`;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState(() => {
          return {
            Photos: responseData.photos.photo,
            SearchString: search,
            loading: false,
          };
        });
      })
      .catch((error) => {
        'error fetching data';
      });
  };

  // all routes below. while queries are in progress, loading will be displayed. If no route is available, 404 will be displayed
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Form searchFunction={this.searchFlikr} />
          <Navs />
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route
                exact
                path="/search/:query"
                render={() => (
                  <PhotoList
                    data={this.state.Photos}
                    search={this.state.SearchString}
                  />
                )}
              />
              <Route
                exact
                path="/cars"
                render={() => (
                  <PhotoList data={this.state.cars} search={'cars'} />
                )}
              />
              <Route
                exact
                path="/helicopters"
                render={() => (
                  <PhotoList
                    data={this.state.helicopters}
                    search={'helicopters'}
                  />
                )}
              />
              <Route
                exact
                path="/airplanes"
                render={() => (
                  <PhotoList data={this.state.airplanes} search={'airplanes'} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
