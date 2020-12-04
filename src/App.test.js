import {findByAttrib,checkProps,storeFactory} from "../test/testUtils"
import {shallow} from "enzyme"
import App from "./App"
import initialState from "./store/initialState"


const setup = (initialState={}) => {
  const store = storeFactory(initialState)
  const wrapper = shallow(<App store={store}/>).dive().dive()
  return wrapper
}

describe('render',()=>{
  describe('restaurant is empty',()=>{
    let wrapper;
    beforeEach(()=>{
      const initialState = {
        restaurants : [],
        note : 0
      }
      wrapper = setup(initialState)
    })
    test('rendering without error',()=>{
      const loaderDivComponent = findByAttrib(wrapper,"component-loader")
      expect(loaderDivComponent.length).toBe(1)
    })

    test('render component loader',()=>{
      const loaderComponent = findByAttrib(wrapper,"loader")
      expect(loaderComponent.length).toBe(1)
    })
  })

  describe('Array restaurant is not empty',()=>{
    let wrapper;
    beforeEach(()=>{
      const initialState = {
        restaurants : ["first restaurant"],
        note : 3
      } 
      wrapper = setup(initialState)
    })
    test('render component without error',()=>{
      const appComponent = findByAttrib(wrapper,"component-app")
      expect(appComponent.length).toBe(1)
    })
  }) 

})


test("does not throw warning with expected props",()=>{
  checkProps(App,initialState)
});