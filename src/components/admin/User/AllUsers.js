import { DeleteOutlined, EditOutlined, LockOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import ViewUserDetail from './DetailUser';
import UpdateUser from './UpdateUser';
import ChangePass from './ChangPass';

function AllUsers(props) {
    const { dataUsers, loadUsers, setFilteredData, filteredData, setIsModelOpen } = props

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDataDetailOpen, setIsDataDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const [isChangePassOpen, setChangePassOpen] = useState(false)

    const [emailFilters, setEmailFilters] = useState([]);
    useEffect(() => {
        const uniqueEmails = [...new Set(dataUsers.map(user => user.email))];
        const filters = uniqueEmails.map(email => ({
            text: email,
            value: email,
        }));
        setEmailFilters(filters);
    }, [dataUsers]);


    const [searchText, setSearchText] = useState('');
    const handleSearch = (value) => {
        const filtered = dataUsers.filter((item) => item.fullName.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };



    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const handleChangePassUser = async () => {

    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDataDetailOpen(true);
                        }}
                    >{record.id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            filters: emailFilters, // Use dynamically generated filters
            onFilter: (value, record) => record.email.startsWith(value),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'Number Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            filters: [
                {
                    text: 'USER',
                    value: 'USER',
                },
                {
                    text: 'MANAGER',
                    value: 'MANAGER',
                },
                {
                    text: 'ADMIN',
                    value: 'ADMIN',
                },
                {
                    text: 'TRAINER',
                    value: 'TRAINER',
                }

            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.role.includes(value),

        },
        {
            title: 'Active',
            dataIndex: 'active',

        },
        {
            title: 'Action',
            key: 'is_active',
            render: (_, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item
                            key="edit"
                            icon={<EditOutlined style={{ color: 'orange' }} />}
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                        >
                            Edit
                        </Menu.Item>
                        <Menu.Item
                            key="changePass"
                            icon={<LockOutlined style={{ color: 'blue' }} />}
                        >
                            <Popconfirm
                                title="Change Pass"
                                onConfirm={() => handleChangePassUser(record.id)}
                                placement="left"
                                onClick={() => {
                                    setChangePassOpen(true);
                                }}
                            >
                                ChangePass
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
                        <MoreOutlined
                            style={{
                                fontSize: '18px',
                                cursor: 'pointer',
                                color: '#1890ff',
                            }}
                        />
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <>
            <div>
                {/* Tạo ô tìm kiếm */}
                <div className="table-header" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h2>Users</h2>
                    </div>
                    <div className="user-form">

                        <div>

                            <PlusOutlined
                                name='plus-circle'
                                onClick={() => { setIsModelOpen(true); }}
                                style={{ marginRight: 15, color: '#FF6600' }}
                            />
                            <Input
                                placeholder="Search by name"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                                onPressEnter={() => handleSearch(searchText)}

                                style={{ width: 450, marginBottom: 50, marginRight: 100, height: 35 }}
                            />
                        </div>
                    </div>

                </div>

                <Button
                    type="primary"
                    hidden
                    onClick={() => handleSearch(searchText)}
                ></Button>

                <Table
                    style={{
                        border: '1px  rgba(0, 0, 0, 0.1)',
                        boxShadow: '12px',

                    }}
                    className="row-highlight-table"
                    columns={columns}
                    dataSource={filteredData}
                    rowKey={"id"}
                    onChange={onChange}


                />
            </div>

            <UpdateUser
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUsers={loadUsers}
            />

            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDataDetailOpen={isDataDetailOpen}
                setIsDataDetailOpen={setIsDataDetailOpen}
            />

            <ChangePass
                isChangePassOpen={isChangePassOpen}
                setChangePassOpen={setChangePassOpen}
            />
        </>
    )
}

export default AllUsers;
