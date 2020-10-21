import React, { useState } from 'react'
import { Navbar, Button, Nav, Form, Modal,InputGroup,FormControl } from 'react-bootstrap';
const logo = require('../images/logo.png') ;

export default (props) => {

    const [show, setShow] = useState(false);
    console.log('Logo : ' , logo.data)
    const handleClose = (e) => {
        if (e.target.name === "submit") {
            props.addBookMark()
        }
        setShow(false);

    }

    const handleShow = () => setShow(true);


    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="#home"><img src={logo} alt='logo' /> BookMark App</Navbar.Brand>
            
            <Nav className="ml-auto">
               
            </Nav>
            <Form inline>

                <Button className="ml-auto" variant="outline-info" onClick={handleShow}>Add New Book Mark</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title>Add New</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <InputGroup size="mb-3">
                       
                       <FormControl placeholder='Enter Title' onChange={(e) => props.setTitle(e.target.value)} aria-label="medium" aria-describedby="inputGroup-sizing-sm" />
                   </InputGroup>
                   <br />
                   <InputGroup size="mb-3">
                      
                      <FormControl placeholder='Enter Url'onChange={(e) => { props.setUrl(e.target.value) }} aria-label="medium" aria-describedby="inputGroup-sizing-sm" />
                  </InputGroup>
                  <br />
                   <InputGroup size="mb-3">
                      
                      <FormControl placeholder='Enter Description' onChange={(e) => props.setDescp(e.target.value)} aria-label="medium" aria-describedby="inputGroup-sizing-sm" />
                  </InputGroup>
                  <br />
                   <InputGroup size="mb-3">
                      
                      <FormControl placeholder='Enter Image Url' onChange={(e) => props.setImage(e.target.value)} aria-label="medium" aria-describedby="inputGroup-sizing-sm" />
                  </InputGroup>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button name='submit' variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Navbar>
    )
}