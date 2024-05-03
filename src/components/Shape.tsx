
import React, { useState } from 'react';
import { Button, Row, Col, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { startTransition } from 'react';

const Shape: React.FC = () => {
  const { t, i18n } = useTranslation();

  const initialRows = [
    [
      { key: 'circle', className: 'shape circle' },
      { key: 'ellipse', className: 'shape ellipse' },
      { key: 'rectangle-purple', className: 'shape rectangle purple' }
    ],
    [
      { key: 'parallelogram', className: 'shape parallelogram' },
      { key: 'trapezoid', className: 'shape trapezoid' },
      { key: 'square', className: 'shape square' }
    ]
  ];

  const [rows, setRows] = useState(initialRows);

  const handleShapeClick = () => {
    let flatArray = rows.flat();
    for (let i = flatArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
    }
    startTransition(() => {
      setRows([flatArray.slice(0, 3), flatArray.slice(3, 6)]);
    });
  };
  
  const rotateLeft = () => {
    const newRows = [
      [rows[0][1], rows[0][2], rows[1][2]],
      [rows[0][0], rows[1][0], rows[1][1]]
    ];
    startTransition(() => {
      setRows(newRows);
    });
  };
  
  const rotateRight = () => {
    const newRows = [
      [rows[1][0], rows[0][0], rows[0][1]],
      [rows[1][1], rows[1][2], rows[0][2]]
    ];
    startTransition(() => {
      setRows(newRows);
    });
  };
  
  const swapRows = () => {
    const newRows = [...rows].reverse();
    startTransition(() => {
      setRows(newRows);
    });
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      
          <h1 className="text-center text-2xl font-bold">{t('name_title')}</h1>
       
          <Select defaultValue="en" onChange={changeLanguage} className="language-select" style={{ marginLeft: '1700px' ,marginBottom:'10px'}}>
            <Select.Option value="en">EN</Select.Option>
            <Select.Option value="th">TH</Select.Option>
          </Select>
          

        <Link to="/" style={{ textDecoration: 'none' }} >
        <Button type="default" style={{ backgroundColor: 'white', color: 'rgba(0, 0, 0, 0.85)',marginLeft: '1700px' }} >Back to Home</Button>
        </Link>
        
      <Row justify="center" gutter={[16, 16]} className="button-group">
        <Col>
        <Button onClick={rotateLeft} className="arrow-btn">
      <div className="triangle-left"></div>
      <div className="button-text">{t('move_shape')}</div>
    </Button>
    </Col>
        <Col>
        <Button onClick={swapRows} className="arrow-btn">
      <div className="triangle-up"></div>
      <div className="triangle-down"></div>
      <div className="button-text">{t('move_position')}</div>
    </Button>
    </Col>
        <Col>
        <Button onClick={rotateRight} className="arrow-btn">
      <div className="triangle-right"></div>
      <div className="button-text">{t('move_shape')}</div>
    </Button>
    </Col>
      </Row>
      {rows.map((row, index) => (
        <Row key={index} justify="center" gutter={[16, 16]} className="shapes-row">
          {row.map((shape, idx) => (
            <Col key={idx}>
              <Button className="shape-btn" onClick={handleShapeClick}>
                <div className={shape.className}></div>
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

export default Shape;
