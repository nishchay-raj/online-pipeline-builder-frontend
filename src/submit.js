import { useStore } from "./store";

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const payload = {
            nodes: nodes.map((node) => node.id),

            edges: edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
            })),
        };

        console.log(payload);

        try {
            const response = await fetch(
                "http://localhost:8000/pipelines/parse",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            alert(
            `Number of nodes: ${data.num_nodes}\nNumber of edges: ${data.num_edges}\nDirected Acyclic Graph: ${data.is_dag}`
            )
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="submit-bar">
            <button
                className="submit-button"
                type="button"
                onClick={handleSubmit}
            >
                Submit workflow
            </button>
        </div>
    );
};