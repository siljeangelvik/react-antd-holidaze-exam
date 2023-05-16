import React from 'react';

import { Box, Grid } from 'grommet';

const CalendarComponent = props => (
    <Grid>
        <Box align='start'>
            <button className="primary-button">Button</button>
        </Box>
        <Box {...props} />
    </Grid>
);

CalendarComponent.defaultProps = {
    align: 'center',
    pad: 'large',
};

export default CalendarComponent;
