import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import Confetti from 'react-confetti'; 
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; 



const SucessPage = () => {
    const [integrationDetected, setIntegrationDetected] = useState(false); 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const navigate = useNavigate();

  
    useEffect(() => {
       
        setTimeout(() => setIntegrationDetected(true), 3000);

       
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAdminPanel = () => {
        navigate('/admin-panel'); 
    };

    const handleChatbot = () => {
        navigate('/chatbot'); 
    };

    const handleSocialMediaShare = (platform) => {
        alert(`Sharing on ${platform}`);
      
    };

    return (
        <div className="integration-success-page" style={{ background: '#f4f6f9', transition: 'background 0.5s ease' }}>
            {integrationDetected && <Confetti width={windowWidth} height={windowHeight} />}

            <Container className="text-center py-5">
                {integrationDetected ? (
                    <div>
                        <h2 className="mb-4 text-success">Integration Successful!</h2>
                        <Card className="shadow-lg mb-4 p-4">
                            <Card.Body>
                                <Card.Title>You're All Set!</Card.Title>
                                <Card.Text>
                                    Your chatbot has been successfully integrated. You can now manage it from the admin panel or start interacting with it.
                                </Card.Text>
                                <Button variant="primary" onClick={handleAdminPanel} className="m-2" size="lg">
                                    Explore Admin Panel
                                </Button>
                                <Button variant="secondary" onClick={handleChatbot} className="m-2" size="lg">
                                    Start Talking to Your Chatbot
                                </Button>
                                <div className="mt-4">
                                    <h4>Share Your Success:</h4>
                                    <Button variant="outline-primary" onClick={() => handleSocialMediaShare('Facebook')} className="m-2">
                                        <FaFacebook /> Facebook
                                    </Button>
                                    <Button variant="outline-info" onClick={() => handleSocialMediaShare('Twitter')} className="m-2">
                                        <FaTwitter /> Twitter
                                    </Button>
                                    <Button variant="outline-dark" onClick={() => handleSocialMediaShare('LinkedIn')} className="m-2">
                                        <FaLinkedin /> LinkedIn
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => handleSocialMediaShare('Instagram')} className="m-2">
                                        <FaInstagram /> Instagram
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-4 text-warning">Integration Detection Pending...</h2>
                        <Card className="shadow-lg mb-4 p-4">
                            <Card.Body>
                                <Card.Title>We're Still Working on It</Card.Title>
                                <Card.Text>
                                    Please wait while we detect the integration status. If it takes too long, please check the integration code or contact support.
                                </Card.Text>
                                <Button variant="primary" className="m-2" size="lg">
                                    Retry Integration
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </Container>

            <style>{`
                .integration-success-page {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    transition: background 0.5s ease;
                }

                .card:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 16px rgba(0, 0, 0, 0.1);
                    transform: translateY(-5px);
                    transition: all 0.3s ease-in-out;
                }

                .btn:hover {
                    transform: scale(1.05);
                    transition: all 0.2s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default SucessPage;
