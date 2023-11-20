import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Img from '../lib/Img';

export default function PromotedCreatorcard() {
  return (
    <Card sx={{ maxWidth: 314 }} className="promoted-card">
      <Img src="/user-cover.png" alt="Promoted" className="promoted-card__cover" />
      <CardContent className="promoted-card__content">
        <Img src="/user-dp.png" alt="Profile Picture" className="promoted-card__dp" />
        <div className='promoted-card__links'>
          <a href="www.twiter.com" className="promoted-card__twitter">@grandeariana</a>
          <ul className='promoted-card__websites'>
              <li>Sites</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}