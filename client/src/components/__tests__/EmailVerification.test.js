import React from 'react'
import EmailVerification from '../EmailVerification'
import {shallow} from 'enzyme'

describe('email verification page', () => {
    it('the app should have text', () => {
        const emailVerification = shallow(<EmailVerification />)
        expect(emailVerification.contains(
            <div>
                <p>Please check your email to click verification link</p>
            </div>
        )).toBe(true)
    })
})