import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import Landing from '../Landing'

describe('Landing component', () => {
    it('render Landing', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <Landing />
            </MemoryRouter>
        ).toJSON()

        expect(tree).toMatchSnapshot()
    })
})