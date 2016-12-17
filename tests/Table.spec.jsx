import React from 'react'
import Table from './../client/components/Table'
import { shallow, mount, render } from 'enzyme'

const TABLE_ITEM_CLASS = '.Table-item'
const TABLE_ROW_CLASS = '.Table-row'
const TABLE_ROW_HEADER = '.Table-row--header'
const ASCENDING_ORDER_CLASS = 'asc'
const DESCENDING_ORDER_CLASS = 'desc'

const DATA = [
  {
    'row1': '1Lorem ipsum  sit amet',
    'row2': '1Lorem dolor sit amet',
    'row3': '1Lorem ipsum dolor  amet'
  },
  {
    'row1': '2Lor ipsum dolor sit amet',
    'row2': '2Lorem ipsum dolor sit amet',
    'row3': '2Lorm ipsum dolor sit aet'
  },
  {
    'row1': '3Lom ipsum dolor sit amet',
    'row2': '3Lorem sum dolor sit amet',
    'row3': '3Lorem ipsum dor sit amet'
  }
]

describe('Table Component: ', () => {
  let wrapper
  let tableRows
  let header
  let headerItems
  beforeEach(() => {
    wrapper = mount(<Table data={DATA} />)
    tableRows = wrapper.find(TABLE_ROW_CLASS)
    header = wrapper.find(TABLE_ROW_HEADER)
    headerItems = header.find(TABLE_ITEM_CLASS)
  })

  it('sanity check', () => {
    expect(wrapper).not.toBeNull()
  })

  it('generated rows should equal the length of inputed objects + 1 header', () => {
    expect(tableRows.length).toEqual(DATA.length + 1)
  })

  it('each generated row should have a col for each of the keys in the objects', () => {
    tableRows.forEach((row) => {
      const rowItems = row.find(TABLE_ITEM_CLASS)
      expect(rowItems.length).toEqual(Object.keys(DATA[0]).length)
    })
  })

  // FIXME
  // it('each row should contain the text of its data', () => {
  //   const rows = tableRows.not(TABLE_ROW_HEADER)

  //   rows.forEach((row, i) => {
  //     const key = row.key()
  //     const rowData = DATA[key]

  //     row.find(TABLE_ITEM_CLASS).forEach((rowItem, i) => {
  //       expect(rowData[rowItem.key()]).toEqual(rowItem.text())
  //     })

  //   })
  // })

  it('the header should have a col for each of the keys in the first object', () => {
    expect(header.length).toEqual(1)
    expect(headerItems.length).toEqual(Object.keys(DATA[0]).length)
  })

  it('when clicked on header item it should call function with val', () => {
    const func = jasmine.createSpy('getID')
    const clickableTable = mount(<Table data={DATA} onHeaderClick={func} />)
    const headerItems =
      clickableTable.find(TABLE_ROW_HEADER).find(TABLE_ITEM_CLASS)
    headerItems.forEach((item) => {
      item.simulate('click')
      const arg = func.calls.mostRecent().args[0]
      expect(arg).toEqual(item.key())
    })

    expect(func.calls.all().length).toEqual(Object.keys(DATA[0]).length)
  })

  const testIfSortClassIsAdded = (sortClass) => {
    const clickableTable = mount(<Table data={DATA} sort={sortClass} />)
    const headerItems =
      clickableTable.find(TABLE_ROW_HEADER).find(TABLE_ITEM_CLASS)

    headerItems.forEach((item) => {
      if (item.key() === sortClass.key) {
        expect(item.hasClass(sortClass.direction)).toBeTruthy()
      } else {
        expect(item.hasClass(sortClass.direction)).toBe(false)
      }
    })
  }

  it('when given props sort it should add the appropriate class', () => {
    const ascSort = {
      key: Object.keys(DATA[0])[0],
      direction: ASCENDING_ORDER_CLASS
    }
    testIfSortClassIsAdded(ascSort)

    const descSort = {
      key: Object.keys(DATA[0])[0],
      direction: DESCENDING_ORDER_CLASS
    }
    testIfSortClassIsAdded(descSort)
  })
})
