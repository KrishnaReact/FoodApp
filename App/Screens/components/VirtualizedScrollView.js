import React from 'react';
import { FlatList,KeyboardAvoidingView } from 'react-native';

const VirtualizedScrollView = props => {
  return (
   
    <FlatList 
    data={[]}
    keyExtractor={() => "key"}
    renderItem={null}
    ListHeaderComponent={
        <>{props.children}</>
    }
    />
   
  );
};

export default VirtualizedScrollView;