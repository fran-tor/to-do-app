import * as React from 'react';
import { Box } from '@mui/material';

const Metrics: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>Average time to finish tasks: 22:15 minutes</p>
      <div>
        <p>Average time to finish tasks by priority:</p>
        <ul>
          <li>Low: 10:25 mins</li>
          <li>Medium: 10:25 mins</li>
          <li>High: 10:25 mins</li>
        </ul>
      </div>
    </Box>
  )
}

export default Metrics;