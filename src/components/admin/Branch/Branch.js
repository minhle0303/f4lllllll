import { useEffect, useState } from "react";
import { fetchAllBranch } from "../../../services/BrandService";
import AllBranch from "./AllBranch";
import CreateBranch from "./CreateBrand";

function Branch() {
    const [dataBranch, setDataBrand] = useState([]);
    const [filteredData, setFilteredData] = useState(dataBranch);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        loadBranch();
    }, []);

    const loadBranch = async () => {
        const res = await fetchAllBranch();
        setFilteredData(res.data.data);
        setDataBrand(res.data.data);
    }

    return (
        <div style={{ padding: "20px" }}>

            <CreateBranch
                loadBranch={loadBranch}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <AllBranch
                loadBranch={loadBranch}
                dataBranch={dataBranch}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setIsModalOpen={setIsModalOpen}
            />
        </div>

    )
}

export default Branch