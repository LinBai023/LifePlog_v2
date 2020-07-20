// this file defines all the query type

const {gql} = require('apollo-server')

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
    }

    type Pin {
        _id: ID
        createdAt: String
        title: String
        content: String
        image: String
        latitude: Float
        longitude: Float
        author: User
        comments: [Comment]
    }

    input CreatePinInput {
        title: String
        image: String
        content: String
        latitude: Float
        longitude: Float
    }

    type Comment {
        text: String
        createdAt: String
        author: User
    }

    type Photo {
        createdAt: String
        image: String
        title: String
        content: String
        author: User
    }

    type Query{
        me: User
    }

    type Mutation {
        createPin(input: CreatePinInput!): Pin
    }
`;