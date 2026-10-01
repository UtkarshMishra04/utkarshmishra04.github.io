// Research Highlights — rendered into #highlights by js/site.js.
//
// overview : paragraph above the diagram
// hub      : top box of the diagram. chain.states[i] and chain.states[i+1] are
//            joined by an arrow labeled chain.segments[i]; the last arrow is
//            dashed to show the elided steps.
// pillars  : boxes laid out as a triangle under the hub, in the order
//            top-left, top-right, bottom-center
// edges    : lines between pillars; hovering one lists its papers
//
// HTML is allowed (e.g. <sub>). Wrap math in $...$ to set it in italic serif.

var HIGHLIGHTS = {
  overview:
    "My research goal is to understand how robots can plan many steps into the future by composing behaviors learned from short-horizon experience. " +
    "A policy $p(a | s)$ chooses the next action, while a planner $p(τ | s, g)$ reasons over the whole trajectory, " +
    "so goals and constraints on future states can be imposed at test time. " +
    "I build such planners from three connected pillars: <b>models</b> that each capture a few steps of how the world evolves, " +
    "a <b>structure</b> that composes them into long-horizon plans and searches over the possible compositions, " +
    "and a <b>representation</b> of the world, including what has not yet been observed, over which plans are composed. " +
    "Each pillar depends on the others: structure needs models that compose, structure is defined over a representation, " +
    "and models must be learned in a representation that lets them compose.",

  hub: {
    title: "Long-Horizon Planning by Composition",
    chain: {
      states: ["s<sub>0</sub>", "s<sub>1</sub>", "s<sub>2</sub>", "g"],
      segments: ["τ<sub>1</sub>", "τ<sub>2</sub>", "τ<sub>k</sub>"]
    },
    formula: "$p(τ | s<sub>0</sub>, g) ∝ ∏<sub>k</sub> p<sub>k</sub>(τ<sub>k</sub>)$",
    question: "How can models of a few steps compose into plans many steps into the future?"
  },

  pillars: [
    {
      id: "models",
      name: "Models",
      symbol: "p<sub>k</sub>",
      question: "What makes a model composable?"
    },
    {
      id: "structure",
      name: "Structure",
      symbol: "∏",
      question: "How do atomic behaviors combine to solve a task?"
    },
    {
      id: "representation",
      name: "Representation",
      symbol: "s<sub>k</sub>",
      question: "What lets parts compose when the world is partly seen?"
    }
  ],

  // Edges between pillars (by id). Hovering an edge lists its papers.
  edges: [
    {
      from: "models", to: "structure",
      papers: [
        { name: "Generative Skill Chaining", venue: "CoRL 2023", url: "https://generative-skill-chaining.github.io/" },
        { name: "Generative Factor Chaining", venue: "CoRL 2024", url: "https://generative-fc.github.io/" },
        { name: "Compositional Diffusion with Guided Search", venue: "ICLR 2026", url: "https://umishra.me/CDGS/" }
      ]
    },
    { from: "structure", to: "representation", papers: [] },
    {
      from: "representation", to: "models",
      papers: [
        { name: "Temporal Ratio", venue: "CoRL 2026", url: "https://umishra.me/temporal-ratio/" }
      ]
    }
  ]
};
