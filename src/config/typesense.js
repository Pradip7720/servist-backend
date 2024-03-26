import typesense from 'typesense'
const typesenseClient = new typesense.Client({
    nodes: [{
      host: '716lk4pu9r52icdzp-1.a1.typesense.net',
      port: '443',
      protocol: 'https',
    }],
    apiKey: 'cOlgOjUCxSZX9jitS8XwFDBll6NqfZzD',
  });

export default typesenseClient;