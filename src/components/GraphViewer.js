import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

function GraphViewer({ data }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...data.states.map(state => ({
          data: {
            id: state,
            label: state,
          },
          classes: data.accept.includes(state) ? 'accept' : '',
        })),
        ...data.transitions.map(t => ({
          data: {
            id: `${t.from}-${t.to}-${t.symbol}`,
            source: t.from,
            target: t.to,
            label: t.symbol,
          },
        })),
      ],
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': '#0078d4',
            color: '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px',
          },
        },
        {
          selector: 'node.accept',
          style: {
            'border-width': 3,
            'border-color': '#00cc66',
          },
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#333',
            'line-color': '#999',
            'font-size': '10px',
            'text-background-color': '#fff',
            'text-background-opacity': 1,
            'text-background-padding': '2px',
          },
        },
      ],
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10,
      },
    });

    return () => cy.destroy();
  }, [data]);

  return (
    <div>
      <h2>Automaton Visualization</h2>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default GraphViewer;