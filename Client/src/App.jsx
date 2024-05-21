// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { Outlet } from 'react-router-dom';
// import Nav from './components/nav.jsx';

// const httpLink = createHttpLink({
//   uri: '/graphql',
//   credentials:'include',
// });
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   return (
//       <ApolloProvider client={client}>
//         <Nav />
//         <Outlet />
//       </ApolloProvider>
//   );
// }

// export default App;

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav.jsx';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production'
    ? 'https://gamegameon-fda2e38a0db2.herokuapp.com/graphql'
    : 'http://localhost:3001/graphql',
  credentials: 'include', // Include credentials with requests
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Nav />
        <Outlet />
      </ApolloProvider>
  );
}

export default App;
