const gql = require('graphql-tag');

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      email
      name
      role
    }
  }
`;

export default GET_CURRENT_USER;
