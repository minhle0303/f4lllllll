import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, notification, Popconfirm, Table } from 'antd';
import UpdateClub from './UpdateClub';
import ViewClubDetail from './DetailClub';
import { deleteClubApi } from '../../../services/ClubService';
import '../../../assets/css/club.css';
import moment from 'moment';

function AllClubs(props) {
    const { dataClubs, loadClubs, setFilteredData, filteredData, setIsModelOpen } = props;
    console.log(">>>Check DATA",dataClubs);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDataDetailOpen, setIsDataDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const [searchText, setSearchText] = useState('');

    const [addressFilters, setAddressFilters] = useState([]);
    useEffect(() => {
        const uniqueAddresses = [...new Set(dataClubs.map((club) => club.address))];
        const filters = uniqueAddresses.map((address) => ({
            text: address,
            value: address,
        }));
        setAddressFilters(filters);
    }, [dataClubs]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (_, record) => (
                <a
                    href="#"
                    onClick={() => {
                        setDataDetail(record);
                        setIsDataDetailOpen(true);
                    }}
                >
                    {record.id}
                </a>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: addressFilters, // Use dynamically generated filters
            onFilter: (value, record) => record.address.startsWith(value),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'Contact Phone',
            dataIndex: 'contactPhone',
        },
        {
            title: 'Close Hour',
            dataIndex: 'closeHour',
            render: (value) => moment(value, 'HHmm').format('HH:mm'),
        },
        {
            title: 'Open Hour',
            dataIndex: 'openHour',
            render: (value) => moment(value, 'HHmm').format('HH:mm'),
        },
        {
            title: 'Action',
            key: 'action',
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
                            key="delete"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                        >
                            <Popconfirm
                                title="Delete Club"
                                description="Are you sure delete it?"
                                onConfirm={() => handleDeleteUser(record.id)}
                                okText="Yes"
                                cancelText="No"
                                placement="left"
                            >
                                Delete
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

    const handleSearch = (value) => {
        const filtered =dataClubs.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleDeleteUser = async (id) => {
        const res = await deleteClubApi(id);
        if (res.data.data) {
            notification.success({
                message: 'Delete Club',
                description: 'Delete Club successfully....!',
            });
            await loadClubs();
        } else {
            notification.error({
                message: 'Error delete user',
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <>
            <div>
                <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h2>Clubs</h2>
                    </div>
                    <div className="user-form">
                        <PlusOutlined
                            name="plus-circle"
                            onClick={() => {
                                setIsModelOpen(true);
                            }}
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

                <Table
                    className="row-highlight-table"
                    columns={columns}
                    dataSource={filteredData}
                    rowKey={'id'}
                />
            </div>

            <UpdateClub
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadClubs={loadClubs}
            />

            <ViewClubDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDataDetailOpen={isDataDetailOpen}
                setIsDataDetailOpen={setIsDataDetailOpen}
            />
        </>
    );
}

export default AllClubs;
