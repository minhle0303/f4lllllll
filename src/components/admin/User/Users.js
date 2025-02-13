import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../services/UsersService";
import AllUsers from "./AllUsers";
import CreateUser from "./CreateUser";




function Users() {
    const [dataUsers, setDataUsers] = useState([]);
    const [filteredData, setFilteredData] = useState(dataUsers);
    const [isModalOpen, setIsModelOpen] = useState(false);
    // const [userDetail,setUserDetail] = useState();
    useEffect(() => {
        loadUsers();
    }, []);


    const loadUsers = async () => {
        const res = await fetchAllUsers();
        setFilteredData(res.data);

        setDataUsers(res.data);
        console.log(">>check data", res);

    }

    return (
        <div style={{ padding: "20px" }}>
            <CreateUser
                loadUsers={loadUsers}
                isModalOpen={isModalOpen}
                setIsModelOpen={setIsModelOpen}

            />

            <AllUsers
                loadUsers={loadUsers}
                dataUsers={dataUsers}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setIsModelOpen={setIsModelOpen}

            // loadUserDetail={loadUserDetail}
            // userDetail={userDetail}
            // setUserDetail={setUserDetail}
            />
        </div>

    )
}

export default Users