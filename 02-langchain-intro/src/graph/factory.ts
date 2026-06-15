// The LangGraph CLI expects a compiled graph (or a default export) to be
// available directly from this module. Previously we exported a function that
// returned a graph, which resulted in `graph is null` during loading. We now
// instantiate the graph once and export it as a constant (and also as the
// default export) so the CLI can resolve it correctly.
import { buildGraph } from "./graph";

// Compiled graph instance
export const graph = buildGraph();

// Also provide a default export for convenience
export default graph;