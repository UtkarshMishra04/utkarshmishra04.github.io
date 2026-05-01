// Publications — add new entries at the top of this array.
// Fields:
//   title    — paper title
//   url      — project page URL
//   authors  — author list (your name is auto-bolded)
//   venues   — array of venue strings (first = primary, rest = secondary/smaller)
//   image    — thumbnail image path (omit if using video)
//   video    — thumbnail video path (omit if using image)
//   links    — array of {label, url} objects (omit url for "coming soon")
//   selected — true to show under the "Selected" tab

var PUBLICATIONS = [
  {
    title: "KinDER: A Physical Reasoning Benchmark for Robot Learning and Planning.",
    url: "https://prpl-group.com/kinder-site/",
    authors: "Yixuan Huang*, Bowen Li*, Vaibhav Saxena*, Yichao Liang, Utkarsh A. Mishra, Liang Ji, Lihan Zha, Jimmy Wu, Nishanth Kumar, Sebastian Scherer, Danfei Xu, Tom Silver.",
    venues: ["RSS 2026"],
    video: "img/kinder.mp4",
    links: [
      {label: "Website", url: "https://prpl-group.com/kinder-site/"},
      {label: "Paper", url: "https://arxiv.org/abs/2604.25788"},
      {label: "Code", url: "https://github.com/Princeton-Robot-Planning-and-Learning/kindergarden"},
      {label: "Video"}
    ],
    selected: false
  },
  {
    title: "Compositional Diffusion with Guided Search for Long-Horizon Planning.",
    url: "https://umishra.me/CDGS/",
    authors: "Utkarsh A. Mishra, David He, Yongxin Chen and Danfei Xu.",
    venues: ["ICLR 2026 (ORAL, Top 1.18%)"],
    image: "img/cdgs.png",
    links: [
      {label: "Website", url: "https://umishra.me/CDGS/"},
      {label: "Paper", url: "https://arxiv.org/pdf/2601.00126"},
      {label: "Code", url: "https://github.com/cdgsearch/getting_started_with_CDGS"},
      {label: "Video"}
    ],
    selected: true
  },
  {
    title: "Compositional Visual Planning via Inference-Time Diffusion Scaling.",
    url: "https://comp-visual-planning.github.io/",
    authors: "Yixin Zhang, Yunhao Luo, Utkarsh A. Mishra, Woo Chul Shin, Yongxin Chen, Danfei Xu.",
    venues: ["ICLR 2026"],
    image: "img/cvp_yixin2026.png",
    links: [
      {label: "Website", url: "https://comp-visual-planning.github.io/"},
      {label: "Paper", url: "https://openreview.net/forum?id=EEONns7ae4"},
      {label: "Code"},
      {label: "Video"}
    ],
    selected: false
  },
  {
    title: "Joint Model-based Model-free Diffusion for Planning with Constraints.",
    url: "https://jm2d-corl25.github.io/",
    authors: "Wonsuhk Jung*, Utkarsh A. Mishra*, Nadun Ranawaka Arachchige, Yongxin Chen, Danfei Xu and Shreyas Kousik.",
    venues: ["CoRL 2025 (Poster)."],
    video: "img/jm2d.mp4",
    links: [
      {label: "Website", url: "https://jm2d-corl25.github.io/"},
      {label: "Paper", url: "https://arxiv.org/abs/2509.08775"},
      {label: "Video", url: "https://www.youtube.com/watch?v=NnsgGu1TmrA"}
    ],
    selected: true
  },
  {
    title: "RAIL: Reachability-Aided Imitation Learning for Safe Policy Execution.",
    url: "https://rail2024.github.io/",
    authors: "Wonsuhk Jung, Dennis Anthony, Utkarsh A. Mishra, Nadun Ranawaka Arachchige, Matthew Bronars, Danfei Xu and Shreyas Kousik.",
    venues: ["ICRA 2025"],
    video: "img/rail.mp4",
    links: [
      {label: "Website", url: "https://rail2024.github.io/"},
      {label: "Paper", url: "https://arxiv.org/abs/2409.19190"},
      {label: "Code", url: "https://github.com/goldenhazard/RAIL_release"},
      {label: "Video", url: "https://www.youtube.com/watch?v=1n6ZLEODWE4"}
    ],
    selected: false
  },
  {
    title: "Generative Trajectory Stitching through Diffusion Composition.",
    url: "https://comp-diffuser.github.io/",
    authors: "Yunhao Luo, Utkarsh A. Mishra, Yilun Du and Danfei Xu.",
    venues: ["NeurIPS 2025 (Spotlight)"],
    video: "img/comp_diffuser.mp4",
    links: [
      {label: "Website", url: "https://comp-diffuser.github.io/"},
      {label: "Paper", url: "https://arxiv.org/abs/2503.05153"},
      {label: "Code", url: "https://github.com/devinluo27/comp_diffuser_release"}
    ],
    selected: false
  },
  {
    title: "Generative Factor Chaining: Coordinated Manipulation with Diffusion-based Factor Graph.",
    url: "https://generative-fc.github.io/",
    authors: "Utkarsh A. Mishra, Yongxin Chen and Danfei Xu.",
    venues: [
      "CoRL 2024 (Poster).",
      "Oral: ICRA 2024 Workshop \u2014 Back to the Future: Robot Learning Going Probabilistic",
      "Oral: ICRA 2024 Workshop: A Future Roadmap for Sensorimotor Skill Learning for Robot Manipulation"
    ],
    image: "img/gfc.png",
    links: [
      {label: "Website", url: "https://generative-fc.github.io/"},
      {label: "Paper", url: "https://openreview.net/forum?id=p6Wq6TjjHH"},
      {label: "Code"},
      {label: "Video"}
    ],
    selected: true
  },
  {
    title: "ReorientDiff: Diffusion Model based Reorientation for Object Manipulation.",
    url: "https://utkarshmishra04.github.io/ReorientDiff/",
    authors: "Utkarsh A. Mishra and Yongxin Chen.",
    venues: [
      "ICRA 2024",
      "Poster: RSS 2023 Learning for Task and Motion Planning Workshop"
    ],
    image: "img/reorientdiff.png",
    links: [
      {label: "Website", url: "https://utkarshmishra04.github.io/ReorientDiff/"},
      {label: "Paper", url: "https://arxiv.org/abs/2303.12700"},
      {label: "Code"},
      {label: "Video"}
    ],
    selected: true
  },
  {
    title: "Generative Skill Chaining: Long-Horizon Skill Planning with Diffusion Models.",
    url: "https://generative-skill-chaining.github.io/",
    authors: "Utkarsh A. Mishra, Shangjie Xue, Yongxin Chen and Danfei Xu.",
    venues: [
      "CoRL 2023 (Poster).",
      "Oral: CoRL 2023 Learning Effective Abstractions for Planning (LEAP) Workshop"
    ],
    image: "img/gsc.png",
    links: [
      {label: "Website", url: "https://generative-skill-chaining.github.io/"},
      {label: "Paper", url: "https://openreview.net/forum?id=HtJE9ly5dT"},
      {label: "Code", url: "https://github.com/generative-skill-chaining/gsc-code"},
      {label: "Video"}
    ],
    selected: true
  },
  {
    title: "Learning Representations for Control over Pixels: What Matters and Why.",
    url: "https://openreview.net/forum?id=Ti2i204vZON",
    authors: "Manan Tomar*, Utkarsh A. Mishra*, Amy Zhang and Matthew E. Taylor.",
    venues: [
      "Transactions in Machine Learning Research 2022.",
      "Poster: Reinforcement Learning and Decision Making 2022.",
      "Poster: Ecological RL workshop at NeurIPS 2021."
    ],
    image: "img/what_matters.png",
    links: [
      {label: "Website", url: "https://utkarshmishra04.github.io/pixel-representations-RL/"},
      {label: "Paper", url: "https://openreview.net/forum?id=wIXHG8LZ2w"},
      {label: "Code", url: "https://github.com/UtkarshMishra04/pixel-representations-RL"},
      {label: "Video"}
    ],
    selected: false
  },
  {
    title: "Dynamic Mirror Descent based Model Predictive Control for Accelerating Robot Learning.",
    url: "https://utkarshmishra04.github.io/DMD-MPC-RL/",
    authors: "Utkarsh A. Mishra*, Soumya R. Samineni*, Prakhar Goel, Chandravaran Kunjeti, Himanshu Lodha, Aman Singh, Aditya Sagi, Shalabh Bhatnagar and Shishir Kolathaya.",
    venues: [
      "ICRA 2022.",
      "Poster: 2nd Offline RL workshop at NeurIPS 2021.",
      "Poster: Deep RL Workshop at NeurIPS 2021."
    ],
    image: "img/demorl.png",
    links: [
      {label: "Website", url: "https://utkarshmishra04.github.io/DMD-MPC-RL/"},
      {label: "Paper", url: "https://arxiv.org/pdf/2112.02999.pdf"},
      {label: "Code", url: "https://github.com/UtkarshMishra04/DMD-MPC-RL"},
      {label: "Video", url: "https://www.youtube.com/watch?v=gonray3YGZI"}
    ],
    selected: false
  },
  {
    title: "Linear Policies are Sufficient to Realize Robust Bipedal Walking on Challenging Terrains.",
    url: "https://arxiv.org/abs/2109.12665",
    authors: "Lokesh Krishna*, Guillermo A. Castillo*, Utkarsh A. Mishra, Ayonga Hereid, Shishir Kolathaya",
    venues: ["IEEE RAL + ICRA 2022."],
    image: "img/icra22ral.png",
    links: [
      {label: "Website", url: "https://stochlab.github.io/projects/LinearPolicyBiped.html"},
      {label: "Paper", url: "https://doi.org/10.1109/LRA.2022.3143227"},
      {label: "Code"},
      {label: "Video", url: "https://www.youtube.com/watch?v=jfdafZWFj9I"}
    ],
    selected: false
  },
  {
    title: "Learning Control Policies for Imitating Human Gaits.",
    url: "https://arxiv.org/abs/2106.15273",
    authors: "Utkarsh A. Mishra, Dimitar Stanev, Auke J. Ijspeert, and Pushparaj M. Pathak.",
    venues: ["Bachelor Thesis Report"],
    image: "img/2D-movements.png",
    links: [
      {label: "Website", url: "https://utkarshmishra04.github.io/bioimitation-gym/"},
      {label: "Paper", url: "https://arxiv.org/abs/2106.15273"},
      {label: "Code", url: "https://github.com/UtkarshMishra04/bioimitation-gym"},
      {label: "Video", url: "https://www.youtube.com/playlist?list=PLDvnH871wUkFPOcCKcsTN6ZzzjNZOVlt_"}
    ],
    selected: false
  },
  {
    title: "Learning Linear Policies for Robust Bipedal Locomotion on Terrains with Varying Slopes.",
    url: "https://arxiv.org/abs/2104.01662",
    authors: "Lokesh Krishna, Utkarsh A. Mishra, Guillermo A. Castillo, Ayonga Hereid, Shishir Kolathaya",
    venues: ["IROS 2021"],
    image: "img/icra22ral.png",
    links: [
      {label: "Website", url: "https://stochlab.github.io/projects/LinearPolicyBiped.html"},
      {label: "Paper", url: "https://arxiv.org/abs/2104.01662"},
      {label: "Code"},
      {label: "Video", url: "https://www.youtube.com/watch?v=4WhgD8u74OY"}
    ],
    selected: false
  }
];
