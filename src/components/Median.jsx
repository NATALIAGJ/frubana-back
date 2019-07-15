import React, { Component } from 'react';
import { Typography, Layout, Form, Row, Col, Input, Button, Icon, Radio } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

class Median extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
            text: '',
            median: ''
        }
    }

    addNumber = (event) => {
        event.preventDefault();
        this.props.form.validateFields()
        .then(values => {
            this.pushNumberOfArray(values.number);
            this.props.form.setFieldsValue({ 'number': '' })
            this.getMedian()
        })
        .catch((err) => {
            // Show errors in form
            console.log(err);
        });
    };
    
    pushNumberOfArray = (number) => {
        this.state.numbers.push(parseInt(number));
        this.setState({ numbers: this.state.numbers });
        return; 
    }
    

    onChangeNumber = (event, number, callback) => {
        if (this.dataIsNumber(number)) {
            callback()
        } else {
            this.props.form.setFieldsValue({ 'number': '' })
            callback()
        }
    }
    
    dataIsNumber = (number) => {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        return (!Number.isNaN(number) && reg.test(number)) || number === '' || number === '-';
    }
    
    deleteNumber = (position) => {
        let numbers = this.spliceNumberOfArray(position);
        if(numbers.length) {
            this.setState({ text: '' });
        } else {
            this.setState({ text: 'Wrong!', median: '' });
        }
        this.getMedian()
    }
    
    spliceNumberOfArray = (position) => {
        this.state.numbers.splice(position, 1);
        this.setState({ numbers: this.state.numbers });
        return this.state.numbers; 
    }

    sortNumbers = () => {
        this.setState({ numbers: this.state.numbers.sort((a, b) => a - b)})
    }

    getMedian = () => {
        let { numbers } = this.state;
        if(numbers.length) {
            this.sortNumbers();
            let middle, median;
            if(numbers.length % 2 == 0) {
                middle = (numbers.length / 2)
                let middle1 = (middle - 1)
                median = (numbers[middle1] + numbers[middle]) / 2;
            } else {
                middle = Math.round(numbers.length / 2) - 1;
                median = numbers[middle];
            }
            this.setState({ median });
        }
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="ant-advanced-search-form">
                <Content style={{ padding: '0 50px' }}>
                    <Form  onSubmit={this.addNumber}>
                        <Row gutter={24}>
                            <Col span={8} style={{ display: 'block' }}>
                                <Form.Item label={`Number`}>
                                    {getFieldDecorator(`number`, {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Input something!',
                                            },
                                            {
                                                validator: this.onChangeNumber
                                            }
                                        ],
                                    })(<Input
                                        placeholder="Input a number"
                                        maxLength={25} 
                                    />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Title>Median: {this.state.median}</Title>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            { this.state.numbers.length ? this.state.numbers.map((number, index) => {
                                return <Radio.Group key={index} style={{ padding: '10px' }}>
                                    <Title level={3}>{number}</Title>
                                    <Button onClick={() => this.deleteNumber(index)}>
                                        <Icon type="delete" />
                                    </Button>
                                </Radio.Group>
                            }) :  <Title>{this.state.text}</Title> }
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

const MedianForm = Form.create({ name: 'median_form' })(Median);

export default MedianForm;
