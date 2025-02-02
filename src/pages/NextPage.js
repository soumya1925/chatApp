import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, ListGroup, Alert, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import './NextPage.css'; // Custom styles

const NextPage = () => {
    const navigate = useNavigate();
    const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [emailData, setEmailData] = useState({
        from: '',
        to: 'dummydev@gmail.com',
        subject: '',
        content: ''
    });
    const [feedbackSent, setFeedbackSent] = useState(false);

    const handleTestChatbot = () => {
        navigate('/client-page');
    };

    const handleIntegrateChatbot = () => {
        setShowIntegrationOptions(true);
    };

    const handleTestIntegration = () => {
        navigate('/sucess-page');
    };

    const handleBack = () => {
        setShowIntegrationOptions(false);
    };

    const handleFeedbackChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const handleSendFeedback = () => {
        if (!emailData.from || !emailData.subject || !emailData.content) {
            alert("Please fill out all required fields.");
            return;
        }
    
        setFeedbackSent(true);
        setTimeout(() => {
            setFeedbackSent(false);
            setShowFeedbackModal(false);
        }, 2000);
    };

    return (
        <Container className="next-page mt-5 p-4 rounded shadow-lg bg-white">
            <h2 className="text-center mb-4 text-primary">Chatbot Integration</h2>

            {!showIntegrationOptions ? (
                <Row className="justify-content-center text-center container-buttons">
                    <Col xs={12} md={4} className="mb-3 d-flex justify-content-center row-buttons">
                        <Button onClick={handleTestChatbot} className="custom-btn w-100">Test Chatbot</Button>
                    </Col>
                    <Col xs={12} md={4} className="mb-3 d-flex justify-content-center row-buttons">
                        <Button onClick={handleIntegrateChatbot} className="custom-btn w-100">Integrate on Your Website</Button>
                    </Col>
                    <Col xs={12} md={4} className="mb-3 d-flex justify-content-center row-buttons">
                        <Button onClick={handleTestIntegration} className="custom-btn w-100">Test Integration</Button>
                    </Col>
                </Row>
            ) : (
                <div>
                    <h3 className="text-center mb-4">Integration Instructions</h3>
                    <Card className="mb-4 shadow-sm p-3">
                        <Card.Body>
                            <Card.Title>Option 1: Copy-Paste Dummy Code</Card.Title>
                            <Card.Text>
                                To integrate the chatbot into your website, copy the code below and paste it into the <code>&lt;head&gt;</code> section of your HTML file:
                            </Card.Text>
                            <pre className="bg-light p-3 rounded">
                                <code>{`<script src="https://dummy-chatbot-url.com/chatbot.js"></script>`}</code>
                            </pre>
                            <Alert variant="info" className="mt-3">
                                This will load the chatbot script and make it available for use on your website.
                            </Alert>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4 shadow-sm p-3">
                        <Card.Body>
                            <Card.Title>Option 2: Mail Instructions to Developer</Card.Title>
                            <Card.Text>
                                Alternatively, you can mail these instructions to your developer, who will integrate the chatbot for you.
                            </Card.Text>
                            <Button className="custom-btn w-100" onClick={() => alert('Please click on the share feedback button to reach out to us ')}>Mail Instructions</Button>
                        </Card.Body>
                    </Card>

                    <h4 className="mt-4">Additional Notes:</h4>
                    <ListGroup className="shadow-sm">
                        <ListGroup.Item>Ensure the script is added before any dependent scripts.</ListGroup.Item>
                        <ListGroup.Item>Adjust the script URL based on your integration environment.</ListGroup.Item>
                    </ListGroup>

                    <div className="text-center mt-4">
                        <Button onClick={handleBack} className="custom-btn w-50" >Back to Options</Button>
                    </div>
                </div>
            )}

            {/* Floating Feedback Button */}
            <Button className="feedback-btn" onClick={() => setShowFeedbackModal(true)}>Share Feedback</Button>

            {/* Feedback Modal */}
            <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>From</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                name="from"
                                value={emailData.from}
                                onChange={handleFeedbackChange}
                                 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="to"
                                value={emailData.to}
                                disabled
                                 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter subject" 
                                name="subject"
                                value={emailData.subject}
                                onChange={handleFeedbackChange}
                                 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Enter your message" 
                                name="content"
                                value={emailData.content}
                                onChange={handleFeedbackChange}
                                 
                            />
                        </Form.Group>
                    </Form>
                    {feedbackSent && <Alert variant="success" className="mt-3">Your message has been sent. We will contact you soon.</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFeedbackModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSendFeedback}>Send Message</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default NextPage;
