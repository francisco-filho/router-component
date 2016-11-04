import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { IndexPage } from '../src/components/app'

describe('Test', ()=>{
  it('Um deve ser igual a ele mesmo', ()=>{
      expect(1).to.be.equal(1)   
  })
  it('Tamanho do array deve ser 3', ()=> {
      expect([1,2,3]).to.have.length(3)
  })
})

describe('<IndexPage/>', ()=> {
  it('deve conter hum <h1>', () => {
    let wrapper = shallow(<IndexPage />)
    expect(wrapper.first('h1')).to.have.length(1)
  })

  it('deve conter a propriedade mensagem=hello', ()=> {
    const hello="hello"
    const wrapper = shallow(<IndexPage message="hello"/>)
    expect(wrapper.first('h1').text()).to.have.string(hello)
  })
})
