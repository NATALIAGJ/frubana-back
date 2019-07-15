import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import Median from '../components/Median';
import Tree from '../components/Tree';
import '../styles/index.css'
const { TabPane } = Tabs;

const App = () => {
    const [current, setValue] = React.useState('');

    const handleClick = event => { setValue() };
    
    return (
        <Tabs defaultActiveKey="1" onChange={handleClick}>
            <TabPane tab="Median" key="1">
                <Median />
            </TabPane>
            <TabPane tab="Tree" key="2">
                <Tree />
            </TabPane>
        </Tabs>
    )
};

export default App;