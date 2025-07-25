import { Card, ListGroup } from "react-bootstrap";
import {
  CheckSquareFill,
  XCircleFill,
  InfoCircle,
} from "react-bootstrap-icons";
import { useEffect } from "react";
import GrayButton from "./Button.tsx";

interface CoberturaCardProps {
  titulo: string;
  precio: string;
  itemsApply?: aplica[];
  itemsDetails?: Detalle_AllData[];
  onContratar: () => void;
}

interface aplica {
  name: string;
  apply: boolean;
  description: string;
}

const CoverageCard = ({
  titulo,
  precio,
  itemsApply,
  onContratar,
}: CoberturaCardProps) => {
  return (
    <Card className="text-center h-100 card border-dark mb-3">
      <Card.Header className="card text-white bg-secondary mb-3">
        {titulo}
      </Card.Header>
      <Card.Body>
        <Card.Title className="display-6">{precio}</Card.Title>
        <ListGroup variant="flush">
          {itemsApply?.map((itemApply, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <InfoCircle className="me-2" style={{ cursor: "pointer" }} />
                <span>{itemApply.name}</span>
              </div>
              {itemApply.apply ? (
                <CheckSquareFill size={24} color="grey" />
              ) : (
                <XCircleFill size={24} color="grey" />
              )}
            </ListGroup.Item>
          ))}
          <GrayButton text="Contratar" style="" onClick={onContratar} />
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CoverageCard;
