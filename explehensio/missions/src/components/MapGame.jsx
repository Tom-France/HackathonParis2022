
import { Box, Stack } from '@mui/material';
import WhiteBack from '../images/white-background.svg'
import { ReactComponent as Map} from '../images/map.svg'
import { Target } from './Target';

function MapGame() {
    const targets = [{
        name: 'Test 1',
        order: '1'
    },
    {
        name: 'Test 2',
        order: '2'
    },
    {
        name: 'Test 3',
        order: '3'
    }]

    return (
        <Box 
            sx={{ display: 'flex', justifyContent: 'center',  pt: 10, pb:10,  height: '100%', with: '100%' }}
        >
           <Box sx={{ backgroundImage: `url(${WhiteBack})`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            p:2,
            height: '560px', 
            width: '680px'}}>
                <Map width="445px"
    height="514px"/>
            </Box>
            <Box>
            <Stack spacing={1}>
                { targets.map((target) => <Target key={target.order} target={target} /> ) }
            </Stack>
            </Box>
        </Box>
    );
}

export default MapGame;
