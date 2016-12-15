import * as React from 'react';
import { browserHistory } from 'react-router'

import { Pagination } from './Pagination';
import { Songs } from './Songs';
import { FilterBar } from './FilterBar';

export class Home extends React.Component {
  componentDidMount() {
    const location = window.location.hash || null;
    if (location) {
      window.localStorage.setItem('access_token', location)
    } else {
      browserHistory.push('/auth');
    }
  }

  render() {
    return (
      <div>
        <FilterBar />
        <Songs />
        <Pagination />
      </div>
    )
  }
}