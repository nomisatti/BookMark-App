const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb');
const faunabQuery = faunadb.query;

const typeDefs = gql`
  type Query {

    bookmark: [Bookmark]
  
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String!
    image: String!
    description: String!
  }

  type Mutation {
    addBookMark(url: String! , description: String! , title: String! , image: String!) : Bookmark
  }
`

const resolvers = {
  Query: {
    bookmark: async (root, args, context) => {
      var client = new faunadb.Client({secret :"fnAD4q5aphACBNz-g5THUqfDssaaQKgr6SZ04Rec"});

      try{
        var result = await client.query(
          faunabQuery.Map(
            faunabQuery.Paginate(
              faunabQuery.Match(
                faunabQuery.Index('url'),
               
              )
            ),
            faunabQuery.Lambda(x => faunabQuery.Get(x))
          )
           
        )
        return result.data.map(d => {
          return {
            id: d.ts,
            url: d.data.url,
            title:d.data.title,
            image:d.data.image,
            description: d.data.description
          }
        })
      }
      catch(error){
        console.log('error' , error)
      }
    },
  },
  Mutation: {
    addBookMark : async(_,{url,description,title,image}) =>{
      var client = new faunadb.Client({secret :process.env.FaunaDb_Admin_Secrect});
      try{
        
        var result = await client.query(
          faunabQuery.Create(
            faunabQuery.Collection('BookmarkLinks'),
            {
              data: {
                url ,
                description ,
                title ,
                image
              }
            }
          )
        )
            console.log("Document Created : " , result.ref.id)
            return result.ref.data
      }
      catch(error){
        console.log('error' ,error)
      }
      console.log('Url : ' ,url , ' Descp :' , descprition)
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
