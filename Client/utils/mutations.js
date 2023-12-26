import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    addUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        _id
        email
        firstName
        lastName
        password
      }
    }
  }
`;

export const ADD_INCOME = gql`
  mutation addIncome(
    $amount: Float!
    $createdAt: String!
    $description: String
  ) {
    addIncome(
      amount: $amount
      createdAt: $createdAt
      description: $description
    ) {
      incomes {
        _id
        amount
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_INCOME = gql`
  mutation updateIncome(
    $incomeId: ID!
    $amount: Float!
    $description: String
    $createdAt: String!
  ) {
    updateIncome(
      incomeId: $incomeId
      amount: $amount
      description: $description
      createdAt: $createdAt
    ) {
      incomes {
        _id
        amount
        description
        createdAt
      }
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($incomeId: ID!) {
    deleteIncome(incomeId: $incomeId) {
      incomes {
        _id
        amount
        createdAt
        description
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense(
    $amount: Float!
    $category: String!
    $createdAt: String!
    $description: String
  ) {
    addExpense(
      amount: $amount
      category: $category
      createdAt: $createdAt
      description: $description
    ) {
      expenses {
        _id
        amount
        description
        category
        createdAt
      }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense(
    $expenseId: ID!
    $amount: Float!
    $createdAt: String!
    $category: String!
    $description: String
  ) {
    updateExpense(
      expenseId: $expenseId
      amount: $amount
      createdAt: $createdAt
      category: $category
      description: $description
    ) {
      expenses {
        _id
        amount
        description
        category
        createdAt
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId) {
      expenses {
        _id
        amount
        description
        category
        createdAt
      }
    }
  }
`;
