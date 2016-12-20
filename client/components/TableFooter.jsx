import React, { PropTypes } from 'react'

function generateTabs (numOfPages, currPage, selectPage) {
  let tabs = []
  for (let i = 0; i <= numOfPages; i++) {
    const className = i === currPage ? 'active' : ''
    tabs.push(<li key={i} className={className} onClick={() => { selectPage(i) }} ><span>{i + 1}</span></li>)
  }

  if (tabs.length > 10) {
    tabs = tabs.slice(0, 10)
    tabs.push(<li><span>...</span></li>)
  }

  return tabs
}

const TableFooter = ({numOfPages, currPage, selectPage, nextPage, previousPage}) => {
  return (
    <div className='Table-footer'>
      <div className='Pagination'>
        <ul>
          <li className='paginator' onClick={previousPage} >Prev</li>
          {generateTabs(numOfPages, currPage, selectPage)}
          <li className='paginator' onClick={nextPage} >Next</li>
        </ul>
      </div>
    </div>
  )
}

TableFooter.propTypes = {
  numOfPages: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  selectPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
}

export default TableFooter
