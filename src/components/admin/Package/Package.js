

import { useEffect, useState } from "react";
import { fetchAllPackage } from "../../../services/PackageService";
import AllPackage from "./AllPackage";
import CreatePackage from "./CreatePackage";

function Package() {
    const [dataPackage, setDataPackage] = useState([]);
    const [filteredData, setFilteredData] = useState(dataPackage);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        loadPackage();
    }, []);

    const loadPackage = async () => {
        const res = await fetchAllPackage();
        setFilteredData(res.data.data);
        setDataPackage(res.data.data);
     console.log(">>>CHeck RES",res);
     
    }

    return (
        <div style={{ padding: "20px" }}>

            <CreatePackage
                loadPackage={loadPackage}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <AllPackage
                loadPackage={loadPackage}
                dataPackage={dataPackage}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setIsModalOpen={setIsModalOpen}
            />
        </div>

    )
}

export default Package