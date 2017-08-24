import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { shallow } from 'enzyme';
import Routes from '../Routes'
import Landing from '../components/Landing'
import Signup from '../components/Signup'
import Login from '../components/Login'
import About from '../components/About'
import Blog from '../components/blog/Blog'
import Contact from '../components/Contact'

describe('Testing route /', () => {
    it('should render Landing when visiting /', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <Routes />
            </MemoryRouter>
        )

        const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props()
            pathMap[routeProps.path] = routeProps.component;
            return pathMap
        }, {
            '/':Landing,
            '/signup':Signup,
            '/login':Login,
            '/about':About,
            '/blog':Blog,
            '/contact':Contact,
        })

        expect(pathMap['/']).toBe(Landing)
        expect(pathMap['/signup']).toBe(Signup)
        expect(pathMap['/login']).toBe(Login)
        expect(pathMap['/about']).toBe(About)
        expect(pathMap['/blog']).toBe(Blog)
        expect(pathMap['/contact']).toBe(Contact)
    })
})