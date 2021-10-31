import './App.css';
import React, {Fragment, useState, useEffect} from 'react';
import {Header} from '../components/Header/Header';
import {Home} from '../components/Home/Home';
import {Authors} from '../components/Authors/Authors';
import {About} from '../components/About/About';
import {Footer} from '../components/Footer/Footer';
import { Switch, Route } from 'react-router';
import { SingleBlog } from '../components/SingleBlog/SingleBlog';
import { SingleAuthor } from '../components/SingleAuthor/SingleAuthor';



function App() {
  return (
    <Fragment>
      <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/authors' component={Authors} />
          <Route path='/singleauthor/:id' component={SingleAuthor} />
          <Route path='/about' component={About} />
          <Route path='/posts/:id' component={SingleBlog} />
        </Switch>
      <Footer />
    </Fragment>
  );
}

export default App;
