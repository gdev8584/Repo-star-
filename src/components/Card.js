import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Item from './Item';

export default function Card1({data}) {
    const date = new Date(data.pushed_at).toLocaleDateString()
    const time = new Date(data.pushed_at).toLocaleTimeString()
  return (
    <Card sx={{ maxWidth: 1000, height: "auto" ,m: "auto", mb: 3 }}>
      <CardActionArea sx={{ display: 'flex', pl: 2, pt:1,pb:1 }}>
        <CardMedia
          component="img"
          sx={{width:150, height: 150}}
          image={data.owner.avatar_url}
          alt="green iguana"
        />
        <CardContent sx={{flex:"1 1 auto"}} >
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography gutterBottom variant={'h6'} component="div">
            {data.description}
          </Typography>
          <Stack direction="row" spacing={3}>
                <Item>Stars: {data.stargazers_count}</Item>
                <Item>Issues: {data.open_issues_count}</Item>
                <Item>Last push {`${date} & ${time}`} by {data.owner.login}</Item>
            </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
 