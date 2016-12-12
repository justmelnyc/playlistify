import ReactTestUtils from 'react-addons-test-utils' // ES6
import React from 'react'
import Table from './../client/components/Table'

const DATA = [
    {
        "row1": "Lorem ipsum dolor sit amet",
        "row2": "Lorem ipsum dolor sit amet",
        "row3": "Lorem ipsum dolor sit amet"
    },
    {
        "row1": "Lorem ipsum dolor sit amet",
        "row2": "Lorem ipsum dolor sit amet",
        "row3": "Lorem ipsum dolor sit amet"
    },
    {
        "row1": "Lorem ipsum dolor sit amet",
        "row2": "Lorem ipsum dolor sit amet",
        "row3": "Lorem ipsum dolor sit amet"
    }
]

describe('Table Component: ', () => {

    it('sanity check', () => {
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(<Table />);
        const result = renderer.getRenderOutput();
        expect(result).not.toBeNull()
    })

    it('generated rows should equal the length of inputed objects', () => {
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(<Table data={DATA} />);
        const result = renderer.getRenderOutput();
        console.log(result.props)
    })
})
