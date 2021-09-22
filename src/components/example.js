import React, { useState, useContext } from 'react'
import './modules.css'
import { Button, Alert, Collapse } from 'react-bootstrap'
import { Accordion, Card } from 'react-bootstrap'
import { AccordionContext } from 'react-bootstrap'
import { AccordionButton } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey),
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    return (
      <button
        type="button"
        style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

const Example = () => {
    return (
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      );    
}

export default Example