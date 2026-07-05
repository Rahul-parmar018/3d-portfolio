import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward, MdPlayArrow } from "react-icons/md";
import { candidexPipeline, promptStrategies, upcomingDomains } from "../config/playground";
import { socials } from "../config/socials";
import { trackEvent } from "../utils/analytics";
import "./Play.css";

const Play = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    "candidex" | "neural" | "llm" | "architecture" | "dashboard" | "recruiter" | "developer"
  >("candidex");

  useEffect(() => {
    trackEvent('AI Playground Tab Opened', { tab: activeTab });
  }, [activeTab]);

  // Onboarding Guided Tour
  const [showTour, setShowTour] = useState(true);
  const [tourStep, setTourStep] = useState(0);

  // Neural Network state
  const [hiddenLayers, setHiddenLayers] = useState(2);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState(4);
  const [learningRate, setLearningRate] = useState(0.1);
  const [activation, setActivation] = useState("ReLU");
  const [nnAnimation, setNnAnimation] = useState<"idle" | "forward" | "backward">("idle");
  const [lossData, setLossData] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // LLM Playground state
  const [selectedPromptId, setSelectedPromptId] = useState("cot");

  // Candidex state
  const [selectedStageId, setSelectedStageId] = useState("upload");

  // Architecture state
  const [selectedArchBlock, setSelectedArchBlock] = useState("api");

  // Guided Tour steps definition
  const tourSteps = [
    {
      title: "Welcome to the AI Playground! ⚡",
      content: "This interactive studio showcases real-world AI applications, model architectures, and deep learning visualizations.",
      target: "play-header"
    },
    {
      title: "Candidex Pipeline Explorer",
      content: "Explore the step-by-step pipeline of my flagship candidate evaluation system. Click on any stage to inspect the code and technical challenges solved.",
      target: "tab-candidex"
    },
    {
      title: "Interactive Neural Network Visualizer",
      content: "Adjust layers, activations, and learning rates to watch educational forward and backpropagation animations.",
      target: "tab-neural"
    },
    {
      title: "Recruiter & Developer Modes",
      content: "Switch between consoles customized for hiring managers looking for certifications, or engineers checking folder structures and API designs.",
      target: "mode-toggles"
    }
  ];

  const handleNextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(prev => prev + 1);
    } else {
      setShowTour(false);
    }
  };

  // Simulate loss curve training animation
  const startNnTraining = () => {
    setNnAnimation("forward");
    setLossData([]);
    let epoch = 0;
    const interval = setInterval(() => {
      epoch++;
      setLossData(prev => {
        const nextLoss = Math.max(0.02, 1 / (epoch * learningRate + 1) + (Math.random() * 0.05 - 0.02));
        return [...prev, nextLoss];
      });
      setNnAnimation(prev => (prev === "forward" ? "backward" : "forward"));

      if (epoch >= 20) {
        clearInterval(interval);
        setNnAnimation("idle");
      }
    }, 250);
  };

  // Draw Neural Network Nodes and Connections on Canvas
  useEffect(() => {
    if (activeTab !== "neural" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let pulseOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const layers = [2, ...Array(hiddenLayers).fill(neuronsPerLayer), 1];
      const layerSpacing = canvas.width / (layers.length + 0.5);
      const nodeRadius = 14;

      const layerCoordinates: { x: number; y: number }[][] = [];

      // Calculate node positions
      layers.forEach((nodesCount, layerIdx) => {
        const x = layerSpacing * (layerIdx + 0.5);
        const ySpacing = canvas.height / (nodesCount + 1);
        const coords = [];
        for (let i = 0; i < nodesCount; i++) {
          coords.push({ x, y: ySpacing * (i + 1) });
        }
        layerCoordinates.push(coords);
      });

      // Draw connections/weights
      ctx.lineWidth = 1;
      for (let l = 0; l < layerCoordinates.length - 1; l++) {
        const currLayer = layerCoordinates[l];
        const nextLayer = layerCoordinates[l + 1];

        currLayer.forEach((currNode) => {
          nextLayer.forEach((nextNode) => {
            // Neon gradient weight lines
            ctx.strokeStyle = "rgba(194, 164, 255, 0.15)";
            ctx.beginPath();
            ctx.moveTo(currNode.x, currNode.y);
            ctx.lineTo(nextNode.x, nextNode.y);
            ctx.stroke();

            // Animated signal propagation pulses
            if (nnAnimation !== "idle") {
              ctx.fillStyle = nnAnimation === "forward" ? "#c2a4ff" : "#ff8ebd";
              const t = (pulseOffset % 30) / 30;
              const px = currNode.x + (nextNode.x - currNode.x) * (nnAnimation === "forward" ? t : 1 - t);
              const py = currNode.y + (nextNode.y - currNode.y) * (nnAnimation === "forward" ? t : 1 - t);
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        });
      }

      // Draw nodes
      layerCoordinates.forEach((layer, lIdx) => {
        layer.forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);

          // Node fill based on input/hidden/output layers
          if (lIdx === 0) {
            ctx.fillStyle = "#0b080c";
            ctx.strokeStyle = "#8ebdff";
          } else if (lIdx === layerCoordinates.length - 1) {
            ctx.fillStyle = "#0b080c";
            ctx.strokeStyle = "#8effa4";
          } else {
            ctx.fillStyle = "#0b080c";
            ctx.strokeStyle = "#c2a4ff";
          }
          ctx.lineWidth = 2.5;
          ctx.fill();
          ctx.stroke();

          // Node center glowing pulse
          if (nnAnimation !== "idle") {
            ctx.fillStyle = "rgba(194, 164, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      pulseOffset += 1.2;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, hiddenLayers, neuronsPerLayer, nnAnimation]);

  const selectedPrompt = promptStrategies.find(p => p.id === selectedPromptId) || promptStrategies[0];
  const selectedStage = candidexPipeline.find(s => s.id === selectedStageId) || candidexPipeline[0];

  return (
    <div className="play-page">
      {/* Guided Tour Overlay */}
      {showTour && (
        <div className="tour-overlay">
          <div className="tour-modal glass-card">
            <h3>{tourSteps[tourStep].title}</h3>
            <p>{tourSteps[tourStep].content}</p>
            <div className="tour-actions">
              <button className="tour-btn skip" onClick={() => setShowTour(false)}>
                Skip Tour
              </button>
              <button className="tour-btn next active-btn" onClick={handleNextTourStep}>
                {tourStep === tourSteps.length - 1 ? "Finish Tour" : "Next →"}
              </button>
            </div>
            <div className="tour-progress">
              {tourSteps.map((_, idx) => (
                <span key={idx} className={`dot ${tourStep === idx ? "active" : ""}`}></span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="play-header" id="play-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Portfolio
        </Link>
        <h1>
          AI <span>Playground</span>
        </h1>
        <p>Interactive engineering laboratory demonstrating model flows and pipeline mechanics</p>
      </div>

      {/* Navigation tabs */}
      <div className="play-nav-tabs" id="mode-toggles">
        <button
          className={`nav-tab-btn ${activeTab === "candidex" ? "active" : ""}`}
          onClick={() => setActiveTab("candidex")}
          id="tab-candidex"
          data-cursor="disable"
        >
          ⚡ Candidex Explorer
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "neural" ? "active" : ""}`}
          onClick={() => setActiveTab("neural")}
          id="tab-neural"
          data-cursor="disable"
        >
          🧠 Neural Net Visualizer
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "llm" ? "active" : ""}`}
          onClick={() => setActiveTab("llm")}
          data-cursor="disable"
        >
          🤖 LLM Playground
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "architecture" ? "active" : ""}`}
          onClick={() => setActiveTab("architecture")}
          data-cursor="disable"
        >
          🏗️ System Arch
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
          data-cursor="disable"
        >
          📊 Stats & Roadmap
        </button>
        <button
          className={`nav-tab-btn recruiter-btn ${activeTab === "recruiter" ? "active" : ""}`}
          onClick={() => setActiveTab("recruiter")}
          data-cursor="disable"
        >
          💼 Recruiter Console
        </button>
        <button
          className={`nav-tab-btn developer-btn ${activeTab === "developer" ? "active" : ""}`}
          onClick={() => setActiveTab("developer")}
          data-cursor="disable"
        >
          💻 Developer Console
        </button>
      </div>

      {/* Content Areas */}
      <div className="play-content-container">
        {/* TAB 1: Candidex Explorer */}
        {activeTab === "candidex" && (
          <div className="tab-layout">
            <div className="pipeline-flow">
              <h3>System Execution Pipeline</h3>
              <p className="section-desc">Click a pipeline stage to inspect architecture details, code snippets, and challenges solved.</p>
              <div className="flow-grid">
                {candidexPipeline.map((stage, idx) => (
                  <div
                    key={stage.id}
                    className={`flow-node glass-card ${selectedStageId === stage.id ? "active" : ""}`}
                    onClick={() => setSelectedStageId(stage.id)}
                    data-cursor="disable"
                  >
                    <span className="node-num">0{idx + 1}</span>
                    <h4>{stage.name}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="pipeline-details glass-card">
              <div className="card-top">
                <span className="tech-badge">Candidex v1.0 Core</span>
                <h2>{selectedStage.name}</h2>
              </div>
              <p className="stage-explanation">{selectedStage.explanation}</p>
              
              <div className="stage-meta">
                <h4>Technologies Stack</h4>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", margin: "8px 0" }}>
                  {selectedStage.technologies.map(t => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="stage-code">
                <h4>Source Snippet</h4>
                <pre>
                  <code>{selectedStage.codeSnippet}</code>
                </pre>
              </div>

              <div className="stage-challenges">
                <h4>⚠️ Key Engineering Challenges</h4>
                <p>{selectedStage.challenges}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Neural Net Visualizer */}
        {activeTab === "neural" && (
          <div className="tab-layout">
            <div className="nn-controls-panel glass-card">
              <h3>Visualizer Settings</h3>
              
              <div className="setting-control">
                <label>Hidden Layers ({hiddenLayers})</label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={hiddenLayers}
                  onChange={(e) => setHiddenLayers(Number(e.target.value))}
                />
              </div>

              <div className="setting-control">
                <label>Neurons per Layer ({neuronsPerLayer})</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={neuronsPerLayer}
                  onChange={(e) => setNeuronsPerLayer(Number(e.target.value))}
                />
              </div>

              <div className="setting-control">
                <label>Learning Rate ({learningRate})</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                />
              </div>

              <div className="setting-control">
                <label>Activation Function</label>
                <select value={activation} onChange={(e) => setActivation(e.target.value)}>
                  <option value="ReLU">ReLU</option>
                  <option value="Sigmoid">Sigmoid</option>
                  <option value="Tanh">Tanh</option>
                </select>
              </div>

              <button className="train-btn active-btn" onClick={startNnTraining} data-cursor="disable">
                <MdPlayArrow /> Trigger Propagation Walkthrough
              </button>

              <div className="why-matters-box">
                <h4>🧠 Why This Matters</h4>
                <p>
                  Neural networks propagate signals forward to make guesses (Forward Prop) and propagate errors backward
                  (Backprop) to calculate weight gradients. The learning rate controls how aggressively node weights adjust.
                </p>
              </div>
            </div>

            <div className="nn-canvas-panel glass-card">
              <div className="nn-canvas-header">
                <h3>Interactive Network Graph</h3>
                <span className="status-indicator">{nnAnimation !== "idle" ? `🔄 Walkthrough Active: ${nnAnimation.toUpperCase()}` : "⏸️ Idle"}</span>
              </div>
              <div className="canvas-wrapper">
                <canvas ref={canvasRef} width="600" height="350"></canvas>
              </div>
              <div className="loss-curve-container">
                <h4>Loss Minimization Curve</h4>
                <div className="loss-bar-graph">
                  {lossData.map((val, idx) => (
                    <div
                      key={idx}
                      className="loss-bar"
                      style={{ height: `${val * 100}%` }}
                      title={`Epoch ${idx + 1}: Loss ${val.toFixed(4)}`}
                    ></div>
                  ))}
                  {lossData.length === 0 && <p className="placeholder-text">Click walkthrough to view loss decay curve...</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LLM Playground */}
        {activeTab === "llm" && (
          <div className="tab-layout">
            <div className="prompt-strategies-list">
              <h3>Prompt Strategies</h3>
              <p className="section-desc">Select prompting archetypes to compare token weights, formatting latency, and quality.</p>
              <div className="strategies-grid">
                {promptStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className={`strategy-node glass-card ${selectedPromptId === strategy.id ? "active" : ""}`}
                    onClick={() => setSelectedPromptId(strategy.id)}
                    data-cursor="disable"
                  >
                    <h4>{strategy.name}</h4>
                    <span className="quality-rating">Match Quality: {strategy.qualityScore}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="prompt-comparison-details glass-card">
              <div className="card-top">
                <span className="tech-badge">LLM Architecture</span>
                <h2>{selectedPrompt.name}</h2>
              </div>
              
              <div className="sandbox-block">
                <h4>Pattern Input Configuration</h4>
                <pre><code>{selectedPrompt.promptPattern}</code></pre>
              </div>

              <div className="sandbox-block">
                <h4>Generated Completion Response</h4>
                <pre className="output-response"><code>{selectedPrompt.responseExample}</code></pre>
              </div>

              <div className="metrics-summary-cards">
                <div className="metric-cell">
                  <span className="label">Est. Token Count</span>
                  <span className="value">{selectedPrompt.estTokens}</span>
                </div>
                <div className="metric-cell">
                  <span className="label">Est. Latency (ms)</span>
                  <span className="value">{selectedPrompt.estLatency}</span>
                </div>
                <div className="metric-cell">
                  <span className="label">Est. Input Cost</span>
                  <span className="value">{selectedPrompt.estCost}</span>
                </div>
              </div>

              <div className="why-matters-box">
                <h4>📈 Prompts Cost vs Reasoning Trade-off</h4>
                <p>{selectedPrompt.whyMatters}</p>
                <p style={{ fontSize: "11px", color: "var(--accentColor)", marginTop: "8px" }}>
                  * Metrics are based on OpenAI GPT-4o input limits and normalized sample averages.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: System Architecture */}
        {activeTab === "architecture" && (
          <div className="tab-layout vertical-layout">
            <div className="arch-diagram-block glass-card">
              <h3>Full-Stack System Nodes</h3>
              <p className="section-desc">Click any system tier block to inspect deployment choices, frameworks, and storage schemas.</p>
              
              <div className="arch-node-flow">
                {[
                  { id: "frontend", name: "Client (React.js / TS)", desc: "Web-based analysis dashboard" },
                  { id: "api", name: "API Gateways (Express)", desc: "Routing parsing request streams" },
                  { id: "backend", name: "Backend Engines (Node.js)", desc: "Computing similarity and business logic" },
                  { id: "ai", name: "AI Services (OpenAI Embeddings)", desc: "Running semantic parses & vectorization" },
                  { id: "db", name: "Database Storage (MongoDB)", desc: "Storing candidate matching profiles" }
                ].map((block) => (
                  <div
                    key={block.id}
                    className={`arch-flow-node glass-card ${selectedArchBlock === block.id ? "active" : ""}`}
                    onClick={() => setSelectedArchBlock(block.id)}
                    data-cursor="disable"
                  >
                    <h4>{block.name}</h4>
                    <p>{block.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="arch-node-explanations glass-card">
              {selectedArchBlock === "frontend" && (
                <>
                  <h3>Client Tier (React & TypeScript)</h3>
                  <p><strong>Design Choices:</strong> Built as a single-page app utilizing fluid flex grids, lazy-loaded components, and responsive views to ensure recruiters enjoy sub-second load times.</p>
                  <p><strong>Deployment:</strong> Hosted on Vercel utilizing CDN edge caches to minimize routing delays.</p>
                </>
              )}
              {selectedArchBlock === "api" && (
                <>
                  <h3>API Gateways (REST Express Services)</h3>
                  <p><strong>Design Choices:</strong> Implements secure JSON endpoints accepting PDF parsing payload streams. Uses middleware validation to filter file weights and types.</p>
                  <p><strong>Security:</strong> Employs CORS configuration layers to block unauthorized requests.</p>
                </>
              )}
              {selectedArchBlock === "backend" && (
                <>
                  <h3>Backend Processor (Node.js Engines)</h3>
                  <p><strong>Design Choices:</strong> Node.js handles parsing file buffers into normalized strings and coordinates REST calls to OpenAI. The engine calculates cosine similarity matrix results locally to reduce latency.</p>
                </>
              )}
              {selectedArchBlock === "ai" && (
                <>
                  <h3>AI Integration Tier (OpenAI Embeddings)</h3>
                  <p><strong>Design Choices:</strong> Generates 1536-dimension vectors using the 'text-embedding-3-small' model, storing semantic meanings. Prompt templates structure analysis queries dynamically.</p>
                </>
              )}
              {selectedArchBlock === "db" && (
                <>
                  <h3>Database Storage (MongoDB)</h3>
                  <p><strong>Design Choices:</strong> Stores candidate matches, parsed qualifications, and metrics. Relies on structured Mongoose models for data integrity.</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: AI Dashboard / Roadmap */}
        {activeTab === "dashboard" && (
          <div className="tab-layout vertical-layout">
            <div className="dashboard-grid">
              <div className="dash-card glass-card">
                <h3>Active Qualifications</h3>
                <ul className="stats-list">
                  <li>🎓 <strong>Degree:</strong> M.Sc. IT at L.J. University</li>
                  <li>🏅 <strong>Certifications:</strong> 6 Verified Licenses (Deloitte, Google, IBM, Vanderbilt)</li>
                </ul>
              </div>

              <div className="dash-card glass-card">
                <h3>Technologies & Stack</h3>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
                  {["React.js", "Node.js", "Python", "REST APIs", "MongoDB", "Git", "GitHub", "Vercel"].map(t => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>
              </div>

              <div className="dash-card glass-card">
                <h3>Flagship Project Status</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                  <span className="status-badge completed">Completed</span>
                  <strong>Candidex AI Analyzer:</strong> Live deployment resume analyzer.
                </div>
              </div>
            </div>

            <div className="roadmap-block glass-card">
              <h3>Future Learning Roadmap (Authentic Growth Goals)</h3>
              <p className="section-desc">No fabricated metrics. Here are the specific upcoming AI domains that are in active development or planned for the future.</p>
              <div className="roadmap-grid">
                {upcomingDomains.map((domain) => (
                  <div key={domain.name} className="roadmap-node glass-card">
                    <h4>{domain.name}</h4>
                    <span className={`status-tag ${domain.status.toLowerCase().replace(/ /g, "-")}`}>
                      {domain.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Recruiter Mode Console */}
        {activeTab === "recruiter" && (
          <div className="tab-layout vertical-layout">
            <div className="recruiter-header-bar glass-card">
              <h2>Hiring Manager Overview</h2>
              <p>Everything you need to evaluate Rahul Parmar in one consolidated location.</p>
            </div>
            
            <div className="dashboard-grid">
              <div className="dash-card glass-card">
                <h3>Contact & Location</h3>
                <p>📍 Ahmedabad, Gujarat, India</p>
                <p>📧 <a href={`mailto:${socials.email}`}>{socials.email}</a></p>
                <p>📞 {socials.phone}</p>
                <p>🔗 <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile <MdArrowOutward /></a></p>
              </div>

              <div className="dash-card glass-card">
                <h3>Verified Certifications</h3>
                <p>6 Verified Licenses including Data Analytics simulations and LLM Prompting.</p>
                <a href="#certifications" className="cta-link-btn" onClick={() => {
                  setActiveTab("dashboard");
                  setTimeout(() => {
                    const target = document.getElementById("certifications");
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>Go to Certifications Page</a>
              </div>

              <div className="dash-card glass-card">
                <h3>Projects & Code</h3>
                <p>Flagship: <strong>Candidex AI Analyzer</strong> (Completed)</p>
                <p>Active Repository: <a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub Profile <MdArrowOutward /></a></p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Developer Mode Console */}
        {activeTab === "developer" && (
          <div className="tab-layout vertical-layout">
            <div className="developer-header-bar glass-card">
              <h2>Developer System Metrics</h2>
              <p>Technical architecture details, choices, and lessons learned.</p>
            </div>

            <div className="dashboard-grid">
              <div className="dash-card glass-card">
                <h3>Folder Architecture</h3>
                <pre style={{ fontSize: "11px" }}>
                  {`src/
  ├── components/   # Modular UI elements
  ├── config/       # Personalization configs
  ├── pages/        # Route page views
  ├── utils/        # Parsing helpers
  └── App.tsx       # Routing core`}
                </pre>
              </div>

              <div className="dash-card glass-card">
                <h3>Design Decisions</h3>
                <p><strong>Config-Driven:</strong> Restructured content to load from files in <code>src/config/</code> to separate logic from static copywriting.</p>
                <p><strong>Resilient PDFs:</strong> Developed head check fetch requests to detect missing files locally and block dead link triggers.</p>
              </div>

              <div className="dash-card glass-card">
                <h3>APIs & Services</h3>
                <p>OpenAI Embeddings integration querying <code>text-embedding-3-small</code> models. Node.js processing pipeline calculating cosine similarity calculations locally.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
