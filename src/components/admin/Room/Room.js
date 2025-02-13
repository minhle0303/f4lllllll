import { useEffect, useState } from "react";
import AllRoom from "./AllRoom";
import { fetchAllRoom } from "../../../services/RoomService";
import CreateRoom from "./CreateRoom";

function Room() {
    const [dataRoom, setDataRoom] = useState([]);
    const [filteredData, setFilteredData] = useState(dataRoom);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        loadRoom();
    }, []);

    const loadRoom = async () => {
        const res = await fetchAllRoom();
        setFilteredData(res.data.data);
        setDataRoom(res.data.data);
     console.log(">>>CHeck RES",res);
     
    }

    return (
        <div style={{ padding: "20px" }}>

            <CreateRoom
                loadRoom={loadRoom}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <AllRoom
                loadRoom={loadRoom}
                dataRoom={dataRoom}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setIsModalOpen={setIsModalOpen}
            />
        </div>

    )
}

export default Room