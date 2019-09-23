const { expect } = require('chai')
const simulate = require('./')

describe('Simple Scenario', () => {
  const graph = {
    nodes: [
      {
        type: 'start'
      },
      {
        type: 'end'
      }
    ],
    connections: [
      {
        start: 0,
        end: 1,
        length: 15,
        spring: 5
      }
    ]
  }

  simulate(graph, { iterations: 10 })

  it ('has coordinates on nodes', () => {
    for (let i = 0; i < graph.nodes.length; i++) {
      expect(graph.nodes[i].x).to.exist
      expect(graph.nodes[i].y).to.exist
    }
  })

  
})