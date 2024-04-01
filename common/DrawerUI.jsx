import * as React from 'react';
import { Drawer, Icon, MD3Colors } from 'react-native-paper';

const DrawerUI = () => {

    const [active, setActive] = React.useState('');

    return (
        <Drawer.Section title="Drawer options">
            
          <Drawer.Item
            icon="calendar"
            label="Set Date"
            active={active === 'first'}
            onPress={() => setActive('first')}
          />
          <Drawer.Item
            icon="archive"
            label="archive"
            active={active === 'second'}
            onPress={() => setActive('second')}
          />
           <Drawer.Item
            icon=""
            label="sent mail"
            active={active === 'third'}
            onPress={() => setActive('third')}
          />
        </Drawer.Section>
      );
    };

export default DrawerUI;