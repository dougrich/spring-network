function randomUnit() {
  return Math.random() * 2 - 1
}

function calculateForce({ nodes, connections }) {
  for (let i = 0; i < connections.length; i++) {
    // calculate the current displacement
    let start = nodes[connections[i].start]
    let end = nodes[connections[i].end]
    let dx = end.x - start.x
    let dy = end.y - start.y
    let current = Math.sqrt(dx * dx + dy * dy)
    let displacement = connections[i].length - current
    connections[i].force = {
      x: displacement * (dx / current),
      y: displacement * (dy / current)
    }
  }
}

function calculatePosition({ nodes, connections }) {
  for (let i = 0; i < nodes.length; i++) {
    // clear acceleration
    let ax = 0, ay = 0
    let m = nodes[i].mass || 1
    for (let j = 0; j < nodes[i].connections.length; j++) {
      let spring = connections[nodes[i].connections[j]]
      // note that the factor is 0.5 - each end of the spring should recieve half the force
      let factor = 0.5
      if (spring.start === i) {
        // reflect the force and apply to the start
        factor = -0.5
      }
      ax += factor * spring.force.x / m
      ay += factor * spring.force.y / m
    }
    nodes[i].x += ax
    nodes[i].y += ay
  }
}

function addMeta({ nodes, connections }) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].connections = []
    nodes[i].x = nodes[i].x || randomUnit()
    nodes[i].y = nodes[i].y || randomUnit()
    nodes[i].mass = nodes[i].mass || 1
  }
  for (let i = 0; i < connections.length; i++) {
    const { start, end } = connections[i]
    nodes[start].connections.push(i)
    nodes[end].connections.push(i)
  }
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].connections = nodes[i].connections.filter((x, i, arr) => arr.indexOf(x) === i)
    nodes[i].connections.sort()
  }
}

function simulate(graph, { iterations }) {
  addMeta(graph)
  while (iterations > 0) {
    calculateForce(graph)
    calculatePosition(graph)
    iterations--
  }
}

module.exports = simulate