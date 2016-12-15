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
  }

  defaultSliderValue() {
    const {filter} = this.props
    return [(filter.min * 100), (filter.max * 100)]
  }

  render() {
    const {filterKey} = this.props

    return (
      <div className="Filter">
        <div className="Filter-name">{filterKey}</div>
        <div className="Filter-range">
          <Slider
            range allowCross={false}
            defaultValue={this.defaultSliderValue()}
            onAfterChange={(val) => {
              this.props.onChange(filterKey, val[0], val[1])
            } } />
        </div>
      </div>
    )
  }
}

Filter.propTypes = propTypes;

export default Filter 
