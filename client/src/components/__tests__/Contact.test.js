import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import Contact from '../Contact'

describe('Contact component', () => {
    it('render Contact', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })
})