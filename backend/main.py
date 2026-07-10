from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'The server is up and running'}

@app.post('/pipelines/parse')
def parse_pipeline(data: dict):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    graph = {node: [] for node in nodes}

    for edge in edges:
        graph[edge["source"]].append(edge["target"])

    visited = set()
    path = set()
    has_cycle = False

    def dfs(node):
        nonlocal has_cycle

        if has_cycle:
            return

        visited.add(node)
        path.add(node)

        for neighbor in graph[node]:
            if neighbor in path:
                has_cycle = True
                return

            if neighbor not in visited:
                dfs(neighbor)

        path.remove(node)

    for node in graph:
        if node not in visited:
            dfs(node)

        if has_cycle:
            break

    is_dag = not has_cycle

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag
    }
