import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Header from '../components/Header'
import { Card, Container, Row, Col , Spinner, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { Link } from "gatsby";


const BOOKMARK_QUERY = gql`{

  bookmark {
    id
    url
    title
    image
    description
  }
}` ;

const ADD_BOOKMARK = gql`
  mutation addBookMark($url: String! , $description: String! , $title:String! , $image: String!){
    addBookMark(url: $url , description : $description , title : $title , image : $image){
      url
    }
  }
`;

const REMOVE_BOOKMARK = gql `
  mutation removeBookMark ($id : ID!){
    removeBookMark(id : $id) {
      id
    }
  }
`;

export default function Home() {

  const [url, setUrl] = useState()
  const [description, setDescp] = useState()
  const [title, setTitle] = useState()
  const [image, setImage] = useState()
  const { loading, error, data } = useQuery(BOOKMARK_QUERY)
  const [bookmark] = useMutation(ADD_BOOKMARK);
  const [removeBookmark] =  useMutation(REMOVE_BOOKMARK)

  let addBookMark = () => {
    bookmark({
      variables: {
        url: url,
        description: description ,
        title: title ,
        image: image
      },
      refetchQueries: [{ query: BOOKMARK_QUERY }]
    })
    alert('Bookmark added successfully')
  }
  let removeBookMark = (e) => {
    if (window.confirm("Are you sure ? You want to remove this bookmark")) {
    removeBookmark({
      variables:{
        id: e
      },
      refetchQueries: [{ query: BOOKMARK_QUERY }]
    })
    alert('Bookmark removed successfully !')
  }
  }
  if (loading)
    return <Spinner  animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
  if (error) {
    return <p> Error ....</p>
  }
  return (
   
      
<div>
  
    <Header setUrl={setUrl} setDescp={setDescp} setTitle={setTitle} setImage={setImage} addBookMark={addBookMark}/>
        {data ?
          <Container> <Row>{data.bookmark.map((d => (

            <Col key={d.id} xs={12} sm={6} md={4}>
              <Card style={{ width: 'auto' }}>
                <Card.Img variant="top" src={d.image}/>
                <Card.Body>
                  <Card.Title>{d.title}</Card.Title>
                  <Card.Text>
                    {d.description}
                  </Card.Text>
                  <Link to={d.url}  target="_blank"  className="btn btn-primary">Read More</Link>
                  <Button onClick={(e) => removeBookMark(d.id)} variant="danger" >Remove Bookmark</Button>
                </Card.Body>
              </Card>

            </Col>
          )))}</Row> </Container>

          : null
        }

      </div>
  )
}

