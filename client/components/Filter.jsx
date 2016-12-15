import React, { PropTypes } from 'react'
var Slider = require('rc-slider');

const propTypes = {
  filter: PropTypes.object.isRequired,
  filterKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      val: [0, 100]
    }
  }

  defaultSliderValue() {
    const {filter} = this.props
    return [(filter.min * 100), (filter.max * 100)]
  }

  resetFilter() {
    this.setState({
      val: [0, 100]
    }, () => {
      this.updateFilter()
    })
  }

  handleChange(val) {
    if (val[0] < val[1] - 1) {
      this.setState({
        val: val
      })
    }
  }

  updateFilter() {
    const {filterKey} = this.props
    const {val} = this.state

    this.props.onChange(filterKey, val[0], val[1])
  }

  render() {
    const {filterKey} = this.props

    return (
      <div className="Filter">
        <div className="Filter-name">
          <span>{filterKey}</span>
          <button onClick={this.resetFilter.bind(this)} className="Filter-reset">Reset</button>
        </div>
        <div className="Filter-range">
          <Slider
            range allowCross={false}
            value={this.state.val}
            defaultValue={this.defaultSliderValue()}
            onChange={this.handleChange.bind(this)}
            onAfterChange={this.updateFilter.bind(this)} />
        </div>
      </div>
    )
  }
}

Filter.propTypes = propTypes;

export default Filter 
