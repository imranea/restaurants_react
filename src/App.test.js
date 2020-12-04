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
  let wrapper;
  beforeEach(()=>{
    const initialState = {
      restaurants : [],
      note : 3,
      fetchRestaurant : ()=>{console.log("ok")}
    }
    wrapper = setup(initialState)
  })
  test('rendering without error',()=>{
    const loaderComponent = findByAttrib(wrapper,"component-loader")
    expect(loaderComponent.length).toBe(1)
  })

  test("does not throw warning with expected props",()=>{
    checkProps(App,initialState)
  });

})
