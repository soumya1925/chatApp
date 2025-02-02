import React, { useState } from 'react';
import { Navbar, Nav, Container, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientPage = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Acme Corporation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About Us</Nav.Link>
                            <Nav.Link href="#products">Products</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="bg-primary text-white text-center py-5">
                <h1>Welcome to Acme Corporation</h1>
                <p className="lead">Innovating the Future of Technology</p>
                <Button variant="light" size="lg">
                    Learn More
                </Button>
            </div>

            {/* About Us Section */}
            <Container id="about" className="my-5">
                <h2 className="text-center mb-4">About Us</h2>
                <p className="text-center">
                    Acme Corporation is a leading innovator in technology solutions, specializing in software development
                    and cloud services. Our mission is to empower businesses with cutting-edge technology that drives
                    growth and efficiency.
                </p>
            </Container>

            {/* Products Section */}
            <Container id="products" className="my-5">
                <h2 className="text-center mb-4">Our Products</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Acme Cloud Platform</Card.Title>
                                <Card.Text>
                                    A comprehensive cloud solution for businesses of all sizes.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Acme Software Suite</Card.Title>
                                <Card.Text>
                                    A suite of productivity tools designed to streamline workflows.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Acme AI Solutions</Card.Title>
                                <Card.Text>
                                    Advanced AI tools to automate and optimize your business processes.
                                </Card.Text>
                                <Button variant="primary">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

            {/* Services Section */}
            <Container id="services" className="my-5">
                <h2 className="text-center mb-4">Our Services</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Software Development</Card.Title>
                                <Card.Text>
                                    Custom software development tailored to your specific needs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-6 mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Cloud Consulting</Card.Title>
                                <Card.Text>
                                    Expert guidance on migrating to the cloud and optimizing your cloud infrastructure.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>

            {/* Contact Section */}
            <Container id="contact" className="my-5">
                <h2 className="text-center mb-4">Contact Us</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <p>&copy; 2024 Acme Corporation. All rights reserved.</p>
            </footer>

            {/* Chatbot Button */}
            <Button
                variant="primary"
                style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%', width: '60px', height: '60px' }}
                onClick={toggleChatbot}
            >
                💬
            </Button>

            {/* Chatbot Modal */}
            <Modal show={showChatbot} onHide={toggleChatbot} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Acme Chatbot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hello! How can I assist you today?</p>
                    <Form>
                        <Form.Group className="mb-3" controlId="chatbotMessage">
                            <Form.Control as="textarea" rows={3} placeholder="Type your message..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ClientPage;