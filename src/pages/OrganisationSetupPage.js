import React, { useState, useEffect } from 'react';
import { ProgressBar, Spinner, Button, Container, Row, Col, Form, Card, ListGroup } from 'react-bootstrap';
import companyData from '../backend/company_data.json';
import { useNavigate } from 'react-router-dom';
import './OrganisationSetupPage.css';


const OrganisationSetupPage = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyUrl, setCompanyUrl] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [scrapedData, setScrapedData] = useState([]);
    const [error, setError] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const [renderedData, setRenderedData] = useState([]);
    const navigate = useNavigate();

    // Helper function to normalize the URL
    const normalizeUrl = (url) => {
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Normalize the entered URL
        const normalizedUrl = normalizeUrl(companyUrl);

        if (
            companyData.companyName !== companyName ||
            normalizeUrl(companyData.companyWebsite) !== normalizedUrl
        ) {
            setError('Company name or URL does not match our records.');
            return;
        }

        setError('');
        setProgress(25);

        // Simulate URL detection and scraping progress
        setTimeout(() => {
            setProgress(50);
            setTimeout(() => {
                setProgress(100);
                setScrapedData(companyData.webpages);
            }, 2000);
        }, 2000);
    };

    // Simulate scraping and rendering data
    useEffect(() => {
        if (selectedData && isLoading) {
            const delayTime = 2000; 
            const keys = Object.keys(selectedData.data);
            let currentIndex = 0;

            const renderNextKey = () => {
                if (currentIndex < keys.length) {
                    const key = keys[currentIndex];
                    setLoadingMessage(`Rendering key: ${key}...`);

                    
                    setTimeout(() => {
                        setRenderedData((prevData) => [
                            ...prevData,
                            { key, value: selectedData.data[key] },
                        ]);
                        currentIndex++;
                        renderNextKey(); 
                    }, delayTime);
                } else {
                    setLoadingMessage('All data chunks are scraped!');
                    setIsLoading(false); 
                    setIsWaiting(true); 
                }
            };

         
            renderNextKey();
        }
    }, [selectedData, isLoading]);

  
    const handleWaitOrProceed = (decision) => {
        setTimeout(() => {
            if (decision === 'proceed') {
                navigate('/next-page'); // Navigate to another page using useNavigate
            } else {
                setIsWaiting(false); // Continue waiting
            }
        }, 2000); // Delay by 5 seconds (5000 milliseconds)
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Organisation Setup</h1>

            {/* Form Section */}
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={companyUrl}
                                        onChange={(e) => setCompanyUrl(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Error Message */}
            {error && (
                <Row className="justify-content-center mt-3">
                    <Col md={8} lg={6}>
                        <div className="alert alert-danger text-center">{error}</div>
                    </Col>
                </Row>
            )}

            {/* Progress Bar */}
            <Row className="justify-content-center mt-4">
                <Col md={8} lg={6}>
                    <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />
                </Col>
            </Row>

            {/* Scraped Data Section */}
            {scrapedData.length > 0 && (
                <Row className="justify-content-center mt-4">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h2 className="text-center mb-4">Scraped Data</h2>
                                <ListGroup>
                                    {scrapedData.map((data, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            action
                                            onClick={() => {
                                                setSelectedData(data);
                                                setIsLoading(true);
                                                setRenderedData([]); // Reset rendered data
                                                setLoadingMessage('Scraping data...');
                                            }}
                                            className="text-center"
                                        >
                                            {data.url}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Loading Spinner */}
            {isLoading && (
                <Row className="justify-content-center mt-4">
                    <Col md={8} lg={6} className="text-center">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">{loadingMessage}</p>
                    </Col>
                </Row>
            )}

            {/* Wait or Proceed Section */}
            {isWaiting && (
                <Row className="justify-content-center mt-4">
                    <Col md={8} lg={6} className="text-center">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <p>All data chunks is being  scraped! Do you want to wait or proceed to the next page?</p>
                                <Button
                                    variant="success"
                                    onClick={() => handleWaitOrProceed('proceed')}
                                    className="me-2"
                                >
                                    Proceed
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleWaitOrProceed('wait')}
                                >
                                    Wait
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Rendered Data Section */}
            {renderedData.length > 0 && !isLoading && !isWaiting && (
                <Row className="justify-content-center mt-4">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h3 className="text-center mb-4">{selectedData.pageTitle}</h3>
                                {renderedData.map((renderedItem, index) => {
                                    const fieldValue = renderedItem.value;

                                    // If the field value is an array, map through it and render each item
                                    if (Array.isArray(fieldValue)) {
                                        return (
                                            <div key={index} className="mb-4">
                                                <h5>{renderedItem.key}</h5>
                                                {fieldValue.map((item, subIndex) => (
                                                    <div key={subIndex} className="mb-2">
                                                        {typeof item === 'object' ? (
                                                            Object.keys(item).map((subKey, subSubIndex) => (
                                                                <p key={subSubIndex}>
                                                                    <strong>{subKey}</strong>
                                                                    <span>{item[subKey]}</span>
                                                                </p>
                                                            ))
                                                        ) : (
                                                            <p><strong>{item}</strong></p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    }

                                  
                                    if (typeof fieldValue === 'object' && fieldValue !== null) {
                                        return (
                                            <div key={index} className="mb-4">
                                                <h5>{renderedItem.key}</h5>
                                                {Object.keys(fieldValue).map((subKey, subIndex) => (
                                                    <p key={subIndex}>
                                                        <strong>{subKey}</strong> {fieldValue[subKey]}
                                                    </p>
                                                ))}
                                            </div>
                                        );
                                    }

                                   
                                    return (
                                        <div key={index} className="mb-4">
                                            <h5>{renderedItem.key}</h5>
                                            <p>{renderedItem.value}</p>
                                        </div>
                                    );
                                })}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default OrganisationSetupPage;