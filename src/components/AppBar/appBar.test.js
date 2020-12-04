import {findByAttrib,checkProps} from "../../../test/testUtils"
import AppBar from "./appBar"
import {shallow} from "enzyme"

const setup = (props={})=>{
    return shallow(<AppBar {...props}/>)
}

describe('render',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = setup();
    })
        test('renders without error',()=>{
            const appBarcomponent = findByAttrib(wrapper,'component-appBar')
            expect(appBarcomponent.length).toBe(1)
        });
})