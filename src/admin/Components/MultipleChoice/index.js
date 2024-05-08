import React,{ useState,useEffect } from 'react';
import { Select, Space } from 'antd';

function MultiChoice({ setData, data }) {
    const [obj, setObj] = useState([]);

    useEffect(()=>{
        setObj(data)
    },[data])

    const handleChange = (value) => {
        setData(value);
    };
    const options = [];
    obj.forEach((value) => {
        options.push({
            label: `${value.title}`,
            value: `${value._id}`
        });
    });
    return (
        <Space
            style={{
                width: '100%',
            }}
            direction="vertical"
        >
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Please select"
                onChange={handleChange}
                options={options}
            />
        </Space>
    );
}
export default MultiChoice;
