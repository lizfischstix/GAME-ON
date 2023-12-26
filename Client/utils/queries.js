import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      userName
      savedGames {
        _id
        title
        thumbnail
        shortDescription
        gameUrl
        genre
        platform
        developer
      }
    }
  }
`;

// export const QUERY_INCOME = gql`
//   query income($incomeId: ID!) {
//     income(incomeId: $incomeId) {
//       _id
//       amount
//       createdAt
//       description
//     }
//   }
// `;

// export const QUERY_EXPENSES = gql`
//   query expenses($expenseId: ID!) {
//     expense(expenseId: $expenseId) {
//       _id
//       amount
//       createdAt
//       description
//     }
//   }
// `;

// export const QUERY_EXPENSE = gql`
//   query expense($expenseId: ID!) {
//     expense(expenseId: $expenseId) {
//       _id
//       amount
//       description
//       category
//       createdAt
//     }
//   }
// `;
