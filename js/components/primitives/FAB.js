import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Create from 'material-ui/svg-icons/content/create';

const style = {
  button: {
    margin: 20,
    position:'fixed',
    right:0,
    bottom:0,
    zIndex:10,
  },
  };

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
const FAB = () => (
  <div>
    <FloatingActionButton secondary={true} style={style.button} >
      <Create />
    </FloatingActionButton>
  </div>
);

export default FAB;
