import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import * as ActionCreators from './../actions/ActionCreators'
import InactiveFilters from './../components/InactiveFilters'
import ActiveFilters from './../components/ActiveFilters'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
};

class Filter extends React.Component {
  constructor(props) {
    super(props)
  }

  inactiveFilters() {
    const { filters } = this.props
    return Object.keys(filters).filter((key) => { return !this.props.filters[key].active })
  }

  activeFilters() {
    const { filters } = this.props
    return Object.keys(filters).filter((key) => { return this.props.filters[key].active })
  }

  handleInactiveClick(filter) {
    this.props.dispatch(ActionCreators.activateFilter(filter))
  }

  handleActiveClick(filter) {
    this.props.dispatch(ActionCreators.deactivateFilter(filter))
  }

  render() {
    return (
      <div className="Sorter">
        <InactiveFilters filters={this.inactiveFilters()} onClick={this.handleInactiveClick.bind(this)} />
        <ActiveFilters dispatch={this.props.dispatch} filters={this.props.filters} activeFilters={this.activeFilters()} onClick={this.handleActiveClick.bind(this)} />
      </div>
    )
  }
}

Sorter.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    filters: state.filter
  }
}

export default connect(mapStateToProps)(Sorter);
