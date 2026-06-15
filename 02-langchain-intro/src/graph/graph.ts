import { END, MessagesZodMeta, START, StateGraph } from '@langchain/langgraph'
import { withLangGraph } from '@langchain/langgraph/zod'
import { z } from 'zod/v3'
import { BaseMessage } from 'langchain'
import { identifyIntent } from './nodes/identitfyIntentNode.ts'
import { chatResponseNode } from './nodes/chatResponseNode.ts'
import { upperCaseNode } from './nodes/upperCaseNode.ts'
import { lowerCaseNode } from './nodes/lowerCaseNode.ts'

const GraphState = z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta
    ),
    output: z.string(),
    command: z.enum(['uppercase','lowercase','unknown'])
})

export type GraphState = z.infer<typeof GraphState>

// Cria e compila o grafo. Mantemos a função para reutilização, mas também
// exportamos o grafo compilado como `graph`, que é o nome esperado pelo
// arquivo `langgraph.json` ("./src/graph/graph.ts:graph").
export function buildGraph(){
    const workflow = new StateGraph({
        stateSchema: GraphState
    })

    .addNode("identifyIntent", identifyIntent)
    .addNode("chatResponse", chatResponseNode)
    .addNode("uppercase", upperCaseNode)
    .addNode("lowercase", lowerCaseNode)
    /*
    .addNode("identifyIntent", (state: GraphState) => {
        return {
            ...state,
        };
    })*/
    .addEdge(START, "identifyIntent")
    .addConditionalEdges("identifyIntent", (state: GraphState) => {
        switch(state.command) {
            case 'uppercase':
                return 'uppercase';
            case 'lowercase':
                return 'lowercase';
            default:
                // For unknown commands, go directly to the response node
                return 'chatResponse';
        }
    },
    {
        'uppercase': 'uppercase',
        'lowercase': 'lowercase'
    })
    // Connect the command nodes to the response node
    .addEdge('uppercase', 'chatResponse')
    .addEdge('lowercase', 'chatResponse')
    .addEdge("chatResponse", END);

    return workflow.compile();
}

// Exportação nomeada esperada pelo LangGraph CLI
export const graph = buildGraph();