import { expect } from 'chai'

describe('React', ()=>{
  it('Um deve ser igual a ele mesmo', ()=>{
      expect(1).to.be.equal(1)   
  })
it('Tamanho do array deve ser 3', ()=> {
    expect([1,2,3]).to.have.length(3)
  })
})
