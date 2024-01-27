import React from 'react';

interface IRowComponentProps {
  image: string;
  num: number;
  style: any;
}

const RowComponent = ({ image, num, style }: IRowComponentProps) => (
  <div style={style} className={'list-group-item'}>
    <div className="avatar">
      <img alt="avatar" src={image} />
    </div>

    <div className="details">
      <div className="info">
        <p className="number">#{num + 1}</p>
      </div>
    </div>
  </div>
);

export default RowComponent;
