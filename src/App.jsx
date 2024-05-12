import { Form, Input, Modal, Table } from "antd";
import { Button } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

function StudentManagement() {
  const [invesible, setInvesible] = useState(false);
  const [formVariable] = useForm();
  const [dataSource, setDateSource] = useState([]);

  // const dataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Create At",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) => (value ? formatDistanceToNow(new Date(value)) : null),
    },
  ];
  useEffect(() => {
    fetchStudent();
  }, []);

  async function fetchStudent() {
    const response = await axios.get(
      "https://6628fc2c54afcabd0737b685.mockapi.io/Student"
    );
    console.log(response.data);
    setDateSource(response.data);
  }

  const handleOpenModel = () => {
    setInvesible(true);
  };

  const handleHideModel = () => {
    setInvesible(false);
  };

  const handleOK = () => {
    formVariable.submit();
  };

  async function handleSubmit(values) {
    // console.log(values);

    values.createAt = new Date();

    await axios.post(
      "https://6628fc2c54afcabd0737b685.mockapi.io/Student",
      values
    );

    setDateSource([...dataSource, values]);

    formVariable.resetFields();

    handleHideModel();
  }

  return (
    <div>
      <Button type="primary" onClick={handleOpenModel}>
        Add New Student
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Add Modal"
        open={invesible}
        onCancel={handleHideModel}
        onOk={handleOK}
      >
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            name={"name"}
            label={"Student Name"}
            rules={[
              {
                required: true,
                message: "Please input student name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StudentManagement;
