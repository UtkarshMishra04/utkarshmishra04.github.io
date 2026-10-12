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
    "My research goal is to understand how robots can plan over extended horizons with novel-objects by composing behaviors learned from short-horizon experiences. " +
    "Unlike a policy $p(a | s)$ that chooses the next action, I develop planners $p(τ | s, g)$ that reason over the whole trajectory from start to desired goal, " +
    "allowing flexible goal conditioning and imposing constraints on future states directly at test time. " +
    "My research expands along three inter-connected axes: <b>models</b> that each capture short-horizon distribution of how the world evolves, " +
    "a symbolic-geometric <b>structure</b> that composes them into long-horizon plans and searches over the possible compositions, " +
    "and a <b>representation</b> of the world over which plans are composed and the one that allows reasoning for partial-observability. " +
    "Each axes depends on the others: structure needs models that compose, structure is defined over a representation, " +
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
    {
      from: "structure", to: "representation",
      papers: [
        { name: "TAMPAgent", venue: "Under Submission", url: "https://tampagent.github.io/" }
      ]
    },
    {
      from: "representation", to: "models",
      papers: [
        { name: "Temporal Ratio", venue: "CoRL 2026", url: "https://umishra.me/temporal-ratio/" }
      ]
    }
  ]
};
