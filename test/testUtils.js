import checkPropTypes from "check-prop-types"
import {createStore} from "redux"
import reducer from "../src/store/reducer"

/**
 * Create a testing store with imported reducers, middleware, and initial state
 * @param {object} initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */

export const storeFactory = (initialState) =>{
    return createStore(reducer,initialState)
}

/**
 * Factory function to create a ShallowWrapper for the Congrats component
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByAttrib = (wrapper,val) => wrapper.find(`[data-test="${val}"]`)

export const checkProps = (component,conformingProps) =>{
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        "props",
        component.name
    );
    expect(propError).toBeUndefined()
}