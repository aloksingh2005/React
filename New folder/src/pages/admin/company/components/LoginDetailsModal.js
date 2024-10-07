import { useState } from "react";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";

const LoginDetailsModal = ({ show, onHide, company }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {company && (
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}><strong>Name:</strong></Col>
                                <Col md={8}>{company.name}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}><strong>Email:</strong></Col>
                                <Col md={8}>{company.email}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}><strong>Mobile:</strong></Col>
                                <Col md={8}>{company.mobile}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}><strong>Password:</strong></Col>
                                <Col md={8}>
                                    <span className="text-muted">
                                        {showPassword ? company.password2 : "••••••••"}
                                    </span>
                                    {' '}
                                    <Button variant="link" onClick={togglePasswordVisibility} className="p-0">
                                        {showPassword ? (<>
                                            <i className="far fa-eye-slash"></i>
                                        </>) : (<>
                                            <i className="far fa-eye"></i>
                                        </>)}
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}><strong>Location:</strong></Col>
                                <Col md={8}>{company.location}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* Add more details as necessary */}
                    </ListGroup>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginDetailsModal;
